// ═══════════════════════════════════════════════════════════════
// OPS DASHBOARD · BIM × 8×5 × Tgq · v5.0
// Architecture: Lazy loading · 6-table governance DB
// Principle: Exception & Decision — not full BIM data
// ═══════════════════════════════════════════════════════════════

// ── CONFIG ───────────────────────────────────────────────────
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw5bKmOhcbvb0Q2cM8_ZoHYSacoRK0LZWKgrJqfFHzGj-pYbEU29WiP1Q7asecoi3Jn/exec';
const APP_VER   = 'v5.0';

// ── BIM CONSTANTS ─────────────────────────────────────────────
const BIM_STAGES = [
  {id:'01-concept',     code:'G01', name:'Concept BIM',      short:'Concept',     color:'#E6F1FB',tc:'#0C447C'},
  {id:'02-feasibility', code:'G02', name:'Feasibility BIM',  short:'FS BIM',      color:'#EEEDFE',tc:'#3C3489'},
  {id:'03-design',      code:'G03', name:'Design BIM',       short:'Design',      color:'#EAF3DE',tc:'#27500A'},
  {id:'04-construction',code:'G04', name:'Construction BIM', short:'Construction',color:'#FAEEDA',tc:'#633806'},
  {id:'05-as-built',    code:'G05', name:'As-Built BIM',     short:'As-Built',    color:'#E1F5EE',tc:'#085041'},
  {id:'06-operation',   code:'G06', name:'Operation BIM',    short:'Operation',   color:'#F1EFE8',tc:'#444441'},
];

const GATE_EVIDENCE = {
  'G01':['Business Requirements','Initial CAPEX Established','Concept Design Rev.01','Traffic / Feasibility Study','Capacity Schedule','Technical Assumptions'],
  'G02':['Market Validation','Technical FS','CAPEX (FS Level)','OPEX / Operating Model','Revenue Model','Cash Flow','Payback / IRR','Risk Assessment','Investor Decision'],
  'G03':['Design Freeze Approved','Permit Package Ready','BOQ / Tender Documents','Contractor Shortlist'],
  'G04':['Contract Signed','Site Mobilization Ready','QA/QC Plan Approved','SOP Draft (Operations)'],
  'G05':['As-Built BIM Model','Handover Documentation','Defects Closed','SOP Final 4★'],
  'G06':['KPI Baseline Established','All SOPs Live','Rubix 4★ Certified'],
};

const GATE_STATUS = {
  'ready':       {label:'🟢 Ready',      color:'#0D6E4A',bg:'#E0F8EE'},
  'in-progress': {label:'🟡 In progress',color:'#B86B00',bg:'#FFF3DC'},
  'not-ready':   {label:'🔴 Not ready',  color:'#C0392B',bg:'#FCEBEB'},
  'go':          {label:'✅ GO',         color:'#0D6E4A',bg:'#E0F8EE'},
  'revise':      {label:'🔄 Revise',     color:'#3D5CF5',bg:'#EEF2FF'},
  'no-go':       {label:'❌ No-Go',      color:'#C0392B',bg:'#FCEBEB'},
};

const ACTION_TYPES = {
  action:'📋 Action','risk':'⚠️ Risk','issue':'🔴 Issue','assumption':'💡 Assumption','rfi':'❓ RFI',
};
const PRIORITY_CFG = {
  high:{label:'🔴 High',color:'#C0392B',bg:'#FCEBEB'},
  med: {label:'🟡 Medium',color:'#B86B00',bg:'#FFF3DC'},
  low: {label:'🟢 Low',color:'#0D6E4A',bg:'#E0F8EE'},
};
const AUTHORITY_LEVELS = ['L1 — PMO','L2 — CĐT','L3 — CĐT + Board'];
const FINANCE_TYPES = {
  concept:'Concept Budget',fs:'FS CAPEX',design:'Design Estimate',
  contract:'Contract Value',actual:'Actual Cost',
};

// ── STATE ─────────────────────────────────────────────────────
let S = {
  // Boot data (loaded on start)
  projects: [], gates: [], openActions: [], pendingDecisions: [],
  // Lazy-loaded per project/tab
  _loaded: {},    // { 'finance-P01': true, 'changes-P01': true, ... }
  _finance: {},   // keyed by projectId
  _changes: {},
  _allActions: {},
  _allDecisions: {},
  // Snapshot (for investor cockpit)
  snapshot: [],
  // UI state
  activeProjectId: null,
  activeTab: 'overview',
  lang: 'vi',
  // Counters
  _counters: { P:1, G:1, A:1, C:1, D:1, F:1 },
};

let _syncStatus = 'offline';
let _syncTimer  = null;
let _pendingSave = false;
const LS_KEY = 'ops_gov_v5';

// ── HELPERS ───────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const today = () => new Date().toISOString().split('T')[0];
const ts    = () => new Date().toISOString();

function getBimStage(id) { return BIM_STAGES.find(s=>s.id===id)||BIM_STAGES[0]; }
function getGateForProject(projectId, stageId) {
  return S.gates.find(g=>g.projectId===projectId&&g.stage===stageId);
}
function nextId(prefix) {
  const k = prefix;
  S._counters[k] = (S._counters[k]||1);
  return prefix + '-' + String(S._counters[k]++).padStart(3,'0');
}
function toast(msg, isErr=false) {
  let el = $('toast-el');
  if(!el){el=document.createElement('div');el.id='toast-el';Object.assign(el.style,{position:'fixed',bottom:'60px',left:'50%',transform:'translateX(-50%)',padding:'8px 18px',borderRadius:'20px',fontSize:'12px',fontWeight:'600',zIndex:'9999',pointerEvents:'none',transition:'opacity .3s'});document.body.appendChild(el);}
  el.textContent=msg;el.style.background=isErr?'#FCEBEB':'#E0F8EE';el.style.color=isErr?'#C0392B':'#0D6E4A';el.style.opacity='1';
  clearTimeout(el._t);el._t=setTimeout(()=>el.style.opacity='0',2200);
}
function syncBadge(status, msg) {
  _syncStatus = status;
  let el = $('sync-badge');
  if(!el){el=document.createElement('div');el.id='sync-badge';Object.assign(el.style,{position:'fixed',bottom:'18px',left:'18px',zIndex:'9998',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'600',boxShadow:'0 2px 8px rgba(0,0,0,.1)',transition:'all .3s'});document.body.appendChild(el);}
  const cfg={online:{bg:'#E0F8EE',c:'#0D6E4A',icon:'☁️',t:msg||'Synced'},syncing:{bg:'#EEF2FF',c:'#3D5CF5',icon:'🔄',t:'Saving...'},offline:{bg:'#FFF3DC',c:'#B86B00',icon:'📴',t:'Offline'},error:{bg:'#FCEBEB',c:'#C0392B',icon:'⚠️',t:msg||'Error'}};
  const c=cfg[status]||cfg.offline;el.style.background=c.bg;el.style.color=c.c;el.innerHTML=`<span>${c.icon}</span> <span>${c.t}</span>`;
}

// ── API LAYER (lazy, no-cors POST for writes, GET for reads) ──
async function apiFetch(action, params={}) {
  if (SHEET_URL === 'PASTE_YOUR_APPS_SCRIPT_URL_HERE') return null;
  const url = SHEET_URL + '?action=' + action + Object.entries(params).map(([k,v])=>'&'+k+'='+encodeURIComponent(v)).join('');
  try {
    const res = await fetch(url, { method:'GET', redirect:'follow' });
    return await res.json();
  } catch(err) { console.error('apiFetch', action, err); return null; }
}

async function apiWrite(action, data) {
  if (SHEET_URL === 'PASTE_YOUR_APPS_SCRIPT_URL_HERE') { saveLocal(); return; }
  syncBadge('syncing');
  try {
    await fetch(SHEET_URL, {
      method:'POST', mode:'no-cors',
      headers:{'Content-Type':'text/plain'},
      body: JSON.stringify({ action, data }),
    });
    setTimeout(async()=>{
      const p=await apiFetch('ping');
      if(p?.ok){syncBadge('online');_pendingSave=false;}
      else syncBadge('offline','Saved locally');
    },2000);
  } catch(err) { syncBadge('error'); _pendingSave=true; }
  saveLocal();
}

