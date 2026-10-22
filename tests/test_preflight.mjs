import assert from "node:assert";
import { checkTransition } from "../web/onchain.js";

const CREATOR = "0x1111111111111111111111111111111111111111";
const RECIPIENT = "0x2222222222222222222222222222222222222222";
const ATTESTOR = "0x3333333333333333333333333333333333333333";
const THIRD_PARTY = "0x4444444444444444444444444444444444444444";

const now = 1729600000;
const lastAt = now - 3600; // 1 hour ago (well within 24h window)
const expiredLastAt = now - 90000; // 25 hours ago (24h window expired)

console.log("=== RUNNING PREFLIGHT TRANSITION TESTS ===");

// ----------------------------------------------------
// PREFLIGHT PATH 1: CHALLENGE WORKFLOW
// ----------------------------------------------------

console.log("\n[Test 1] Eligible party 1 can challenge when case is ASSESSED (round 1)");
{
  const caseAssessed = {
    status: "ASSESSED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    attestor: ATTESTOR,
    last_at: lastAt,
    challenges: []
  };
  const res = checkTransition("challenge", caseAssessed, CREATOR, now);
  assert.strictEqual(res.allowed, true, "Party 1 must be permitted to challenge on ASSESSED");
  console.log("✓ Allowed");
}

console.log("\n[Test 2] Eligible second party CAN challenge while case is CHALLENGED");
{
  const caseChallenged = {
    status: "CHALLENGED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    attestor: ATTESTOR,
    last_at: lastAt,
    challenges: [
      { actor: CREATOR, text: "Party 1 challenge statement", hash: "0xabc" }
    ]
  };
  const res = checkTransition("challenge", caseChallenged, RECIPIENT, now);
  assert.strictEqual(res.allowed, true, "Eligible second party must be permitted to challenge while case is CHALLENGED");
  console.log("✓ Allowed");
}

console.log("\n[Test 3] First challenger cannot submit duplicate challenge while case is CHALLENGED");
{
  const caseChallenged = {
    status: "CHALLENGED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    attestor: ATTESTOR,
    last_at: lastAt,
    challenges: [
      { actor: CREATOR, text: "Party 1 challenge statement", hash: "0xabc" }
    ]
  };
  const res = checkTransition("challenge", caseChallenged, CREATOR, now);
  assert.strictEqual(res.allowed, false, "Duplicate challenge must be rejected");
  assert.match(res.error, /already submitted a challenge/, "Error must state duplicate challenge");
  console.log(`✓ Rejected properly: ${res.error}`);
}

console.log("\n[Test 4] Unauthorized third party cannot challenge");
{
  const caseAssessed = {
    status: "ASSESSED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    last_at: lastAt,
    challenges: []
  };
  const res = checkTransition("challenge", caseAssessed, THIRD_PARTY, now);
  assert.strictEqual(res.allowed, false, "Third party must not challenge");
  assert.match(res.error, /not an eligible party/, "Error must state not an eligible party");
  console.log(`✓ Rejected properly: ${res.error}`);
}

console.log("\n[Test 5] Challenge rejected when both challenge slots (max 2) are occupied");
{
  const caseFull = {
    status: "CHALLENGED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    last_at: lastAt,
    challenges: [
      { actor: CREATOR, text: "C1", hash: "0x1" },
      { actor: RECIPIENT, text: "C2", hash: "0x2" }
    ]
  };
  const res = checkTransition("challenge", caseFull, RECIPIENT, now);
  assert.strictEqual(res.allowed, false);
  console.log(`✓ Rejected properly: ${res.error}`);
}

console.log("\n[Test 6] Challenge rejected when 24h challenge window has expired");
{
  const caseExpired = {
    status: "ASSESSED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    last_at: expiredLastAt,
    challenges: []
  };
  const res = checkTransition("challenge", caseExpired, CREATOR, now);
  assert.strictEqual(res.allowed, false);
  assert.match(res.error, /expired/, "Error must indicate challenge window expired");
  console.log(`✓ Rejected properly: ${res.error}`);
}

// ----------------------------------------------------
// PREFLIGHT PATH 2: FINALIZATION WORKFLOW
// ----------------------------------------------------

console.log("\n[Test 7] First-round finalization is BLOCKED while 24-hour challenge window is open");
{
  const caseRound1Open = {
    status: "ASSESSED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    last_at: lastAt, // 1 hour ago -> 23 hours remaining
    challenges: []
  };
  const res = checkTransition("finalize_case", caseRound1Open, THIRD_PARTY, now);
  assert.strictEqual(res.allowed, false, "Finalization during open 24h challenge window must be blocked");
  assert.match(res.error, /locked until 24-hour challenge window elapses/, "Error must state window is open");
  console.log(`✓ Blocked properly: ${res.error}`);
}

console.log("\n[Test 8] First-round finalization is PERMITTED after 24-hour challenge window has elapsed");
{
  const caseRound1Elapsed = {
    status: "ASSESSED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    last_at: expiredLastAt, // 25 hours ago -> window elapsed
    challenges: []
  };
  const res = checkTransition("finalize_case", caseRound1Elapsed, THIRD_PARTY, now);
  assert.strictEqual(res.allowed, true, "Finalization after 24h challenge window must be allowed");
  console.log("✓ Allowed");
}

console.log("\n[Test 9] Second-round finalization is PERMITTED immediately upon ASSESSED status");
{
  const caseRound2 = {
    status: "ASSESSED",
    round: 2,
    creator: CREATOR,
    recipient: RECIPIENT,
    last_at: lastAt, // Even if recent, round 2 does not have another challenge window
    challenges: [
      { actor: CREATOR, text: "C1", hash: "0x1" }
    ]
  };
  const res = checkTransition("finalize_case", caseRound2, THIRD_PARTY, now);
  assert.strictEqual(res.allowed, true, "Round 2 finalization must be allowed immediately");
  console.log("✓ Allowed");
}

console.log("\n[Test 10] Finalization rejected when status is not ASSESSED (e.g. CHALLENGED or DRAFT)");
{
  const caseChallenged = {
    status: "CHALLENGED",
    round: 1,
    creator: CREATOR,
    recipient: RECIPIENT,
    last_at: expiredLastAt,
    challenges: [{ actor: CREATOR, text: "C1", hash: "0x1" }]
  };
  const res = checkTransition("finalize_case", caseChallenged, THIRD_PARTY, now);
  assert.strictEqual(res.allowed, false);
  assert.match(res.error, /requires ASSESSED status/);
  console.log(`✓ Rejected properly: ${res.error}`);
}

console.log("\n==============================================");
console.log("🎉 ALL PREFLIGHT TRANSITION TESTS PASSED (10/10)");
console.log("==============================================");
