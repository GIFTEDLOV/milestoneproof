# MilestoneProof

[![exact-source-quality](https://github.com/GIFTEDLOV/milestoneproof/actions/workflows/ci.yml/badge.svg)](https://github.com/GIFTEDLOV/milestoneproof/actions/workflows/ci.yml)
[![exact-release-qualification](https://github.com/GIFTEDLOV/milestoneproof/actions/workflows/release.yml/badge.svg)](https://github.com/GIFTEDLOV/milestoneproof/actions/workflows/release.yml)

**GenLayer Studionet (Chain ID 61999) — Intelligent Contract and Production DApp for Freelance Milestone Governance.**

Govern freelance and enterprise milestones with frozen acceptance criteria, third-party attested evidence digests, independent GenVM validator consensus, and enforceable challenge windows.

---

## 1. Live Deployment & Production Application

- **Live Production DApp**: [https://milestoneproof-genlayer.vercel.app](https://milestoneproof-genlayer.vercel.app)
- **Direct Workspace Route**: [https://milestoneproof-genlayer.vercel.app/app](https://milestoneproof-genlayer.vercel.app/app)
- **GenLayer Studionet Explorer**: [`0xD4AdDBe785176EfC96da0B371FfBa03C5ff6c0c9`](https://explorer-studio.genlayer.com/address/0xD4AdDBe785176EfC96da0B371FfBa03C5ff6c0c9)
- **Deployed Python Source SHA-256**: `1b7a7424b4195ff6df0bd622aa9cdfce79aba2e49a05feb00a9385dafae8610b`
- **Deployment Transaction**: `0x7ab4dad98b090ca61919141fe7968f495239af117e7aed3503cb426c5e82aaab`
- **Canonical Demonstration Case**: `GNEW-milestoneproof-39238668302`
  - Status: `FINALIZED`
  - Deliberation: Round `2`
  - Consensus Verdict: `REVIEW_REQUIRED`
  - Challenges: `2` (both creator and client appeal slots exercised)
  - GenVM Consensus: `MAJORITY_AGREE`

---

## 2. Core Architecture & Native GenLayer Justification

Freelance deliverables are inherently ambiguous: scope boundaries, acceptance test passing rates, and material defect claims depend on natural-language context. Traditional smart contracts cannot interpret complex deliverables or test suites without centralizing trust into an admin key.

### Acceptance Lifecycle:
1. **Terms Sealed (`create_case` & `consent`)**: Creator records agreed scope, acceptance criteria, milestone budget basis, and deadline. Counterparty explicitly consents before terms are frozen.
2. **Independent Attestation (`submit_evidence` & `attest_evidence`)**: Delivery records are locked with a cryptographic digest. A designated independent attestor vouches for the record digest.
3. **Validator Consensus (`adjudicate`)**: Leader and validators independently interpret four strict boolean predicates:
   - `deliverable_in_scope`
   - `acceptance_criteria_met`
   - `material_defect_supported`
   - `evidence_sufficient`
4. **Challenge & Finality (`challenge` & `finalize_case`)**: Both parties hold distinct challenge slots. If challenged, a second round re-evaluates all evidence before deterministic finalization.

---

## 3. Automated Verification & Testing

### A. Run All Unit & Adversarial Tests
```bash
python -m pytest -v
```
*36/36 tests pass: includes mock GenLayer regression, adversarial red-team prompt injections, attestor spoofing, fraction and budget bounds, and repository isolation.*

### B. Live End-to-End On-Chain Audit
```bash
node tests/test_live_e2e.mjs
```
*Directly connects to GenLayer Studionet RPC (61999), verifies exact source byte parity via `gen_getContractCode`, queries case pagination, asserts canonical case state (`GNEW-milestoneproof-39238668302`), validates cryptographic audit history hash links, and asserts HTTP 200 on production Vercel endpoints.*

### C. Build Web Application
```bash
cd web && npm run check && npm run build
```
*Builds the production Vite bundle with 0 errors and asserts mobile 390px viewport compliance.*

### D. Secret Leak Audit
```bash
node scripts/secret_scan.mjs
```
*Scans all repository files to guarantee zero leaked private keys, API tokens, or secrets.*

---

## 4. Documentation & Portal Links

- [Portal Submission Dossier](docs/SUBMISSION.md)
- [Submission Fields (JSON)](docs/SUBMISSION_FIELDS.json)
- [Deployment Provenance](docs/DEPLOYMENT.md)
- [Security Review](docs/SECURITY.md)
- [Release Gates](docs/RELEASE_GATES.md)

---

## 5. Explicit Trust Boundaries

- **Zero Escrow Custody**: MilestoneProof derives objective milestone acceptance; it never holds client funds or executes automatic payment drains.
- **Attestor Attribution**: An attestor signature confirms wallet attribution, not physical identity or external document veracity.
- **Append-Only State**: All case transitions and historical verdicts are permanently hash-linked on GenLayer Studionet.