function saveLocal() { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch(e){} }
function loadLocal() { try { const d=localStorage.getItem(LS_KEY); if(d){const p=JSON.parse(d);Object.assign(S,p);} } catch(e){} }

// ── BOOT: load minimal data on startup ────────────────────────
async function boot() {
  syncBadge('syncing','Loading...');
  loadLocal(); // show cached data immediately
  renderAll();

  if (SHEET_URL === 'PASTE_YOUR_APPS_SCRIPT_URL_HERE') {
    syncBadge('offline','⚙️ Configure SHEET_URL');
    return;
  }
  const data = await apiFetch('boot');
  if (data?.ok) {
    S.projects        = data.projects || [];
    S.gates           = data.gates    || [];
    S.openActions     = data.openActions || [];
    S.pendingDecisions= data.pendingDecisions || [];
    if (!S.activeProjectId && S.projects.length) S.activeProjectId = S.projects[0].id;
    saveLocal();
    syncBadge('online');
    renderAll();
  } else {
    syncBadge('error','Using cached data');
  }
}

// ── LAZY LOADERS ─────────────────────────────────────────────
async function ensureSnapshot() {
  if (S._loaded['snapshot']) return;
  const data = await apiFetch('snapshot');
  if (data?.ok) { S.snapshot = data.rows; S._loaded['snapshot'] = true; saveLocal(); }
}

async function ensureFinance(projectId) {
  const k = 'finance-' + projectId;
  if (S._loaded[k]) return;
  const data = await apiFetch('finance', { projectId });
  if (data?.ok) { S._finance[projectId] = data.rows; S._loaded[k] = true; saveLocal(); }
}

async function ensureChanges(projectId) {
  const k = 'changes-' + projectId;
  if (S._loaded[k]) return;
  const data = await apiFetch('changes', { projectId });
  if (data?.ok) { S._changes[projectId] = data.rows; S._loaded[k] = true; saveLocal(); }
}

async function ensureActions(projectId) {
  const k = 'actions-' + projectId;
  if (S._loaded[k]) return;
  const data = await apiFetch('actions', { projectId });
  if (data?.ok) { S._allActions[projectId] = data.rows; S._loaded[k] = true; saveLocal(); }
}

async function ensureDecisions(projectId) {
  const k = 'decisions-' + projectId;
  if (S._loaded[k]) return;
  const data = await apiFetch('decisions', { projectId });
  if (data?.ok) { S._allDecisions[projectId] = data.rows; S._loaded[k] = true; saveLocal(); }
}

async function refreshProject(projectId) {
  // Force reload for this project
  ['finance','changes','actions','decisions'].forEach(t => delete S._loaded[t+'-'+projectId]);
  delete S._loaded['snapshot'];
  await Promise.all([
    ensureFinance(projectId), ensureChanges(projectId),
    ensureActions(projectId), ensureDecisions(projectId),
  ]);
}

// ── TAB ROUTING ───────────────────────────────────────────────
function sw(id, btn) {
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  if(btn) btn.classList.add('active');
  const panel = $('panel-'+id);
  if(panel) panel.classList.add('active');
  S.activeTab = id;

  if (id==='overview') { renderOverview(); }
  else if (id==='bim') { renderBim(); }
  else if (id==='actions') { const pid=S.activeProjectId; if(pid) ensureActions(pid).then(()=>renderActions()); else renderActions(); }
  else if (id==='changes') { const pid=S.activeProjectId; if(pid) ensureChanges(pid).then(()=>renderChanges()); else renderChanges(); }
  else if (id==='decisions') { const pid=S.activeProjectId; if(pid) ensureDecisions(pid).then(()=>renderDecisions()); else renderDecisions(); }
  else if (id==='finance') { const pid=S.activeProjectId; if(pid) ensureFinance(pid).then(()=>renderFinance()); else renderFinance(); }
}

function openModal(id) { $(id)?.classList.add('open'); }
function closeModal(id) { $(id)?.classList.remove('open'); }

// ── PROJECT SELECTOR ─────────────────────────────────────────
function populateProjectSelector() {
  const sel = $('project-sel');
  if (!sel) return;
  sel.innerHTML = S.projects.map(p=>`<option value="${p.id}" ${p.id===S.activeProjectId?'selected':''}>${p.name}</option>`).join('');
}

function onProjectChange(val) {
  S.activeProjectId = val;
  saveLocal();
  renderAll();
  // Lazy load data for new project
  if (S.activeTab !== 'overview') sw(S.activeTab);
}

function renderAll() {
  populateProjectSelector();
  updateTopbar();
  if (S.activeTab==='overview') renderOverview();
  else if (S.activeTab==='bim') renderBim();
  else if (S.activeTab==='actions') renderActions();
  else if (S.activeTab==='changes') renderChanges();
  else if (S.activeTab==='decisions') renderDecisions();
  else if (S.activeTab==='finance') renderFinance();
}

function updateTopbar() {
  const p = S.projects.find(x=>x.id===S.activeProjectId);
  const sub = $('topbar-sub');
  if(sub) sub.textContent = S.projects.length + ' projects · ' +
    S.projects.filter(x=>x.status==='active').length + ' active · ' +
    S.openActions.length + ' open actions';
}

