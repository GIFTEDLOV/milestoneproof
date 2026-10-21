# MilestoneProof — GenLayer Portal Submission Information

**Project name:** MilestoneProof

**One line:** Independent, challengeable freelance milestone acceptance on GenLayer Studionet with live contract workspace and Web3 wallet connectivity.

## Project description

MilestoneProof is an Intelligent Contract and decentralized application for objective freelance deliverable acceptance on GenLayer Studionet. Freelance deliverables are often ambiguous: scope, acceptance tests, and material defects depend on natural-language context. Validators independently evaluate four bounded boolean predicates (deliverable_in_scope, acceptance_criteria_met, material_defect_supported, evidence_sufficient). Frozen budgets, signatures, challenge windows, and final amounts remain strictly deterministic.

**Why GenLayer:** Natural-language acceptance criteria and delivery evidence require semantic interpretation that EVM smart contracts cannot perform. GenLayer validators interpret attested digests and criteria via equivalence principle prompts, while deterministic on-chain logic enforces non-custodial milestone budgets, actor separation, and challenge finality.

## Technical links

- GitHub: https://github.com/GIFTEDLOV/milestoneproof
- Production App: https://milestoneproof-genlayer.vercel.app
- Workspace Deep-Link: https://milestoneproof-genlayer.vercel.app/app
- Deployment: https://explorer-studio.genlayer.com/address/0xD4AdDBe785176EfC96da0B371FfBa03C5ff6c0c9
- Network: 61999 Studionet
- Source SHA-256: `1b7a7424b4195ff6df0bd622aa9cdfce79aba2e49a05feb00a9385dafae8610b`
- Demonstration case: `GNEW-milestoneproof-39238668302`, FINALIZED / REVIEW_REQUIRED; two party challenges; verified GenVM execution and hash-linked history.
- Live E2E Audit: Verified and reproducible via `node tests/test_live_e2e.mjs`.

## Reviewer steps

1. Visit the live production dApp at https://milestoneproof-genlayer.vercel.app.
2. Experience the dedicated landing page with clean navbar containing solely the brand and `⚡ Enter App ↗`.
3. Click `⚡ Enter App ↗` to transition into the `/app` operational workspace.
4. Connect any EVM wallet on Studionet (Chain ID 61999) using the workspace wallet connect.
5. Inspect the live case registry reading directly from GenLayer Studionet RPC.
6. Verify contract bytecode parity using `scripts/verify-live.mjs` or `node tests/test_live_e2e.mjs`.

**Limits:** An agreed attestor-wallet signature confirms wallet control, not real-world identity or physical work completion. No automatic funds transfer or escrow custody is held by the contract.

**Portal submission status:** PREPARED_READY_FOR_PORTAL. Verified on Studionet chain 61999.
