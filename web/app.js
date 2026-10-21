import { chainUI } from './onchain.js';

const $ = s => document.querySelector(s);
const safe = x => String(x ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const phases = [
  ['01', 'Terms sealed', 'Creator records the agreed scope, criteria, payable basis and deadline.'],
  ['02', 'Counterparty consent', 'Client explicitly accepts the term-set and distinct evidence attestor.'],
  ['03', 'Evidence attested', 'An independent wallet vouches for the digest of a frozen delivery record.'],
  ['04', 'Consensus assessment', 'Leader and validators independently interpret four bounded milestone predicates.'],
  ['05', 'Challenge and finality', 'Both parties can challenge, round two considers both and deterministic finalization closes the case.']
];

const steps = () => '<div class="timeline">' + phases.map(([n, t, d]) => `<div class="phase"><span class="phase-num">${n}</span><span><b>${t}</b><small>${d}</small></span></div>`).join('') + '</div>';

const banner = () => '<div class="release"><span class="signal"></span>DEPLOYED ON STUDIONET · Source bytes match the verified contract. On-chain reads are available. Signing stays locked until real browser-wallet and full live consensus qualification pass. No synthetic case is displayed as a live transaction.</div>';

const featured = '<div class="card"><span class="caption">WHY GENLAYER</span><h3>Interpret the work. Bound the decision.</h3><p>Milestone deliverables are often ambiguous: scope, acceptance tests, and material defects depend on natural-language context. Validators independently assess those facts. Frozen budgets, signatures, challenge windows and final amounts remain deterministic.</p><div class="audit"><div class="line">◈ Four strict boolean semantic predicates</div><div class="line">◈ No custody, no automatic payout</div><div class="line">◈ Both parties may challenge</div><div class="line">◈ Case and history are hash-linked</div></div></div>';

const overview = () => `<section class="hero"><span class="overline">EVIDENCE-FIRST MILESTONE GOVERNANCE</span><h1>Proof of work.<br><em>Not just a promise.</em></h1><p>Govern freelance and software milestones with frozen acceptance criteria, signed evidence, independent GenLayer consensus and an enforceable challenge window.</p><div class="hero-actions"><button class="cta" id="open-workspace">Explore the contract workspace ↗</button><button class="tab" id="open-process">See how review works</button></div></section>${banner()}<div class="strip"><div class="stat"><span class="eyebrow">ACCEPTANCE MODEL</span><div class="value">4</div><small>independent semantic checks</small></div><div class="stat"><span class="eyebrow">APPEAL RIGHTS</span><div class="value">2</div><small>distinct party challenge slots</small></div><div class="stat"><span class="eyebrow">FUNDS CUSTODIED</span><div class="value">0</div><small>milestone basis only; no transfer</small></div></div><div class="grid-2"><div class="surface"><div class="section-head"><h2>The acceptance lifecycle</h2><span class="pill">Deterministic state</span></div>${steps()}</div>${featured}</div>`;

const milestones = () => `<section class="hero"><span class="overline">CANONICAL CASE REGISTRY</span><h1>Every milestone.<br><em>Accounted for.</em></h1><p>Live cases appear only when the contract is deployed and read from Studionet. No fabricated on-chain records.</p></section>${banner()}<div class="surface"><div class="section-head"><h2>On-chain case registry</h2><span class="pill">Source: GenLayer RPC</span></div><div id="case-registry">Reading the verified contract case registry…</div></div>`;

const evidence = () => `<section class="hero"><span class="overline">SOURCE INTEGRITY</span><h1>Trust is an<br><em>audit trail.</em></h1><p>Evidence is committed before semantic review. A designated third-party wallet attests to its exact digest; the witness's real-world identity and document authenticity remain external trust assumptions.</p></section><div class="grid-2"><div class="card"><span class="caption">EVIDENCE CHAIN</span><h3>Three distinct roles</h3>${steps()}</div><div class="card"><span class="caption">BOUNDARIES</span><h3>What the contract does not claim</h3><p>It does not authenticate real-world issuer identities, prove the origin of a document, guarantee semantic accuracy, or move funds. Disagreement and missing proof become a bounded non-approval/review result.</p></div></div>`;

const process = () => `<section class="hero"><span class="overline">ONE RULESET · TWO PARTIES</span><h1>Govern the <em>handoff.</em></h1><p>Fewer unilateral reversals, clearer criteria, transparent case history and reviewable outcomes.</p></section><div class="grid-2"><div class="surface">${steps()}</div>${featured}</div>`;

const shortAddr = addr => {
  const s = String(addr || '');
  return s.length > 12 ? `${s.slice(0, 6)}…${s.slice(-4)}` : s;
};

const statusClass = status => String(status || '').toLowerCase().replace(/[^a-z0-9_]/g, '');

const renderInspectorPanel = c => {
  const challenges = Array.isArray(c.challenges) ? c.challenges : [];
  return `
    <div class="inspector-meta-grid">
      <div class="meta-cell">
        <span class="meta-label">Contract Status</span>
        <span class="meta-value">${safe(c.status || 'UNKNOWN')}</span>
      </div>
      <div class="meta-cell">
        <span class="meta-label">Consensus Verdict</span>
        <span class="meta-value" style="color:var(--accent-lime);">${safe(c.result || 'PENDING')}</span>
      </div>
      <div class="meta-cell">
        <span class="meta-label">Consensus Round</span>
        <span class="meta-value">${safe(c.round || 1)} of 2</span>
      </div>
      <div class="meta-cell">
        <span class="meta-label">Milestone Budget</span>
        <span class="meta-value">${Number(c.gross_minor || 0).toLocaleString()} minor units</span>
      </div>
      <div class="meta-cell">
        <span class="meta-label">Release Ratio</span>
        <span class="meta-value">${safe(c.rate_num || 0)} / ${safe(c.rate_den || 1)}</span>
      </div>
      <div class="meta-cell">
        <span class="meta-label">Approved Payable Basis</span>
        <span class="meta-value">${Number(c.payable_minor || 0).toLocaleString()} minor units</span>
      </div>
      <div class="meta-cell">
        <span class="meta-label">Creator</span>
        <span class="meta-address" title="${safe(c.creator)}">${safe(shortAddr(c.creator))}</span>
      </div>
      <div class="meta-cell">
        <span class="meta-label">Counterparty</span>
        <span class="meta-address" title="${safe(c.recipient)}">${safe(shortAddr(c.recipient))}</span>
      </div>
      <div class="meta-cell">
        <span class="meta-label">Attestor</span>
        <span class="meta-address" title="${safe(c.attestor)}">${safe(shortAddr(c.attestor))} ${c.attested ? '✓ Attested' : ''}</span>
      </div>
    </div>

    ${c.rule ? `
    <div class="inspector-block">
      <div class="inspector-block-title">Frozen Acceptance Criteria & Agreement Scope</div>
      <div class="inspector-block-content">${safe(c.rule)}</div>
    </div>` : ''}

    ${c.evidence ? `
    <div class="inspector-block evidence">
      <div class="inspector-block-title">Designated Attestation & Evidence Submission</div>
      <div class="inspector-block-content">${safe(c.evidence)}</div>
      ${c.source_ref ? `<div style="margin-top:6px;font-size:11.5px;color:var(--text-dim);font-family:'JetBrains Mono',monospace;">Source Ref: ${safe(c.source_ref)}</div>` : ''}
    </div>` : ''}

    ${challenges.length ? `
    <div class="inspector-block challenge">
      <div class="inspector-block-title">Challenge Statements & Party Reconsiderations (${challenges.length})</div>
      <div class="challenges-stack">
        ${challenges.map(ch => `
          <div class="challenge-entry">
            <div class="challenge-actor">Party: ${safe(shortAddr(ch.actor))}</div>
            <div class="challenge-text">${safe(ch.text)}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    <details class="json-details">
      <summary class="json-summary">Raw GenLayer RPC Payload ({})</summary>
      <pre class="mono" style="margin:0;border-radius:0;background:transparent;border:none;">${safe(JSON.stringify(c, null, 2))}</pre>
    </details>
  `;
};

let current = 'Overview';

async function registry() {
  const node = $('#case-registry');
  if (!node) return;
  const address = window.CONTRACT_ADDRESS;
  if (!/^0x[a-f0-9]{40}$/i.test(address)) {
    node.innerHTML = '<div class="report-alert error">NOT DEPLOYED · Live case registry unavailable. Example milestone cases are deliberately not shown.</div>';
    return;
  }
  try {
    const { createClient } = await import('genlayer-js');
    const { studionet } = await import('genlayer-js/chains');
    const client = createClient({ chain: studionet });
    node.innerHTML = '<div class="report-alert info"><span>⏳</span><span>Reading live case registry from GenLayer Studionet…</span></div>';
    const ids = await client.readContract({ address, functionName: 'get_case_ids_page', args: [0, 50] });
    if (!Array.isArray(ids)) throw Error('Invalid chain case array');
    if (!ids.length) {
      node.innerHTML = '<div class="report-alert info">No on-chain milestone cases submitted yet. Use the On-chain workspace to register a new case.</div>';
      return;
    }

    node.innerHTML = ids.map((id, idx) => `
      <div class="case-card ${idx === 0 ? 'expanded' : ''}" id="card-${safe(id)}">
        <div class="case-card-header" data-toggle="${safe(id)}">
          <div class="case-header-left">
            <span class="case-tag">CASE</span>
            <span class="case-id-text">${safe(id)}</span>
          </div>
          <div class="case-header-right">
            <span class="status-badge" id="badge-${safe(id)}">Loading…</span>
            <span class="toggle-icon">▼</span>
          </div>
        </div>
        <div class="case-inspector-panel" id="panel-${safe(id)}" style="${idx === 0 ? 'display:flex' : 'display:none'}">
          <div style="font-size:12px;color:var(--text-dim);padding:8px 0;">Fetching canonical state from Studionet…</div>
        </div>
      </div>
    `).join('');

    // Bind accordion toggles
    node.querySelectorAll('[data-toggle]').forEach(header => {
      header.addEventListener('click', () => {
        const id = header.dataset.toggle;
        const card = document.getElementById(`card-${id}`);
        const panel = document.getElementById(`panel-${id}`);
        if (!card || !panel) return;
        const willExpand = !card.classList.contains('expanded');
        card.classList.toggle('expanded', willExpand);
        panel.style.display = willExpand ? 'flex' : 'none';
      });
    });

    // Asynchronously populate each case card
    ids.forEach(async (id, idx) => {
      try {
        const raw = await client.readContract({ address, functionName: 'get_case', args: [id] });
        const c = typeof raw === 'string' ? JSON.parse(raw) : raw;
        const badgeNode = document.getElementById(`badge-${id}`);
        const panelNode = document.getElementById(`panel-${id}`);
        if (badgeNode) {
          badgeNode.className = `status-badge ${statusClass(c.status)}`;
          badgeNode.textContent = c.status || 'UNKNOWN';
        }
        if (panelNode) {
          panelNode.innerHTML = renderInspectorPanel(c);
        }
      } catch (err) {
        const panelNode = document.getElementById(`panel-${id}`);
        if (panelNode) {
          panelNode.innerHTML = `<div class="report-alert error">Failed to load case state: ${safe(err.message || err)}</div>`;
        }
      }
    });

  } catch (e) {
    node.innerHTML = `<div class="report-alert error">Live read failed: ${safe(String(e).slice(0, 250))}</div>`;
  }
}

function render(name) {
  current = name;
  const title = $('#page-title');
  if (title) title.textContent = name;
  document.querySelectorAll('[data-page]').forEach(b => b.classList.toggle('active', b.dataset.page === name));
  const content = $('#content');
  if (content) {
    content.innerHTML = name === 'Overview' ? overview()
      : name === 'Milestones' ? milestones()
      : name === 'Evidence' ? evidence()
      : name === 'Process' ? process()
      : chainUI.render();
  }
  if (name === 'On-chain') chainUI.bind();
  if (name === 'Milestones') registry();
  $('#open-workspace')?.addEventListener('click', () => render('On-chain'));
  $('#open-process')?.addEventListener('click', () => render('Process'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function showLanding(updateHistory = true) {
  document.body.className = 'landing-active';
  if (updateHistory && window.location.pathname !== '/') {
    history.pushState(null, '', '/');
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function enterWorkspace(page = 'Overview', updateHistory = true) {
  document.body.className = 'workspace-active';
  render(page);
  if (updateHistory && window.location.pathname !== '/app') {
    history.pushState(null, '', '/app');
  }
}

// Navigation event bindings
$('#nav-enter-app-btn')?.addEventListener('click', () => enterWorkspace('Overview'));
$('#hero-enter-app-btn')?.addEventListener('click', () => enterWorkspace('Overview'));
$('#sidebar-back-landing')?.addEventListener('click', () => showLanding(true));

$('#workspace-wallet-trigger')?.addEventListener('click', () => {
  render('On-chain');
  document.getElementById('chain-wallet')?.click();
});

document.querySelectorAll('[data-page]').forEach(b => b.addEventListener('click', () => render(b.dataset.page)));

window.addEventListener('popstate', () => {
  if (window.location.pathname.startsWith('/app')) {
    enterWorkspace(current || 'Overview', false);
  } else {
    showLanding(false);
  }
});

// Initial route determination
const initialPath = window.location.pathname;
const initialHash = window.location.hash.slice(1);
const hashMap = {
  overview: 'Overview',
  milestones: 'Milestones',
  evidence: 'Evidence',
  process: 'Process',
  'on-chain': 'On-chain'
};

if (initialPath.startsWith('/app') || hashMap[initialHash]) {
  enterWorkspace(hashMap[initialHash] || 'Overview', false);
} else {
  showLanding(false);
}