// ── OVERVIEW: Investor Cockpit ────────────────────────────────
async function renderOverview() {
  await ensureSnapshot();
  const snap = S.snapshot.length ? S.snapshot : S.projects.map(p => {
    const g = S.gates.find(g=>g.projectId===p.id&&g.stage===p.bimStage);
    const acts = S.openActions.filter(a=>a.projectId===p.id).length;
    const decs = S.pendingDecisions.filter(d=>d.projectId===p.id).length;
    return {projectId:p.id,name:p.name,bimStage:p.bimStage,gateCode:g?.gateCode||'—',gateStatus:g?.status||'not-ready',readiness:g?.readiness||0,capexBaseline:'—',actual:'—',deltaCapex:'—',openActions:acts,pendingDecisions:decs,criticalIssue:'—'};
  });

  // Exception strip
  const exceptions = [];
  S.openActions.filter(a=>a.priority==='high').forEach(a=>{
    const p=S.projects.find(x=>x.id===a.projectId);
    exceptions.push({site:p?.name||'—',msg:a.title,sev:'high'});
  });
  S.pendingDecisions.forEach(d=>{
    const p=S.projects.find(x=>x.id===d.projectId);
    if(d.authorityLevel==='L2'||d.authorityLevel==='L3')
      exceptions.push({site:p?.name||'—',msg:'['+d.authorityLevel+'] '+d.subject,sev:'med'});
  });

  const excEl = $('exception-strip');
  if(excEl) excEl.innerHTML = !exceptions.length
    ? `<div style="padding:8px 14px;font-size:11px;color:#0D6E4A">✅ No exceptions above tolerance</div>`
    : exceptions.map(e=>`<div style="padding:6px 14px;border-bottom:0.5px solid var(--border);display:flex;gap:8px;align-items:center">
        <span style="background:${e.sev==='high'?'#FCEBEB':'#FFF3DC'};color:${e.sev==='high'?'#C0392B':'#B86B00'};padding:1px 7px;border-radius:8px;font-size:9px;font-weight:600;flex-shrink:0">${e.sev==='high'?'CRITICAL':'ACTION'}</span>
        <span style="font-size:11px;color:var(--text-secondary);flex-shrink:0">${e.site}</span>
        <span style="font-size:11px">${e.msg}</span>
      </div>`).join('');

  // Portfolio table
  const tbl = $('portfolio-table');
  if(!tbl) return;
  tbl.innerHTML = snap.map(r=>{
    const gst = GATE_STATUS[r.gateStatus]||GATE_STATUS['not-ready'];
    const rd  = +r.readiness||0;
    const rC  = rd>=70?'#0D6E4A':rd>=40?'#B86B00':'#C0392B';
    const bimSt = getBimStage(r.bimStage);
    return `<tr style="border-bottom:0.5px solid var(--border);cursor:pointer" onclick="S.activeProjectId='${r.projectId}';populateProjectSelector();sw('bim',document.querySelector('[onclick*=bim]'))">
      <td style="padding:8px 12px;font-weight:600">${r.name}</td>
      <td style="padding:8px 12px"><span style="background:${bimSt.color};color:${bimSt.tc};padding:2px 9px;border-radius:10px;font-size:10px;font-weight:600">${bimSt.short}</span></td>
      <td style="padding:8px 12px;font-size:11px">${r.gateCode}</td>
      <td style="padding:8px 12px">
        <div style="display:flex;align-items:center;gap:5px">
          <div style="width:50px;background:#F0F0F0;border-radius:3px;height:5px;overflow:hidden"><div style="width:${rd}%;height:100%;background:${rC}"></div></div>
          <span style="font-size:10px;font-weight:700;color:${rC}">${rd}%</span>
        </div>
        <span style="background:${gst.bg};color:${gst.color};padding:1px 7px;border-radius:8px;font-size:9px;font-weight:600">${gst.label}</span>
      </td>
      <td style="padding:8px 12px;font-size:11px">${r.capexBaseline && r.capexBaseline!='0'?Number(r.capexBaseline).toLocaleString('vi-VN')+' tr':'—'}</td>
      <td style="padding:8px 12px;font-size:11px;color:${r.deltaCapex&&r.deltaCapex!='—'&&r.deltaCapex!='0%'?'#C0392B':'inherit'}">${r.deltaCapex||'—'}</td>
      <td style="padding:8px 12px;text-align:center"><span style="font-weight:700;color:${+r.openActions>0?'#B86B00':'#888'}">${r.openActions||0}</span></td>
      <td style="padding:8px 12px;text-align:center"><span style="font-weight:700;color:${+r.pendingDecisions>0?'#C0392B':'#888'}">${r.pendingDecisions||0}</span></td>
      <td style="padding:8px 12px;font-size:10px;color:#888;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.criticalIssue||'—'}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="9" style="padding:20px;text-align:center;color:#aaa">Chưa có dự án nào. + New Project để bắt đầu.</td></tr>`;

  // Pending decisions for CĐT
  const decEl=$('pending-decisions-list');
  if(decEl) decEl.innerHTML = !S.pendingDecisions.length
    ? `<div style="padding:14px;font-size:11px;color:#888;text-align:center">✅ Không có quyết định nào đang chờ CĐT</div>`
    : S.pendingDecisions.slice(0,5).map(d=>{
        const p=S.projects.find(x=>x.id===d.projectId);
        return `<div style="padding:8px 14px;border-bottom:0.5px solid var(--border)">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:3px">
            <span style="font-size:10px;font-weight:700;color:#C0392B;background:#FCEBEB;padding:1px 7px;border-radius:8px">${d.authorityLevel||'L2'}</span>
            <span style="font-size:12px;font-weight:600">${d.subject}</span>
          </div>
          <div style="font-size:10px;color:#6B6B6B">${p?.name||'—'} · Due: <span style="color:#C0392B;font-weight:600">${d.dueDate||'—'}</span> · A: ${d.accountable||'CĐT'}</div>
          ${d.recommendation?`<div style="font-size:10px;color:#3D5CF5;margin-top:2px">PM Rec: ${d.recommendation}</div>`:''}
        </div>`;
      }).join('');
}

// ── BIM/GATE ──────────────────────────────────────────────────
async function renderBim() {
  const pid = S.activeProjectId;
  const proj= S.projects.find(p=>p.id===pid);
  const el  = $('bim-content');
  if(!el) return;
  if(!proj) { el.innerHTML='<div class="empty">Chọn dự án để xem BIM Gate.</div>'; return; }

  await ensureFinance(pid);
  const curStage = getBimStage(proj.bimStage||'01-concept');
  const allGates = S.gates.filter(g=>g.projectId===pid);
  const curGate  = allGates.find(g=>g.stage===proj.bimStage);
  const gst      = GATE_STATUS[curGate?.status||'not-ready'];
  const rd       = +(curGate?.readiness||0);
  const rC       = rd>=70?'#0D6E4A':rd>=40?'#B86B00':'#C0392B';
  const evidence = GATE_EVIDENCE[curStage.code]||[];
  const doneEv   = curGate?.evidence ? curGate.evidence.split(',') : [];

  // Pipeline
  const curIdx   = BIM_STAGES.findIndex(s=>s.id===proj.bimStage);
  const pipeline = BIM_STAGES.map((st,i)=>{
    const gd    = allGates.find(g=>g.stage===st.id);
    const isCur = i===curIdx;
    const isDone= i<curIdx||gd?.decision==='go';
    return `<div style="display:flex;flex-direction:column;align-items:center;flex:1;position:relative">
      ${i>0?`<div style="position:absolute;left:-50%;top:14px;width:100%;height:2px;background:${isDone?'#0D6E4A':'#E2E2DC'}"></div>`:''}
      <div style="width:28px;height:28px;border-radius:50%;background:${isDone?'#0D6E4A':isCur?st.color:'#F5F5F2'};border:2px solid ${isDone?'#0D6E4A':isCur?st.tc:'#E2E2DC'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:${isDone?'#fff':isCur?st.tc:'#aaa'};z-index:1">
        ${isDone?'✓':st.code.replace('G','')}
      </div>
      <div style="font-size:9px;font-weight:${isCur?600:400};color:${isCur?st.tc:'#888'};margin-top:4px;text-align:center;line-height:1.3">${st.short}</div>
      <div style="font-size:8px;color:${gd?.decision?GATE_STATUS[gd.decision]?.color:'#aaa'}">${gd?.decision?.toUpperCase()||''}</div>
    </div>`;
  }).join('');

  // Gate evidence checklist (read-only display, click to toggle)
  const evHtml = evidence.map((ev,i)=>{
    const done = doneEv.includes(String(i));
    return `<label style="display:flex;gap:8px;padding:6px 10px;border-radius:6px;background:${done?'#E0F8EE':'var(--surface-1)'};margin-bottom:4px;cursor:pointer;align-items:center" onclick="toggleEvidence('${pid}','${i}')">
      <span style="width:16px;height:16px;border-radius:3px;border:1.5px solid ${done?'#0D6E4A':'#ccc'};background:${done?'#0D6E4A':'#fff'};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;color:#fff">${done?'✓':''}</span>
      <span style="font-size:12px;color:${done?'#0D6E4A':'var(--text-primary)'}${done?';text-decoration:line-through':''}">${ev}</span>
    </label>`;
  }).join('');

  // Finance summary
  const fins = S._finance[pid]||[];
  const curFin = fins.find(f=>f.isCurrent==='TRUE'||f.isCurrent===true)||fins[fins.length-1];
  const finHtml = fins.length ? `
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px">
      ${fins.map(f=>`<div style="background:${f.isCurrent==='TRUE'||f.isCurrent?'#EEF2FF':'var(--surface-1)'};border:0.5px solid var(--border);border-radius:8px;padding:8px 12px;flex:1;min-width:100px">
        <div style="font-size:9px;color:var(--text-secondary);font-weight:600;text-transform:uppercase">${FINANCE_TYPES[f.type]||f.type}</div>
        <div style="font-size:14px;font-weight:700;color:#1A2F5A">${Number(f.amount||0).toLocaleString('vi-VN')} tr</div>
        <div style="font-size:10px;color:var(--text-secondary)">${f.approvedBy||''} · ${f.approvalDate||''}</div>
      </div>`).join('')}
    </div>` : `<div style="font-size:11px;color:var(--text-secondary);margin-top:6px">Chưa có baseline. <button onclick="openAddFinance('${pid}')" style="font-size:11px;color:#3D5CF5;background:none;border:none;cursor:pointer">+ Add baseline</button></div>`;

  el.innerHTML = `
    <div style="background:#1A2F5A;color:#fff;border-radius:12px;padding:16px 20px;margin-bottom:12px">
      <div style="font-size:10px;color:#A0AEC0;font-weight:600;text-transform:uppercase;letter-spacing:.06em">Current BIM Stage · ${proj.name}</div>
      <div style="font-size:18px;font-weight:600;margin:4px 0">${curStage.code} — ${curStage.name}</div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <span style="background:${gst.bg};color:${gst.color};padding:2px 10px;border-radius:10px;font-size:11px;font-weight:600">${gst.label}</span>
        <span style="font-size:11px;color:#A0AEC0">Next → ${BIM_STAGES[curIdx+1]?.name||'Final stage'}</span>
        <button onclick="openEditProject('${pid}')" style="margin-left:auto;font-size:10px;padding:3px 10px;background:rgba(255,255,255,.15);color:#fff;border:none;border-radius:6px;cursor:pointer">⚙️ Edit project</button>
      </div>
    </div>

    <div style="display:flex;gap:4px;position:relative;margin-bottom:16px;padding:0 4px">${pipeline}</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div style="background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:14px 16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div style="font-size:12px;font-weight:600">Gate Evidence — ${curStage.code}</div>
          <div style="font-size:16px;font-weight:700;color:${rC}">${rd}%</div>
        </div>
        <div style="background:#F0F0F0;border-radius:4px;height:5px;overflow:hidden;margin-bottom:8px"><div style="width:${rd}%;height:100%;background:${rC}"></div></div>
        ${evHtml}
      </div>

      <div style="display:flex;flex-direction:column;gap:10px">
        <div style="background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:14px 16px;flex:1">
          <div style="font-size:12px;font-weight:600;margin-bottom:8px">Gate Decision</div>
          ${curGate?.decision
            ? `<div style="padding:8px;background:${GATE_STATUS[curGate.decision]?.bg};color:${GATE_STATUS[curGate.decision]?.color};border-radius:8px;font-size:13px;font-weight:700;text-align:center;margin-bottom:6px">${GATE_STATUS[curGate.decision]?.label}</div>
               <div style="font-size:10px;color:var(--text-secondary)">${curGate.decisionBy||'PMO'} · ${curGate.decisionDate||''}</div>`
            : rd>=70
              ? `<div style="font-size:11px;color:#0D6E4A;margin-bottom:8px">🟢 Evidence sufficient — CĐT can decide</div>
                 <div style="display:flex;gap:6px">
                   <button onclick="recordGate('${pid}','go')" style="flex:1;padding:7px;background:#E0F8EE;color:#0D6E4A;border:1px solid #0D6E4A;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer">✅ GO</button>
                   <button onclick="recordGate('${pid}','revise')" style="flex:1;padding:7px;background:#EEF2FF;color:#3D5CF5;border:1px solid #3D5CF5;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer">🔄 Revise</button>
                   <button onclick="recordGate('${pid}','no-go')" style="flex:1;padding:7px;background:#FCEBEB;color:#C0392B;border:1px solid #C0392B;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer">❌ No-Go</button>
                 </div>`
              : `<div style="font-size:11px;color:#B86B00">🟡 ${evidence.length-doneEv.length} evidence item(s) missing before CĐT decision</div>`
          }
        </div>
        <div style="background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:14px 16px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <div style="font-size:12px;font-weight:600">CAPEX Baseline</div>
            <button onclick="openAddFinance('${pid}')" style="font-size:10px;padding:2px 8px;background:var(--bg-accent);color:var(--text-accent);border:0.5px solid var(--border-accent);border-radius:var(--radius);cursor:pointer">+ Baseline</button>
          </div>
          ${finHtml}
        </div>
      </div>
    </div>

    <div style="background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:12px 16px;margin-bottom:12px">
      <div style="font-size:12px;font-weight:600;margin-bottom:4px">Advance BIM Stage</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${BIM_STAGES.map(st=>`<button onclick="setStage('${pid}','${st.id}')" style="font-size:11px;padding:5px 12px;background:${proj.bimStage===st.id?st.color:'var(--surface-1)'};color:${proj.bimStage===st.id?st.tc:'var(--text-secondary)'};border:0.5px solid ${proj.bimStage===st.id?st.tc:'var(--border)'};border-radius:20px;cursor:pointer;font-weight:${proj.bimStage===st.id?600:400}">${st.code} ${st.short}</button>`).join('')}
      </div>
    </div>`;
}

function toggleEvidence(projectId, idx) {
  const gate = S.gates.find(g=>g.projectId===projectId&&g.stage===S.projects.find(p=>p.id===projectId)?.bimStage);
  if(!gate) { toast('No gate record — create gate first',true); return; }
  const done = gate.evidence ? gate.evidence.split(',').filter(Boolean) : [];
  const i = done.indexOf(String(idx));
  if(i>=0) done.splice(i,1); else done.push(String(idx));
  gate.evidence  = done.join(',');
  const ev       = GATE_EVIDENCE[getBimStage(gate.stage).code]||[];
  gate.readiness = ev.length ? Math.round(done.length/ev.length*100) : 0;
  gate.updatedAt = ts();
  apiWrite('save_gate', gate);
  renderBim();
}

function recordGate(projectId, decision) {
  const proj  = S.projects.find(p=>p.id===projectId); if(!proj) return;
  let gate    = S.gates.find(g=>g.projectId===projectId&&g.stage===proj.bimStage);
  if(!gate){
    gate={id:nextId('G'),projectId,stage:proj.bimStage,gateCode:getBimStage(proj.bimStage).code,status:'in-progress',readiness:0,evidence:''};
    S.gates.push(gate);
  }
  gate.decision     = decision;
  gate.decisionDate = today();
  gate.decisionBy   = 'PMO';
  gate.status       = decision;
  gate.updatedAt    = ts();
  apiWrite('save_gate', gate);
  if(decision==='go') {
    // Auto-advance to next stage
    const idx = BIM_STAGES.findIndex(s=>s.id===proj.bimStage);
    if(idx<BIM_STAGES.length-1) setStage(projectId, BIM_STAGES[idx+1].id, true);
  }
  renderBim(); renderOverview();
  toast(decision==='go'?'✅ GO recorded — stage advanced!':decision==='revise'?'🔄 Revise recorded':'❌ No-Go recorded');
}

function setStage(projectId, stageId, silent=false) {
  const proj = S.projects.find(p=>p.id===projectId); if(!proj) return;
  proj.bimStage    = stageId;
  proj.gateStatus  = 'in-progress';
  proj.updatedAt   = ts();
  // Ensure gate record exists
  if(!S.gates.find(g=>g.projectId===projectId&&g.stage===stageId)){
    const g={id:nextId('G'),projectId,stage:stageId,gateCode:getBimStage(stageId).code,status:'in-progress',readiness:0,evidence:'',updatedAt:ts()};
    S.gates.push(g);
    apiWrite('save_gate',g);
  }
  apiWrite('save_project', proj);
  if(!silent){renderBim();toast('Stage updated: '+getBimStage(stageId).name);}
}

// ── ACTION REGISTER (Action/Risk/Issue/Assumption/RFI) ────────
function renderActions() {
  const pid = S.activeProjectId;
  const allActs = pid ? (S._allActions[pid]||[]) : S.openActions;
  const el = $('action-list'); if(!el) return;
  const filter = $('action-type-filter')?.value||'all';
  const statusF= $('action-status-filter')?.value||'open';
  let list = [...allActs];
  if(filter!=='all') list=list.filter(a=>a.type===filter);
  if(statusF==='open') list=list.filter(a=>a.status!=='closed'&&a.status!=='done');
  else if(statusF==='closed') list=list.filter(a=>a.status==='closed'||a.status==='done');
  list=list.sort((a,b)=>({high:0,med:1,low:2}[a.priority]||1)-({high:0,med:1,low:2}[b.priority]||1));
  if(!list.length){el.innerHTML='<div class="empty">No actions found.</div>';return;}
  el.innerHTML=list.map(a=>{
    const pr=PRIORITY_CFG[a.priority]||PRIORITY_CFG.med;
    const proj=S.projects.find(p=>p.id===a.projectId);
    const typeLbl=ACTION_TYPES[a.type]||a.type;
    const isOverdue=a.dueDate&&a.dueDate<today()&&a.status!=='closed'&&a.status!=='done';
    return `<div style="padding:10px 14px;border-bottom:0.5px solid var(--border);display:flex;gap:10px;align-items:flex-start">
      <div style="flex-shrink:0;min-width:60px;text-align:center">
        <div style="font-size:9px;background:#F0F0F0;color:#444;padding:2px 5px;border-radius:4px;margin-bottom:3px">${typeLbl}</div>
        <div style="font-size:9px;background:${pr.bg};color:${pr.color};padding:1px 5px;border-radius:4px">${pr.label}</div>
      </div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:600">${a.title}</div>
        ${a.description?`<div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${a.description}</div>`:''}
        <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;font-size:10px;color:var(--text-secondary)">
          ${proj&&!pid?`<span style="color:#3D5CF5">${proj.name}</span>`:''}
          ${a.responsible?`<span>R: ${a.responsible}</span>`:''}
          ${a.accountable?`<span>A: <b>${a.accountable}</b></span>`:''}
          ${a.dueDate?`<span style="color:${isOverdue?'#C0392B':'inherit'};font-weight:${isOverdue?600:400}">Due: ${a.dueDate}${isOverdue?' ⚠️':''}</span>`:''}
          ${a.link?`<a href="${a.link}" target="_blank" style="color:#3D5CF5">📎 Evidence</a>`:''}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;flex-shrink:0">
        <button onclick="openEditAction('${a.id}')" style="font-size:10px;padding:2px 7px;background:var(--surface-1);border:0.5px solid var(--border);border-radius:4px;cursor:pointer">✏️</button>
        ${a.status!=='closed'?`<button onclick="closeAction('${a.id}')" style="font-size:10px;padding:2px 7px;background:#E0F8EE;color:#0D6E4A;border:1px solid #0D6E4A;border-radius:4px;cursor:pointer">✓</button>`:''}
      </div>
    </div>`;
  }).join('');
}

function closeAction(id) {
  const a=findAction(id); if(!a) return;
  a.status='closed'; a.updatedAt=ts();
  apiWrite('save_action',a); renderActions(); toast('Action closed ✓');
}

function findAction(id) {
  for(const pid in S._allActions){const a=S._allActions[pid].find(x=>x.id===id);if(a)return a;}
  return S.openActions.find(x=>x.id===id);
}

// ── CHANGE REGISTER ───────────────────────────────────────────
function renderChanges() {
  const pid   = S.activeProjectId;
  const list  = pid ? (S._changes[pid]||[]) : [];
  const el    = $('change-list'); if(!el) return;
  if(!list.length){el.innerHTML='<div class="empty">No changes for this project.</div>';return;}
  el.innerHTML=list.map(c=>{
    const stC=c.status==='approved'?'#0D6E4A':c.status==='rejected'?'#C0392B':c.status==='pending'?'#B86B00':'#888';
    const stBg=c.status==='approved'?'#E0F8EE':c.status==='rejected'?'#FCEBEB':c.status==='pending'?'#FFF3DC':'#F5F5F2';
    const hasImpact=c.deltaCapex||c.deltaTime||c.deltaCapacity||c.deltaBiz;
    return `<div style="padding:10px 14px;border-bottom:0.5px solid var(--border)">
      <div style="display:flex;gap:8px;align-items:flex-start">
        <div style="flex:1">
          <div style="display:flex;gap:6px;align-items:center;margin-bottom:3px">
            <span style="font-size:10px;font-weight:700;color:#3D5CF5">${c.id}</span>
            <span style="font-size:10px;background:#F0F0F0;padding:1px 6px;border-radius:4px">${c.bimStage?getBimStage(c.bimStage).short:'—'}</span>
            <span style="font-size:10px;background:#EEF2FF;color:#3D5CF5;padding:1px 6px;border-radius:4px">${c.authorityLevel||'L1'}</span>
          </div>
          <div style="font-size:12px;font-weight:600">${c.title}</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${c.content||''}</div>
          ${hasImpact?`<div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;font-size:10px">
            ${c.deltaCapex?`<span style="color:#C0392B">ΔCost: ${c.deltaCapex}</span>`:''}
            ${c.deltaTime?`<span style="color:#B86B00">ΔTime: ${c.deltaTime}d</span>`:''}
            ${c.deltaCapacity?`<span>ΔCapacity: ${c.deltaCapacity}</span>`:''}
            ${c.deltaBiz?`<span>ΔBiz: ${c.deltaBiz}</span>`:''}
          </div>`:''}
          <div style="font-size:10px;color:var(--text-secondary);margin-top:3px">R: ${c.responsible||'—'} · A: ${c.accountable||'—'} · Baseline: ${c.baseline||'—'}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <span style="background:${stBg};color:${stC};padding:2px 9px;border-radius:10px;font-size:10px;font-weight:600">${(c.status||'pending').toUpperCase()}</span>
          <div style="display:flex;gap:3px;margin-top:6px;justify-content:flex-end">
            <button onclick="openEditChange('${c.id}')" style="font-size:10px;padding:2px 7px;background:var(--surface-1);border:0.5px solid var(--border);border-radius:4px;cursor:pointer">✏️</button>
            ${c.status==='pending'?`<button onclick="approveChange('${c.id}','approved')" style="font-size:10px;padding:2px 7px;background:#E0F8EE;color:#0D6E4A;border:1px solid #0D6E4A;border-radius:4px;cursor:pointer">✓ Approve</button>`:''}
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function approveChange(id, status) {
  const pid=S.activeProjectId; if(!pid) return;
  const c=(S._changes[pid]||[]).find(x=>x.id===id); if(!c) return;
  c.status=status; c.decisionDate=today(); c.updatedAt=ts();
  apiWrite('save_change',c); renderChanges(); toast('Change '+status+' ✓');
}

// ── DECISION REGISTER ─────────────────────────────────────────
function renderDecisions() {
  const pid  = S.activeProjectId;
  const list = pid ? (S._allDecisions[pid]||[]) : S.pendingDecisions;
  const el   = $('decision-list'); if(!el) return;
  if(!list.length){el.innerHTML='<div class="empty">No decisions logged.</div>';return;}
  el.innerHTML=list.map(d=>{
    const isDone=d.status==='approved'||d.status==='rejected';
    return `<div style="padding:10px 14px;border-bottom:0.5px solid var(--border)">
      <div style="display:flex;gap:8px;align-items:flex-start">
        <div style="flex:1">
          <div style="display:flex;gap:6px;align-items:center;margin-bottom:3px">
            <span style="font-size:10px;font-weight:700;color:#3D5CF5">${d.id}</span>
            <span style="font-size:9px;background:${d.authorityLevel==='L3'?'#FCEBEB':d.authorityLevel==='L2'?'#FFF3DC':'#E0F8EE'};color:${d.authorityLevel==='L3'?'#C0392B':d.authorityLevel==='L2'?'#B86B00':'#0D6E4A'};padding:1px 7px;border-radius:8px;font-weight:700">${d.authorityLevel||'L2'}</span>
            ${d.bimStage?`<span style="font-size:9px;background:#F0F0F0;padding:1px 6px;border-radius:4px">${getBimStage(d.bimStage).short}</span>`:''}
          </div>
          <div style="font-size:12px;font-weight:600">${d.subject}</div>
          ${d.recommendation?`<div style="font-size:11px;color:#3D5CF5;margin-top:2px">PM Rec: ${d.recommendation}</div>`:''}
          <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;font-size:10px;color:var(--text-secondary)">
            <span>A: ${d.accountable||'CĐT'}</span>
            ${d.dueDate?`<span style="color:${d.dueDate<today()&&!isDone?'#C0392B':'inherit'}">Due: ${d.dueDate}</span>`:''}
            ${d.deltaCapex?`<span style="color:#C0392B">ΔCost: ${d.deltaCapex}</span>`:''}
            ${d.deltaBiz?`<span>ΔBiz: ${d.deltaBiz}</span>`:''}
          </div>
          ${d.evidence?`<a href="${d.evidence}" target="_blank" style="font-size:10px;color:#3D5CF5">📎 Evidence</a>`:''}
        </div>
        <div style="flex-shrink:0;text-align:right">
          <span style="background:${isDone?'#E0F8EE':'#FFF3DC'};color:${isDone?'#0D6E4A':'#B86B00'};padding:2px 9px;border-radius:10px;font-size:10px;font-weight:600">${isDone?d.decision?.toUpperCase():'PENDING'}</span>
          <div style="display:flex;gap:3px;margin-top:6px;justify-content:flex-end">
            <button onclick="openEditDecision('${d.id}')" style="font-size:10px;padding:2px 7px;background:var(--surface-1);border:0.5px solid var(--border);border-radius:4px;cursor:pointer">✏️</button>
            ${!isDone?`
              <button onclick="resolveDecision('${d.id}','approved')" style="font-size:10px;padding:2px 7px;background:#E0F8EE;color:#0D6E4A;border:1px solid #0D6E4A;border-radius:4px;cursor:pointer">✓ GO</button>
              <button onclick="resolveDecision('${d.id}','rejected')" style="font-size:10px;padding:2px 7px;background:#FCEBEB;color:#C0392B;border:1px solid #C0392B;border-radius:4px;cursor:pointer">✗</button>`:''}
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function resolveDecision(id, decision) {
  const pid=S.activeProjectId;
  const list=S._allDecisions[pid]||S.pendingDecisions;
  const d=list.find(x=>x.id===id); if(!d) return;
  d.decision=decision; d.decisionDate=today(); d.status=decision; d.updatedAt=ts();
  // Remove from pending
  S.pendingDecisions=S.pendingDecisions.filter(x=>x.id!==id);
  apiWrite('save_decision',d); renderDecisions(); renderOverview();
  toast('Decision '+decision+' ✓');
}

// ── FINANCE ───────────────────────────────────────────────────
function renderFinance() {
  const pid  = S.activeProjectId;
  const fins = pid ? (S._finance[pid]||[]) : [];
  const el   = $('finance-list'); if(!el) return;
  if(!fins.length){el.innerHTML=`<div class="empty">No finance records. <button onclick="openAddFinance('${pid||''}')" style="color:#3D5CF5;background:none;border:none;cursor:pointer">+ Add baseline</button></div>`;return;}
  // Sort by type order
  const order=['concept','fs','design','contract','actual'];
  fins.sort((a,b)=>order.indexOf(a.type)-order.indexOf(b.type));
  const cur=fins.find(f=>f.isCurrent==='TRUE'||f.isCurrent===true);
  el.innerHTML=`
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:#1A2F5A">
          ${['Type','Label','Amount (tr.đ)','Actual (tr.đ)','Δ%','Approved by','Date','Status',''].map(h=>`<th style="padding:7px 12px;text-align:left;color:#fff;font-size:11px">${h}</th>`).join('')}
        </tr></thead>
        <tbody>${fins.map(f=>{
          const delta=f.actual&&f.amount?((+f.actual-+f.amount)/+f.amount*100).toFixed(1)+'%':'—';
          const deltaC=+delta?.replace('%','')>5?'#C0392B':'#888';
          return `<tr style="border-bottom:0.5px solid var(--border);background:${f.isCurrent==='TRUE'||f.isCurrent?'#EEF2FF':'inherit'}">
            <td style="padding:7px 12px;font-weight:600">${FINANCE_TYPES[f.type]||f.type}</td>
            <td style="padding:7px 12px;color:var(--text-secondary)">${f.label||'—'}</td>
            <td style="padding:7px 12px;font-weight:700;color:#1A2F5A">${Number(f.amount||0).toLocaleString('vi-VN')}</td>
            <td style="padding:7px 12px">${f.actual?Number(f.actual).toLocaleString('vi-VN'):'—'}</td>
            <td style="padding:7px 12px;color:${deltaC};font-weight:600">${delta}</td>
            <td style="padding:7px 12px;font-size:11px;color:var(--text-secondary)">${f.approvedBy||'—'}</td>
            <td style="padding:7px 12px;font-size:11px;color:var(--text-secondary)">${f.approvalDate||'—'}</td>
            <td style="padding:7px 12px"><span style="background:${f.isCurrent==='TRUE'||f.isCurrent?'#E0F8EE':'#F5F5F2'};color:${f.isCurrent==='TRUE'||f.isCurrent?'#0D6E4A':'#888'};padding:1px 7px;border-radius:10px;font-size:9px;font-weight:600">${f.isCurrent==='TRUE'||f.isCurrent?'Current':'History'}</span></td>
            <td style="padding:7px 12px"><button onclick="openEditFinance('${f.id}')" style="font-size:10px;padding:2px 6px;background:var(--surface-1);border:0.5px solid var(--border);border-radius:4px;cursor:pointer">✏️</button></td>
          </tr>`;
        }).join('')}</tbody>
      </table>
    </div>
    <div style="margin-top:10px;padding:10px 0;border-top:0.5px solid var(--border)">
      <button onclick="openAddFinance('${pid}')" style="font-size:11px;padding:5px 14px;background:var(--bg-accent);color:var(--text-accent);border:0.5px solid var(--border-accent);border-radius:var(--radius);cursor:pointer">+ Add baseline version</button>
    </div>`;
}

// ── MODAL HELPERS ─────────────────────────────────────────────
function clearForm(ids) { ids.forEach(id=>{const el=$(id);if(el){if(el.type==='checkbox')el.checked=false;else el.value='';}});}

function populateSiteOpts(selId, currentId) {
  const el=$(selId); if(!el) return;
  el.innerHTML=S.projects.map(p=>`<option value="${p.id}" ${p.id===currentId?'selected':''}>${p.name}</option>`).join('');
}

// Project modal
function openAddProject() {
  clearForm(['proj-name','proj-type','proj-country','proj-lead','proj-note','proj-start','proj-target']);
  $('proj-status')&&($('proj-status').value='active');
  $('proj-bimstage')&&($('proj-bimstage').value='01-concept');
  $('modal-proj-title')&&($('modal-proj-title').textContent='New Project');
  $('proj-del-btn')&&($('proj-del-btn').style.display='none');
  $('proj-id-hidden')&&($('proj-id-hidden').value='');
  openModal('modal-project');
}

function openEditProject(id) {
  const p=S.projects.find(x=>x.id===id); if(!p) return;
  $('proj-id-hidden')&&($('proj-id-hidden').value=p.id);
  $('proj-name')&&($('proj-name').value=p.name||'');
  $('proj-type')&&($('proj-type').value=p.type||'');
  $('proj-country')&&($('proj-country').value=p.country||'');
  $('proj-lead')&&($('proj-lead').value=p.lead||'');
  $('proj-status')&&($('proj-status').value=p.status||'active');
  $('proj-bimstage')&&($('proj-bimstage').value=p.bimStage||'01-concept');
  $('proj-start')&&($('proj-start').value=p.startDate||'');
  $('proj-target')&&($('proj-target').value=p.targetDate||'');
  $('proj-note')&&($('proj-note').value=p.note||'');
  $('modal-proj-title')&&($('modal-proj-title').textContent='Edit: '+p.name);
  $('proj-del-btn')&&($('proj-del-btn').style.display='inline-block');
  openModal('modal-project');
}

function saveProject() {
  const name=$('proj-name')?.value?.trim(); if(!name){toast('Enter project name',true);return;}
  const existId=$('proj-id-hidden')?.value;
  const id=existId||nextId('P');
  const entry={
    id,name,type:$('proj-type')?.value||'',country:$('proj-country')?.value||'Vietnam',
    lead:$('proj-lead')?.value||'PMO',status:$('proj-status')?.value||'active',
    bimStage:$('proj-bimstage')?.value||'01-concept',gateStatus:'in-progress',
    startDate:$('proj-start')?.value||'',targetDate:$('proj-target')?.value||'',
    note:$('proj-note')?.value||'',updatedAt:ts(),
  };
  const idx=S.projects.findIndex(p=>p.id===id);
  if(idx>=0) S.projects[idx]=entry; else { S.projects.push(entry); S.activeProjectId=id; }
  // Ensure initial gate
  if(!S.gates.find(g=>g.projectId===id&&g.stage===entry.bimStage)){
    const g={id:nextId('G'),projectId:id,stage:entry.bimStage,gateCode:getBimStage(entry.bimStage).code,status:'in-progress',readiness:0,evidence:'',updatedAt:ts()};
    S.gates.push(g);
    apiWrite('save_gate',g);
  }
  closeModal('modal-project');
  apiWrite('save_project',entry);
  populateProjectSelector(); renderAll();
  toast((existId?'Updated':'Created')+': '+name);
}

function deleteProjectFromModal() {
  const id=$('proj-id-hidden')?.value; if(!id||!confirm('Archive this project?')) return;
  const p=S.projects.find(x=>x.id===id); if(!p) return;
  p.status='archived'; p.updatedAt=ts();
  apiWrite('save_project',p);
  S.projects=S.projects.filter(x=>x.id!==id);
  if(S.activeProjectId===id) S.activeProjectId=S.projects[0]?.id||null;
  closeModal('modal-project'); populateProjectSelector(); renderAll();
  toast('Project archived');
}

// Action modal
function openAddAction(projectId) {
  clearForm(['act-title','act-desc','act-responsible','act-accountable','act-due','act-impact','act-link','act-note']);
  $('act-type')&&($('act-type').value='action');
  $('act-priority')&&($('act-priority').value='med');
  $('act-status')&&($('act-status').value='open');
  $('act-bimstage')&&($('act-bimstage').value=S.projects.find(p=>p.id===projectId)?.bimStage||'01-concept');
  populateSiteOpts('act-project', projectId||S.activeProjectId);
  $('act-id-hidden')&&($('act-id-hidden').value='');
  $('act-del-btn')&&($('act-del-btn').style.display='none');
  $('modal-act-title')&&($('modal-act-title').textContent='New Action');
  openModal('modal-action');
}

function openEditAction(id) {
  const a=findAction(id); if(!a) return;
  $('act-id-hidden')&&($('act-id-hidden').value=a.id);
  ['title','desc','responsible','accountable','due','impact','link','note'].forEach(f=>{const el=$('act-'+f);if(el)el.value=a[f==='desc'?'description':f]||'';});
  $('act-type')&&($('act-type').value=a.type||'action');
  $('act-priority')&&($('act-priority').value=a.priority||'med');
  $('act-status')&&($('act-status').value=a.status||'open');
  $('act-bimstage')&&($('act-bimstage').value=a.bimStage||'01-concept');
  populateSiteOpts('act-project',a.projectId);
  $('act-del-btn')&&($('act-del-btn').style.display='inline-block');
  $('modal-act-title')&&($('modal-act-title').textContent='Edit Action');
  openModal('modal-action');
}

function saveAction() {
  const title=$('act-title')?.value?.trim(); if(!title){toast('Enter title',true);return;}
  const existId=$('act-id-hidden')?.value;
  const pid=$('act-project')?.value||S.activeProjectId;
  const id=existId||nextId('A');
  const entry={
    id,projectId:pid,type:$('act-type')?.value||'action',title,
    description:$('act-desc')?.value||'',priority:$('act-priority')?.value||'med',
    status:$('act-status')?.value||'open',responsible:$('act-responsible')?.value||'',
    accountable:$('act-accountable')?.value||'PMO',dueDate:$('act-due')?.value||'',
    impact:$('act-impact')?.value||'',link:$('act-link')?.value||'',
    bimStage:$('act-bimstage')?.value||'',updatedAt:ts(),
  };
  if(!S._allActions[pid]) S._allActions[pid]=[];
  const idx=S._allActions[pid].findIndex(x=>x.id===id);
  if(idx>=0) S._allActions[pid][idx]=entry; else S._allActions[pid].push(entry);
  // Sync to openActions for overview
  S.openActions=S.openActions.filter(x=>x.id!==id);
  if(entry.status!=='closed'&&entry.status!=='done') S.openActions.push(entry);
  closeModal('modal-action');
  apiWrite('save_action',entry);
  renderActions(); renderOverview();
  toast((existId?'Updated':'Added')+': '+entry.id);
}

function deleteActionFromModal() {
  const id=$('act-id-hidden')?.value; if(!id||!confirm('Delete this action?')) return;
  for(const pid in S._allActions) S._allActions[pid]=S._allActions[pid].filter(x=>x.id!==id);
  S.openActions=S.openActions.filter(x=>x.id!==id);
  apiWrite('delete_row',{table:'ACTION',id});
  closeModal('modal-action'); renderActions(); renderOverview();
}

// Change modal
function openAddChange() {
  clearForm(['chg-title','chg-content','chg-responsible','chg-accountable','chg-dcapex','chg-dtime','chg-dcap','chg-dbiz','chg-baseline','chg-note']);
  $('chg-authority')&&($('chg-authority').value='L1');
  $('chg-status')&&($('chg-status').value='pending');
  $('chg-bimstage')&&($('chg-bimstage').value=S.projects.find(p=>p.id===S.activeProjectId)?.bimStage||'01-concept');
  populateSiteOpts('chg-project',S.activeProjectId);
  $('chg-id-hidden')&&($('chg-id-hidden').value='');
  $('chg-del-btn')&&($('chg-del-btn').style.display='none');
  openModal('modal-change');
}

function openEditChange(id) {
  const pid=S.activeProjectId;
  const c=(S._changes[pid]||[]).find(x=>x.id===id); if(!c) return;
  $('chg-id-hidden')&&($('chg-id-hidden').value=c.id);
  ['title','content','responsible','accountable','baseline','note'].forEach(f=>{const el=$('chg-'+f);if(el)el.value=c[f]||'';});
  ['dcapex','dtime','dcap','dbiz'].forEach(f=>{const map={dcapex:'deltaCapex',dtime:'deltaTime',dcap:'deltaCapacity',dbiz:'deltaBiz'};const el=$('chg-'+f);if(el)el.value=c[map[f]]||'';});
  $('chg-authority')&&($('chg-authority').value=c.authorityLevel||'L1');
  $('chg-status')&&($('chg-status').value=c.status||'pending');
  $('chg-bimstage')&&($('chg-bimstage').value=c.bimStage||'01-concept');
  populateSiteOpts('chg-project',c.projectId);
  $('chg-del-btn')&&($('chg-del-btn').style.display='inline-block');
  openModal('modal-change');
}

function saveChange() {
  const title=$('chg-title')?.value?.trim(); if(!title){toast('Enter title',true);return;}
  const existId=$('chg-id-hidden')?.value;
  const pid=$('chg-project')?.value||S.activeProjectId;
  const id=existId||nextId('C');
  const entry={
    id,projectId:pid,title,bimStage:$('chg-bimstage')?.value||'',
    authorityLevel:$('chg-authority')?.value||'L1',
    responsible:$('chg-responsible')?.value||'',accountable:$('chg-accountable')?.value||'PMO',
    content:$('chg-content')?.value||'',deltaCapex:$('chg-dcapex')?.value||'',
    deltaTime:$('chg-dtime')?.value||'',deltaCapacity:$('chg-dcap')?.value||'',
    deltaBiz:$('chg-dbiz')?.value||'',baseline:$('chg-baseline')?.value||'',
    status:$('chg-status')?.value||'pending',note:$('chg-note')?.value||'',updatedAt:ts(),
  };
  if(!S._changes[pid]) S._changes[pid]=[];
  const idx=S._changes[pid].findIndex(x=>x.id===id);
  if(idx>=0) S._changes[pid][idx]=entry; else S._changes[pid].push(entry);
  closeModal('modal-change');
  apiWrite('save_change',entry);
  renderChanges();
  toast((existId?'Updated':'Logged')+': '+entry.id);
}

function deleteChangeFromModal() {
  const id=$('chg-id-hidden')?.value; if(!id||!confirm('Delete change?')) return;
  const pid=S.activeProjectId;
  if(S._changes[pid]) S._changes[pid]=S._changes[pid].filter(x=>x.id!==id);
  apiWrite('delete_row',{table:'CHANGE',id});
  closeModal('modal-change'); renderChanges();
}

// Decision modal
function openAddDecision() {
  clearForm(['dec-subject','dec-options','dec-recommendation','dec-dcapex','dec-dtime','dec-dbiz','dec-accountable','dec-evidence','dec-note','dec-due']);
  $('dec-authority')&&($('dec-authority').value='L2');
  $('dec-status')&&($('dec-status').value='pending');
  $('dec-bimstage')&&($('dec-bimstage').value=S.projects.find(p=>p.id===S.activeProjectId)?.bimStage||'01-concept');
  populateSiteOpts('dec-project',S.activeProjectId);
  $('dec-id-hidden')&&($('dec-id-hidden').value='');
  $('dec-del-btn')&&($('dec-del-btn').style.display='none');
  openModal('modal-decision');
}

function openEditDecision(id) {
  const pid=S.activeProjectId;
  const list=S._allDecisions[pid]||S.pendingDecisions;
  const d=list.find(x=>x.id===id); if(!d) return;
  $('dec-id-hidden')&&($('dec-id-hidden').value=d.id);
  ['subject','options','recommendation','accountable','evidence','note','due'].forEach(f=>{const key=f==='due'?'dueDate':f;const el=$('dec-'+f);if(el)el.value=d[key]||'';});
  ['dcapex','dtime','dbiz'].forEach(f=>{const map={dcapex:'deltaCapex',dtime:'deltaTime',dbiz:'deltaBiz'};const el=$('dec-'+f);if(el)el.value=d[map[f]]||'';});
  $('dec-authority')&&($('dec-authority').value=d.authorityLevel||'L2');
  $('dec-status')&&($('dec-status').value=d.status||'pending');
  $('dec-bimstage')&&($('dec-bimstage').value=d.bimStage||'01-concept');
  populateSiteOpts('dec-project',d.projectId);
  $('dec-del-btn')&&($('dec-del-btn').style.display='inline-block');
  openModal('modal-decision');
}

function saveDecision() {
  const subject=$('dec-subject')?.value?.trim(); if(!subject){toast('Enter subject',true);return;}
  const existId=$('dec-id-hidden')?.value;
  const pid=$('dec-project')?.value||S.activeProjectId;
  const id=existId||nextId('D');
  const entry={
    id,projectId:pid,subject,bimStage:$('dec-bimstage')?.value||'',
    authorityLevel:$('dec-authority')?.value||'L2',options:$('dec-options')?.value||'',
    recommendation:$('dec-recommendation')?.value||'',deltaCapex:$('dec-dcapex')?.value||'',
    deltaTime:$('dec-dtime')?.value||'',deltaBiz:$('dec-dbiz')?.value||'',
    accountable:$('dec-accountable')?.value||'CĐT',evidence:$('dec-evidence')?.value||'',
    note:$('dec-note')?.value||'',dueDate:$('dec-due')?.value||'',
    status:$('dec-status')?.value||'pending',decision:'',decisionDate:'',updatedAt:ts(),
  };
  if(!S._allDecisions[pid]) S._allDecisions[pid]=[];
  const idx=S._allDecisions[pid].findIndex(x=>x.id===id);
  if(idx>=0) S._allDecisions[pid][idx]=entry; else S._allDecisions[pid].push(entry);
  S.pendingDecisions=S.pendingDecisions.filter(x=>x.id!==id);
  if(entry.status==='pending') S.pendingDecisions.push(entry);
  closeModal('modal-decision');
  apiWrite('save_decision',entry);
  renderDecisions(); renderOverview();
  toast((existId?'Updated':'Logged')+': '+entry.id);
}

function deleteDecisionFromModal() {
  const id=$('dec-id-hidden')?.value; if(!id||!confirm('Delete?')) return;
  const pid=S.activeProjectId;
  if(S._allDecisions[pid]) S._allDecisions[pid]=S._allDecisions[pid].filter(x=>x.id!==id);
  S.pendingDecisions=S.pendingDecisions.filter(x=>x.id!==id);
  apiWrite('delete_row',{table:'DECISION',id});
  closeModal('modal-decision'); renderDecisions(); renderOverview();
}

// Finance modal
function openAddFinance(projectId) {
  clearForm(['fin-label','fin-amount','fin-actual','fin-approved-by','fin-approval-date','fin-note']);
  $('fin-type')&&($('fin-type').value='concept');
  $('fin-current')&&($('fin-current').checked=true);
  $('fin-id-hidden')&&($('fin-id-hidden').value='');
  $('fin-project-id')&&($('fin-project-id').value=projectId||S.activeProjectId||'');
  $('fin-del-btn')&&($('fin-del-btn').style.display='none');
  openModal('modal-finance');
}

function openEditFinance(id) {
  const pid=S.activeProjectId;
  const f=(S._finance[pid]||[]).find(x=>x.id===id); if(!f) return;
  $('fin-id-hidden')&&($('fin-id-hidden').value=f.id);
  $('fin-project-id')&&($('fin-project-id').value=f.projectId||pid);
  $('fin-type')&&($('fin-type').value=f.type||'concept');
  $('fin-label')&&($('fin-label').value=f.label||'');
  $('fin-amount')&&($('fin-amount').value=f.amount||'');
  $('fin-actual')&&($('fin-actual').value=f.actual||'');
  $('fin-approved-by')&&($('fin-approved-by').value=f.approvedBy||'');
  $('fin-approval-date')&&($('fin-approval-date').value=f.approvalDate||'');
  $('fin-current')&&($('fin-current').checked=f.isCurrent==='TRUE'||f.isCurrent===true);
  $('fin-note')&&($('fin-note').value=f.note||'');
  $('fin-del-btn')&&($('fin-del-btn').style.display='inline-block');
  openModal('modal-finance');
}

function saveFinance() {
  const amount=$('fin-amount')?.value; if(!amount){toast('Enter amount',true);return;}
  const pid=$('fin-project-id')?.value||S.activeProjectId;
  const existId=$('fin-id-hidden')?.value;
  const isCur=$('fin-current')?.checked;
  // Mark others as not current if this is current
  if(isCur&&S._finance[pid]) S._finance[pid].forEach(f=>{if(f.id!==existId)f.isCurrent=false;});
  const id=existId||nextId('F');
  const entry={
    id,projectId:pid,type:$('fin-type')?.value||'concept',label:$('fin-label')?.value||'',
    amount:+amount,approvedBy:$('fin-approved-by')?.value||'',approvalDate:$('fin-approval-date')?.value||'',
    actual:+($('fin-actual')?.value||0),isCurrent:isCur,note:$('fin-note')?.value||'',updatedAt:ts(),
  };
  if(!S._finance[pid]) S._finance[pid]=[];
  const idx=S._finance[pid].findIndex(x=>x.id===id);
  if(idx>=0) S._finance[pid][idx]=entry; else S._finance[pid].push(entry);
  closeModal('modal-finance');
  apiWrite('save_finance',entry);
  delete S._loaded['snapshot']; // force snapshot refresh
  renderFinance(); renderBim();
  toast('Finance saved ✓');
}

function deleteFinanceFromModal() {
  const id=$('fin-id-hidden')?.value; if(!id||!confirm('Delete finance record?')) return;
  const pid=S.activeProjectId;
  if(S._finance[pid]) S._finance[pid]=S._finance[pid].filter(x=>x.id!==id);
  apiWrite('delete_row',{table:'FINANCE',id});
  closeModal('modal-finance'); renderFinance();
}

// ── KEYBOARD / OVERLAY ────────────────────────────────────────
document.addEventListener('keydown', e => { if(e.key==='Escape') document.querySelectorAll('.overlay.open').forEach(o=>o.classList.remove('open')); });
document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));
window.addEventListener('online',()=>{ if(_pendingSave) boot(); });

// ── INIT ──────────────────────────────────────────────────────
boot();
