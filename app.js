// ═══════════════════════════════════════════════════════════════
// OPS DASHBOARD · BIM × 8×5 × Tgq · v3.0
// Multi-site · Multi-language · International Team
// ═══════════════════════════════════════════════════════════════

// ── I18N ─────────────────────────────────────────────────────
const I18N = {
  vi: {
    'addSite':'Thêm dự án','export':'Xuất','t-overview':'🏠 Tổng quan',
    't-sites':'🏢 Site','t-intl':'🌏 Team QT','t-finance':'💰 Tài chính',
    't-okr':'🎯 OKR','t-change':'📝 Change','t-report':'📤 Báo cáo',
    'intl-title':'Team quốc tế','intl-members':'Thành viên team QT',
    'addMember':'Thêm thành viên','tz-title':'Đồng hồ múi giờ',
    'comm-title':'Giao tiếp & Lịch họp','meeting-name':'Tên buổi họp',
    'meeting-time':'Giờ (VN)','meeting-day':'Ngày','meeting-note':'Link / Ghi chú',
    'addMeeting':'Thêm lịch họp','barrier-title':'Rào cản giao tiếp',
    'checklist-title':'Checklist làm việc với team TQ','tips-title':'Tips giao tiếp đa văn hóa',
    'fin-input':'Tài chính theo site','select-site':'Chọn site',
    'budget':'Dự toán (tr.đ)','actual':'Thực tế (tr.đ)','overage':'Phát sinh (tr.đ)','revenue':'Doanh thu/tháng',
    'save-fin':'Lưu tài chính','fin-result':'Kết quả',
    'new-change':'Nhập Change mới','change-content':'Nội dung','accountable':'Người A','log-change':'Ghi nhận',
    'snapshot-title':'📋 Snapshot Site','alert-title':'Cảnh báo hệ thống',
    'fc-active':'Đang chạy','fc-upcoming':'Sắp tới','fc-done':'Hoàn thành',
    'total-projects':'Tổng dự án','sop-done':'SOP hoàn chỉnh','change-pending':'Change pending','intl-team':'Team QT',
    'health-score':'Health Score','no-sites':'Chưa có dự án nào.','add-first':'+ Thêm dự án đầu tiên',
    'progress':'Tiến độ','phase':'Giai đoạn','lead':'Phụ trách',
    'status-active':'Đang chạy','status-upcoming':'Sắp tới','status-done':'Hoàn thành','status-paused':'Tạm dừng',
    'edit':'Sửa','clone':'Nhân bản','delete':'Xóa','save':'💾 Lưu','cancel':'Hủy',
    'pending':'Pending','approved':'Approved','rejected':'Rejected','done-status':'Done',
    'no-members':'Chưa có thành viên quốc tế.','no-meetings':'Chưa có lịch họp.',
    'no-changes':'Chưa có change.','no-kr':'Chưa có KR nào.',
    'working':'🟢 Đang làm việc','off-hours':'🔴 Ngoài giờ',
    'topbar-sub':'{n} dự án · {a} đang chạy · {m} thành viên QT',
    'toast-saved':'Đã lưu ✓','toast-saving':'Đang lưu ☁️...',
    'toast-added':'Đã thêm','toast-updated':'Đã cập nhật','toast-deleted':'Đã xóa','toast-cloned':'Đã nhân bản ✓',
    'toast-fin-saved':'Đã lưu tài chính ✓','toast-member-added':'Đã thêm thành viên ✓',
    'toast-meeting-added':'Đã thêm lịch họp ✓','toast-kr-added':'Đã thêm KR ✓',
    'err-name':'Vui lòng nhập tên','err-site-content':'Chọn site và nhập nội dung','err-kr':'Vui lòng nhập KR',
    'confirm-delete':'Xóa "{name}"?','confirm-reset':'Reset tất cả Actual về 0?',
    't-ma':'🏭 M&A','ma-all':'Tất cả','ma-ve-sinh':'🧹 Vệ sinh CN','ma-su-kien':'🎪 Sự kiện','ma-other':'🏢 Khác',
    'ma-add':'+ Thêm công ty','ma-total':'Tổng công ty','ma-active':'Đang theo dõi',
    'ma-negotiating':'Đang đàm phán','ma-done':'Đã hoàn tất deal','ma-empty':'Chưa có công ty nào.',
    'ma-detail':'📋 Danh sách chi tiết','ma-search':'🔍 Tìm công ty...',
    'ma-col-company':'Công ty','ma-col-type':'Loại','ma-col-status':'Trạng thái','ma-col-score':'Điểm DD',
    'ma-col-deal':'Hình thức deal','ma-col-val':'Định giá (tr.đ)','ma-col-contact':'Liên hệ','ma-col-updated':'Cập nhật','ma-col-owner':'Người A',
    'stage-tim-kiem':'🔍 Tìm kiếm','stage-tiep-can':'📞 Tiếp cận','stage-tham-dinh':'🔬 Thẩm định','stage-dam-phan':'🤝 Đàm phán','stage-hoan-tat':'✅ Hoàn tất',
    'ma-empty-col':'Trống','ma-overdue':'Quá hạn',
    'toast-ma-added':'Đã thêm','toast-ma-updated':'Đã cập nhật','toast-ma-deleted':'Đã xóa','err-ma-name':'Nhập tên công ty',
    'modal-ma-add':'Thêm công ty M&A','modal-ma-edit':'Chỉnh sửa',
    'deal-unknown':'Chưa xác định','deal-100':'Mua lại 100%','deal-51':'Đầu tư chiến lược 51%+','deal-coop':'Hợp tác vận hành độc quyền',
    'actual-lbl':'Actual','target-lbl':'Target','remaining':'Còn lại','payback':'Hoàn vốn dự kiến','spent-budget':'Chi / Dự toán','overrun':'Phát sinh %',
  },
  en: {
    'addSite':'Add project','export':'Export','t-overview':'🏠 Overview',
    't-sites':'🏢 Sites','t-intl':'🌏 Intl Team','t-finance':'💰 Finance',
    't-okr':'🎯 OKR','t-change':'📝 Changes','t-report':'📤 Reports',
    'intl-title':'International Team','intl-members':'Team Members',
    'addMember':'Add member','tz-title':'Time Zone Clocks',
    'comm-title':'Communication & Meetings','meeting-name':'Meeting name',
    'meeting-time':'Time (VN)','meeting-day':'Day','meeting-note':'Link / Notes',
    'addMeeting':'Add meeting','barrier-title':'Communication barriers',
    'checklist-title':'Working with CN team checklist','tips-title':'Cross-culture tips',
    'fin-input':'Site Financials','select-site':'Select site',
    'budget':'Budget (M VND)','actual':'Actual spend','overage':'Cost overrun','revenue':'Monthly revenue',
    'save-fin':'Save financials','fin-result':'Results',
    'new-change':'Log new change','change-content':'Description','accountable':'Accountable (A)','log-change':'Submit',
    'snapshot-title':'📋 Site Snapshot','alert-title':'System Alerts',
    'fc-active':'Active','fc-upcoming':'Upcoming','fc-done':'Done',
    'total-projects':'Total projects','sop-done':'SOPs done','change-pending':'Pending changes','intl-team':'Intl members',
    'health-score':'Health Score','no-sites':'No projects yet.','add-first':'+ Add first project',
    'progress':'Progress','phase':'Phase','lead':'Lead',
    'status-active':'Active','status-upcoming':'Upcoming','status-done':'Done','status-paused':'Paused',
    'edit':'Edit','clone':'Clone','delete':'Delete','save':'💾 Save','cancel':'Cancel',
    'pending':'Pending','approved':'Approved','rejected':'Rejected','done-status':'Done',
    'no-members':'No international team members yet.','no-meetings':'No recurring meetings yet.',
    'no-changes':'No changes logged.','no-kr':'No KRs yet.',
    'working':'🟢 Working','off-hours':'🔴 Off hours',
    'topbar-sub':'{n} projects · {a} active · {m} intl members',
    'toast-saved':'Saved ✓','toast-saving':'Saving ☁️...',
    'toast-added':'Added','toast-updated':'Updated','toast-deleted':'Deleted','toast-cloned':'Cloned ✓',
    'toast-fin-saved':'Finance saved ✓','toast-member-added':'Member added ✓',
    'toast-meeting-added':'Meeting added ✓','toast-kr-added':'KR added ✓',
    'err-name':'Please enter a name','err-site-content':'Select a site and enter content','err-kr':'Please enter a KR',
    'confirm-delete':'Delete "{name}"?','confirm-reset':'Reset all actuals to 0?',
    't-ma':'🏭 M&A','ma-all':'All','ma-ve-sinh':'🧹 Cleaning','ma-su-kien':'🎪 Events','ma-other':'🏢 Other',
    'ma-add':'+ Add company','ma-total':'Total companies','ma-active':'In pipeline',
    'ma-negotiating':'Negotiating','ma-done':'Deals closed','ma-empty':'No companies yet.',
    'ma-detail':'📋 Detailed list','ma-search':'🔍 Search companies...',
    'ma-col-company':'Company','ma-col-type':'Type','ma-col-status':'Stage','ma-col-score':'DD Score',
    'ma-col-deal':'Deal type','ma-col-val':'Valuation (M VND)','ma-col-contact':'Contact','ma-col-updated':'Updated','ma-col-owner':'Owner',
    'stage-tim-kiem':'🔍 Sourcing','stage-tiep-can':'📞 Outreach','stage-tham-dinh':'🔬 Due diligence','stage-dam-phan':'🤝 Negotiation','stage-hoan-tat':'✅ Closed',
    'ma-empty-col':'Empty','ma-overdue':'Overdue',
    'toast-ma-added':'Added','toast-ma-updated':'Updated','toast-ma-deleted':'Deleted','err-ma-name':'Enter company name',
    'modal-ma-add':'Add M&A company','modal-ma-edit':'Edit',
    'deal-unknown':'Not determined','deal-100':'Full acquisition','deal-51':'Strategic 51%+','deal-coop':'Exclusive partnership',
    'actual-lbl':'Actual','target-lbl':'Target','remaining':'Remaining','payback':'Est. payback','spent-budget':'Spent / Budget','overrun':'Overrun %',
  },
  zh: {
    'addSite':'添加项目','export':'导出','t-overview':'🏠 概览',
    't-sites':'🏢 站点','t-intl':'🌏 国际团队','t-finance':'💰 财务',
    't-okr':'🎯 OKR','t-change':'📝 变更','t-report':'📤 报告',
    'intl-title':'国际团队','intl-members':'团队成员',
    'addMember':'添加成员','tz-title':'时区时钟',
    'comm-title':'沟通与会议','meeting-name':'会议名称',
    'meeting-time':'时间（越南）','meeting-day':'日期','meeting-note':'链接/备注',
    'addMeeting':'添加会议','barrier-title':'沟通障碍',
    'checklist-title':'与越南团队合作清单','tips-title':'跨文化沟通技巧',
    'fin-input':'站点财务','select-site':'选择站点',
    'budget':'预算（百万越盾）','actual':'实际支出','overage':'超支','revenue':'月收入',
    'save-fin':'保存财务','fin-result':'计算结果',
    'new-change':'记录变更','change-content':'内容','accountable':'负责人(A)','log-change':'提交',
    'snapshot-title':'📋 站点快照','alert-title':'系统警报',
    'fc-active':'进行中','fc-upcoming':'即将开始','fc-done':'已完成',
    'total-projects':'项目总数','sop-done':'已完成SOP','change-pending':'待审变更','intl-team':'国际成员',
    'health-score':'健康评分','no-sites':'暂无项目。','add-first':'+ 添加第一个项目',
    'progress':'进度','phase':'阶段','lead':'负责人',
    'status-active':'进行中','status-upcoming':'即将开始','status-done':'已完成','status-paused':'已暂停',
    'edit':'编辑','clone':'复制','delete':'删除','save':'💾 保存','cancel':'取消',
    'pending':'待审','approved':'已批准','rejected':'已拒绝','done-status':'已完成',
    'no-members':'暂无国际团队成员。','no-meetings':'暂无定期会议。',
    'no-changes':'暂无变更记录。','no-kr':'暂无关键结果。',
    'working':'🟢 工作中','off-hours':'🔴 下班时间',
    'topbar-sub':'{n} 个项目 · {a} 进行中 · {m} 名国际成员',
    'toast-saved':'已保存 ✓','toast-saving':'保存中 ☁️...',
    'toast-added':'已添加','toast-updated':'已更新','toast-deleted':'已删除','toast-cloned':'已复制 ✓',
    'toast-fin-saved':'财务已保存 ✓','toast-member-added':'成员已添加 ✓',
    'toast-meeting-added':'会议已添加 ✓','toast-kr-added':'关键结果已添加 ✓',
    'err-name':'请输入名称','err-site-content':'请选择站点并输入内容','err-kr':'请输入关键结果',
    'confirm-delete':'删除"{name}"？','confirm-reset':'将所有实际值重置为0？',
    't-ma':'🏭 并购','ma-all':'全部','ma-ve-sinh':'🧹 清洁公司','ma-su-kien':'🎪 活动公司','ma-other':'🏢 其他',
    'ma-add':'+ 添加公司','ma-total':'公司总数','ma-active':'跟踪中',
    'ma-negotiating':'谈判中','ma-done':'已完成交易','ma-empty':'暂无公司。',
    'ma-detail':'📋 详细列表','ma-search':'🔍 搜索公司...',
    'ma-col-company':'公司名称','ma-col-type':'类型','ma-col-status':'阶段','ma-col-score':'尽调评分',
    'ma-col-deal':'交易类型','ma-col-val':'估值（百万越盾）','ma-col-contact':'联系人','ma-col-updated':'更新时间','ma-col-owner':'负责人',
    'stage-tim-kiem':'🔍 寻源','stage-tiep-can':'📞 接触','stage-tham-dinh':'🔬 尽职调查','stage-dam-phan':'🤝 谈判','stage-hoan-tat':'✅ 已完成',
    'ma-empty-col':'暂无','ma-overdue':'已逾期',
    'toast-ma-added':'已添加','toast-ma-updated':'已更新','toast-ma-deleted':'已删除','err-ma-name':'请输入公司名称',
    'modal-ma-add':'添加并购公司','modal-ma-edit':'编辑',
    'deal-unknown':'未确定','deal-100':'100%收购','deal-51':'战略投资51%+','deal-coop':'独家运营合作',
    'actual-lbl':'实际','target-lbl':'目标','remaining':'剩余','payback':'预计回本','spent-budget':'已用/预算','overrun':'超支比例',
  },
};

// t(key, {placeholder: value}) — get translated string
function t(key, vars={}) {
  const str = (I18N[lang]||I18N.vi)[key] || I18N.vi[key] || key;
  return str.replace(/\{(\w+)\}/g, (_,k) => vars[k]??'');
}

let lang = 'vi';
function setLang(l, btn) {
  lang = l;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[data-i]').forEach(el => {
    const key = el.getAttribute('data-i');
    if (I18N[l][key]) el.textContent = I18N[l][key];
  });
  refreshAll();
  // re-render M&A tab label
  const maTab = document.querySelector('[onclick="sw(\'ma\',this)"]');
  if(maTab) maTab.textContent = t('t-ma');
}

// ── DATA STORE ───────────────────────────────────────────────
let D = {
  sites: [
    {id:'s1',name:'T23 Láng Hạ',type:'Văn phòng cho thuê',status:'active',phase:'Thi công & vận hành thử',country:'Việt Nam',pct:45,budget:5000,actual:2800,over:85,rev:0,sop:0,sopT:5,fill:0,rubix:'no',lead:'PMO',lang:'vi',start:'2025-01-01',end:'2025-10-30',note:'BE6 SOP cần ưu tiên'},
    {id:'s2',name:'T16 Láng Hạ',type:'Văn phòng cho thuê',status:'active',phase:'Cải tạo & thiết kế',country:'Việt Nam',pct:25,budget:3500,actual:800,over:0,rev:0,sop:0,sopT:5,fill:0,rubix:'no',lead:'PMO',lang:'vi',start:'2025-03-01',end:'2026-02-28',note:'Phụ thuộc SOP T23'},
    {id:'s3',name:'Tư Đình',type:'Văn phòng cho thuê',status:'upcoming',phase:'Tiền khả thi — chuẩn bị nhân bản SOP',country:'Việt Nam',pct:5,budget:4200,actual:0,over:0,rev:0,sop:0,sopT:5,fill:0,rubix:'no',lead:'PMO',lang:'vi',start:'2025-11-01',end:'2026-06-30',note:'Dependency: SOP Láng Hạ hoàn chỉnh · Playbook BE1-8 cần xong trước onboard'},
    {id:'s4',name:'HUD',type:'Văn phòng cho thuê',status:'upcoming',phase:'Ý tưởng — đang khảo sát',country:'Việt Nam',pct:0,budget:0,actual:0,over:0,rev:0,sop:0,sopT:5,fill:0,rubix:'no',lead:'PMO',lang:'vi',start:'',end:'',note:'Site thứ 4 · Chờ kết quả Tư Đình'},
    {id:'s5',name:'Khách sạn NT',type:'Khách sạn',status:'upcoming',phase:'M&A / Thẩm định',country:'Việt Nam',pct:0,budget:0,actual:0,over:0,rev:0,sop:0,sopT:8,fill:0,rubix:'no',lead:'PMO',lang:'vi-en',start:'',end:'',note:'Tích hợp dịch vụ vận hành 4★ · Phối hợp Rubix · Cần SOP riêng cho hospitality'},
  ],
  members: [],
  meetings: [],
  changes: [], changeCounter: 1,
  health: {be1:3,be2:3,be3:4,be4:3,be5:3,be6:2,be7:2,be8:2},
  okrs: [
    // ── O1: Vận hành chuẩn 4★ tại Láng Hạ (Q3 2025) ──
    {obj:'O1 — Vận hành chuẩn 4★ tại Láng Hạ (Q3/2025)',kr:'KR1.1: Hoàn thiện ≥5 SOP vận hành T23 được Rubix xác nhận',truc:'BE6',owner:'QL VH Site',target:5,unit:'SOP',actual:0},
    {obj:'O1 — Vận hành chuẩn 4★ tại Láng Hạ (Q3/2025)',kr:'KR1.2: 100% hồ sơ pháp lý T23 & T16 được số hóa BE7',truc:'BE7',owner:'HC + QL TK',target:100,unit:'%',actual:0},
    {obj:'O1 — Vận hành chuẩn 4★ tại Láng Hạ (Q3/2025)',kr:'KR1.3: Rubix đánh giá 4★ ≥1 site trước cuối Q3',truc:'BE6',owner:'PMO',target:1,unit:'site',actual:0},
    {obj:'O1 — Vận hành chuẩn 4★ tại Láng Hạ (Q3/2025)',kr:'KR1.4: Retrospective BE8 diễn ra đủ 6 tuần liên tiếp',truc:'BE8',owner:'PMO',target:6,unit:'tuần',actual:0},
    {obj:'O1 — Vận hành chuẩn 4★ tại Láng Hạ (Q3/2025)',kr:'KR1.5: Health Score 8 trục trung bình ≥3.5/5',truc:'BE1',owner:'PMO',target:35,unit:'(×10)',actual:0},
    // ── O2: Dòng tiền & P3 (Q3 2025) ──
    {obj:'O2 — Dòng tiền & P3 (Q3/2025)',kr:'KR2.1: Phát sinh T23+T16 ≤5% dự toán',truc:'BE5',owner:'QL TC',target:5,unit:'%',actual:0},
    {obj:'O2 — Dòng tiền & P3 (Q3/2025)',kr:'KR2.2: Lấp đầy T23 đạt ≥60% cuối Q3',truc:'FE3',owner:'PMO',target:60,unit:'%',actual:0},
    {obj:'O2 — Dòng tiền & P3 (Q3/2025)',kr:'KR2.3: Ký HĐ P3 với CĐT trước 30/09',truc:'FE5',owner:'PMO',target:1,unit:'HĐ',actual:0},
    {obj:'O2 — Dòng tiền & P3 (Q3/2025)',kr:'KR2.4: Doanh thu dịch vụ vận hành ≥50tr/tháng từ T9',truc:'FE1',owner:'PMO',target:50,unit:'tr.đ',actual:0},
    // ── O3: Nhân bản sang Tư Đình (Q4 2025) ──
    {obj:'O3 — Nhân bản mô hình sang Tư Đình (Q4/2025)',kr:'KR3.1: Playbook vận hành 4★ BE1-8 hoàn chỉnh trước 30/10',truc:'BE6',owner:'PMO',target:1,unit:'playbook',actual:0},
    {obj:'O3 — Nhân bản mô hình sang Tư Đình (Q4/2025)',kr:'KR3.2: Onboard đội ngũ Tư Đình ≤4 tuần theo playbook',truc:'BE2',owner:'PMO + HR',target:4,unit:'tuần',actual:0},
    {obj:'O3 — Nhân bản mô hình sang Tư Đình (Q4/2025)',kr:'KR3.3: ≥3 SOP Tư Đình được triển khai trong tháng đầu',truc:'BE6',owner:'QL VH Tư Đình',target:3,unit:'SOP',actual:0},
    {obj:'O3 — Nhân bản mô hình sang Tư Đình (Q4/2025)',kr:'KR3.4: Báo cáo onboard Tư Đình gửi CĐT trước 15/12',truc:'BE7',owner:'PMO',target:1,unit:'báo cáo',actual:0},
    // ── O4: M&A & Dịch vụ mới (Q4 2025) ──
    {obj:'O4 — M&A & Dịch vụ hỗ trợ khởi nghiệp (Q4/2025)',kr:'KR4.1: Hoàn tất thẩm định ≥1 công ty vệ sinh công nghiệp',truc:'BE2',owner:'PMO',target:1,unit:'công ty',actual:0},
    {obj:'O4 — M&A & Dịch vụ hỗ trợ khởi nghiệp (Q4/2025)',kr:'KR4.2: Khách sạn NT — SOP hospitality draft xong Q4',truc:'BE6',owner:'PMO + Rubix',target:1,unit:'SOP draft',actual:0},
    {obj:'O4 — M&A & Dịch vụ hỗ trợ khởi nghiệp (Q4/2025)',kr:'KR4.3: Ra mắt gói dịch vụ trọn gói (hành chính + kế toán + pháp lý)',truc:'FE2',owner:'PMO',target:1,unit:'gói DV',actual:0},
    {obj:'O4 — M&A & Dịch vụ hỗ trợ khởi nghiệp (Q4/2025)',kr:'KR4.4: ≥2 khách hàng thử nghiệm gói dịch vụ trọn gói',truc:'FE3',owner:'PMO + Sales',target:2,unit:'KH',actual:0},
  ],
  payments: [], payCounter: 1, payFilter: 'all',
  todos: [], todoCounter: 1, todoFilter: 'all',
  editingPayId: null, editingTodoId: null,
  ma: [], maCounter: 1,
  maFilter: 'all',
  editingMaId: null,
  activeFilter: 'all',
  editingSiteId: null, editingMemberId: null,
};

// ═══════════════════════════════════════════════════════════════
// GOOGLE SHEETS SYNC · v4.0
// Thay thế localStorage → Google Sheets realtime
// ═══════════════════════════════════════════════════════════════

// ⚙️ CẤU HÌNH: Paste URL Google Apps Script Web App vào đây
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw5bKmOhcbvb0Q2cM8_ZoHYSacoRK0LZWKgrJqfFHzGj-pYbEU29WiP1Q7asecoi3Jn/exec';

// Offline fallback: vẫn dùng localStorage khi mất mạng
const LS_KEY = 'ops_v5_cache';
let _syncStatus = 'offline'; // 'online' | 'syncing' | 'offline' | 'error'
let _lastSync = null;
let _syncTimer = null;
let _pendingSave = false;

// ── Sync status UI ────────────────────────────────────────────
function updateSyncBadge(status, msg) {
  _syncStatus = status;
  let el = document.getElementById('sync-badge');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sync-badge';
    Object.assign(el.style, {
      position:'fixed', bottom:'18px', left:'18px', zIndex:'9998',
      padding:'5px 12px', borderRadius:'20px', fontSize:'11px',
      fontWeight:'600', boxShadow:'0 2px 8px rgba(0,0,0,.15)',
      display:'flex', alignItems:'center', gap:'6px', cursor:'default',
      transition:'all .3s'
    });
    document.body.appendChild(el);
  }
  const cfg = {
    online:   { bg:'#E0F8EE', color:'#0D6E4A', icon:'☁️', text: msg || 'Đã đồng bộ ' + new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}) },
    syncing:  { bg:'#EEF2FF', color:'#3D5CF5', icon:'🔄', text: 'Đang lưu...' },
    offline:  { bg:'#FFF3DC', color:'#B86B00', icon:'📴', text: 'Offline — lưu cục bộ' },
    error:    { bg:'#FCEBEB', color:'#C0392B', icon:'⚠️', text: msg || 'Lỗi kết nối' },
  };
  const c = cfg[status] || cfg.offline;
  el.style.background = c.bg;
  el.style.color = c.color;
  el.innerHTML = `<span>${c.icon}</span><span>${c.text}</span>`;
}

// ── Load từ Google Sheets khi khởi động ───────────────────────
async function loadFromSheets() {
  if (SHEET_URL === 'PASTE_YOUR_APPS_SCRIPT_URL_HERE') {
    try { const s = localStorage.getItem(LS_KEY); if(s) D = {...D, ...JSON.parse(s)}; } catch(e) {}
    updateSyncBadge('offline', '⚙️ Chưa kết nối Google Sheets');
    return;
  }

  updateSyncBadge('syncing', 'Đang tải dữ liệu...');
  try {
    // Apps Script yêu cầu redirect:follow để tránh CORS preflight
    const res = await fetch(SHEET_URL + '?action=load', {
      method: 'GET',
      redirect: 'follow',
    });
    const data = await res.json();

    if (data.ok) {
      // Map Sheets data → D structure
      if (data.sites   && data.sites.length)   D.sites   = data.sites.map(normalizeNumbers);
      if (data.members && data.members.length)  D.members = data.members;
      if (data.meetings && data.meetings.length) D.meetings = data.meetings;
      if (data.changes && data.changes.length)  D.changes = data.changes;
      if (data.okrs    && data.okrs.length)     D.okrs    = data.okrs.map(o => ({...o, target:+o.target||0, actual:+o.actual||0}));
      if (data.health  && Object.keys(data.health).length) {
        Object.keys(data.health).forEach(k => { D.health[k] = +data.health[k] || 3; });
      }
      if (data.meta && data.meta.changeCounter) D.changeCounter = +data.meta.changeCounter || 1;
      if (data.payments && data.payments.length) D.payments = data.payments;
      if (data.todos && data.todos.length) D.todos = data.todos;
      if (data.ma && data.ma.length) D.ma = data.ma;
      if (data.meta && data.meta.maCounter) D.maCounter = +data.meta.maCounter || 1;

      // Cache offline
      localStorage.setItem(LS_KEY, JSON.stringify(D));
      _lastSync = new Date();
      updateSyncBadge('online');
      refreshAll();
    } else {
      throw new Error(data.error || 'Unknown error');
    }
  } catch(err) {
    console.warn('Sheets load failed, using cache:', err);
    try { const s = localStorage.getItem(LS_KEY); if(s) D = {...D, ...JSON.parse(s)}; } catch(e2) {}
    updateSyncBadge('error', 'Dùng cache offline');
    refreshAll();
  }
}

function normalizeNumbers(s) {
  return {
    ...s,
    pct:+s.pct||0, budget:+s.budget||0, actual:+s.actual||0,
    over:+s.over||0, rev:+s.rev||0, sop:+s.sop||0,
    sopT:+s.sopT||5, fill:+s.fill||0
  };
}

// ── Save lên Google Sheets (no-cors POST — data ghi được, không đọc response) ─
async function pushToSheets() {
  if (SHEET_URL === 'PASTE_YOUR_APPS_SCRIPT_URL_HERE') {
    localStorage.setItem(LS_KEY, JSON.stringify(D));
    return;
  }

  localStorage.setItem(LS_KEY, JSON.stringify(D)); // cache local ngay
  updateSyncBadge('syncing');

  try {
    // no-cors: tránh CORS preflight, Apps Script vẫn nhận và ghi data
    // Không đọc được response — dùng ping riêng để xác nhận
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' }, // text/plain không trigger preflight
      body: JSON.stringify({ action: 'save_all', data: D }),
    });
    // Sau 3 giây ping để xác nhận đã lưu thành công
    setTimeout(async () => {
      try {
        const ping = await fetch(SHEET_URL + '?action=ping', { method:'GET', redirect:'follow' });
        const p = await ping.json();
        if (p.ok) { _lastSync = new Date(); updateSyncBadge('online'); }
      } catch(e) { updateSyncBadge('online', '☁️ Đã lưu (không verify)'); }
    }, 3000);
  } catch(err) {
    console.error('Sheets save failed:', err);
    updateSyncBadge('error', 'Lưu offline (thử lại sau)');
    _pendingSave = true;
  }
}

// Debounce: gom nhiều thay đổi → 1 lần save (sau 2 giây)
function scheduleSave() {
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(() => pushToSheets(), 2000);
}

// ── UTILS ─────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const uid = () => 's' + Date.now() + Math.random().toString(36).slice(2,6);
const pct = (a,b) => b > 0 ? Math.min(100, Math.round(a/b*100)) : 0;
const fmt = n => Number(n||0).toLocaleString('vi-VN');
const today = () => new Date().toLocaleDateString('vi-VN');
const sCol = v => v>=4?'#0D6E4A':v>=3?'#6B6B6B':v>=2?'#B86B00':'#C0392B';
const statusCol = {active:'#0D6E4A',upcoming:'#B86B00',done:'#3D5CF5',paused:'#6B6B6B'};
const statusLbl = {active:{vi:'Đang chạy',en:'Active',zh:'进行中'},upcoming:{vi:'Sắp tới',en:'Upcoming',zh:'即将'},done:{vi:'Hoàn thành',en:'Done',zh:'完成'},paused:{vi:'Tạm dừng',en:'Paused',zh:'暂停'}};
const pCol = p => p>=70?'#0D6E4A':p>=40?'#B86B00':'#C0392B';
const flagMap = {vn:'🇻🇳',cn:'🇨🇳',sg:'🇸🇬',jp:'🇯🇵',kr:'🇰🇷',us:'🇺🇸',other:'🌍'};
const statusDot = {active:'🟢',travel:'🟡',offline:'🔴'};

function saveAll() {
  scheduleSave();
  toast(t('toast-saving'));
}

function toast(msg, err=false) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {position:'fixed',bottom:'18px',right:'18px',
    background:err?'#C0392B':'#0D6E4A',color:'#fff',padding:'9px 16px',
    borderRadius:'8px',fontSize:'12px',fontWeight:'600',zIndex:'9999',
    boxShadow:'0 4px 16px rgba(0,0,0,.2)'});
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

function sw(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  $('panel-'+id).classList.add('active');
  btn.classList.add('active');
  if(id==='finance') populateFinSelect();
  if(id==='change') populateChangeSel();
  if(id==='report') { populateRptSel(); renderReportPreview(); }
  if(id==='intl') { renderClocks(); renderMembers(); renderMeetings(); renderIntlChecklist(); }
  if(id==='ma') renderMa();
}

function openModal(id) { $(id).classList.add('open'); }
function closeModal(id) { $(id).classList.remove('open'); }
function setFilter(f, el) {
  D.activeFilter = f;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderSiteList();
}

function copyText(srcId, okId) {
  const el = $(srcId);
  const txt = el.textContent || el.innerText;
  navigator.clipboard.writeText(txt).then(() => {
    const ok = $(okId); ok.classList.add('show');
    setTimeout(() => ok.classList.remove('show'), 2000);
  }).catch(() => {
    const r = document.createRange(); r.selectNode(el);
    window.getSelection().removeAllRanges(); window.getSelection().addRange(r);
    document.execCommand('copy');
    const ok = $(okId); ok.classList.add('show');
    setTimeout(() => ok.classList.remove('show'), 2000);
  });
}

// ── OVERVIEW ─────────────────────────────────────────────────
function renderOverview() {
  const active = D.sites.filter(s => s.status==='active').length;
  $('topbar-sub').textContent = t('topbar-sub',{n:D.sites.length,a:active,m:D.members.length});
  const totalSop = D.sites.reduce((a,s) => a+(+s.sop||0), 0);
  const pending = D.changes.filter(c => c.status==='Pending').length;
  const intlCount = D.members.filter(m => m.nat !== 'vn').length;
  const avgPct = active > 0 ? Math.round(D.sites.filter(s=>s.status==='active').reduce((a,s)=>a+(+s.pct||0),0)/active) : 0;
  $('kpi-row').innerHTML = [
    {val:D.sites.length, lbl:t('total-projects'), sub:`${active} active`, col:'#3D5CF5'},
    {val:totalSop, lbl:t('sop-done'), sub:'Target', col:totalSop>=5?'#0D6E4A':'#B86B00'},
    {val:pending, lbl:t('change-pending'), sub:t('pending'), col:pending>0?'#B86B00':'#0D6E4A'},
    {val:D.members.length, lbl:t('intl-team'), sub:`${intlCount} non-VN`, col:'#1A2F5A'},
  ].map(k => `<div class="card kpi" style="border-top:3px solid ${k.col}">
    <div class="kpi-val" style="color:${k.col}">${k.val}</div>
    <div class="kpi-label">${k.lbl}</div>
    <div style="font-size:10px;color:#6B6B6B;margin-top:2px">${k.sub}</div>
  </div>`).join('');
  renderHealth(); renderAlerts(); renderPayments(); renderTodos(); renderSnapshot();
}

function renderHealth() {
  const keys = ['be1','be2','be3','be4','be5','be6','be7','be8'];
  const lbls = {
    vi:['BE1 Tầm nhìn','BE2 Chiến lược','BE3 Kế hoạch','BE4 Lực lượng','BE5 Tài chính','BE6 SOP','BE7 Hồ sơ','BE8 Cải tiến'],
    en:['BE1 Vision','BE2 Strategy','BE3 Planning','BE4 People','BE5 Finance','BE6 SOP/Process','BE7 Data/Docs','BE8 Improvement'],
    zh:['BE1 愿景','BE2 战略','BE3 计划','BE4 人力','BE5 财务','BE6 流程/SOP','BE7 数据/文件','BE8 改进'],
  };
  const L = lbls[lang] || lbls.vi;
  let html = '';
  keys.forEach((k,i) => {
    const v = D.health[k]||1; const c = sCol(v);
    html += `<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
      <div style="font-size:10px;color:#6B6B6B;width:105px;flex-shrink:0">${L[i]}</div>
      <div style="flex:1;height:7px;background:#EBEBEB;border-radius:4px;overflow:hidden">
        <div style="width:${v*20}%;height:100%;background:${c};border-radius:4px"></div>
      </div>
      <select style="width:60px;font-size:10px;padding:2px 4px" onchange="D.health['${k}']=+this.value;renderOverview()">
        ${[1,2,3,4,5].map(n=>`<option value="${n}"${n==v?' selected':''}>L${n}</option>`).join('')}
      </select>
    </div>`;
  });
  const avg = keys.reduce((a,k)=>a+D.health[k],0)/8;
  html += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #E2E2DC;display:flex;justify-content:space-between">
    <span style="font-size:11px;color:#6B6B6B">Health Score</span>
    <span style="font-size:16px;font-weight:700;color:${sCol(avg)}">${Math.round(avg*20)}/100</span>
  </div>`;
  $('health-chart').innerHTML = html;
}

function renderAlerts() {
  const al = [];
  const sop = D.sites.filter(s=>s.status==='active').reduce((a,s)=>a+(+s.sop||0),0);
  if(sop<5) al.push({t:'err',m:{vi:`BE6: ${sop} SOP — cần ≥5`,en:`BE6: ${sop} SOPs — need ≥5`,zh:`BE6: ${sop} SOP — 需要 ≥5`}});
  if(D.health.be7<=2) al.push({t:'err',m:{vi:'BE7: Hồ sơ chưa đủ → nguy cơ P3',en:'BE7: Docs incomplete → P3 risk',zh:'BE7: 文件不完整 → P3风险'}});
  const pend = D.changes.filter(c=>c.status==='Pending').length;
  if(pend>0) al.push({t:'warn',m:{vi:`${pend} Change pending`,en:`${pend} changes pending`,zh:`${pend} 个变更待审`}});
  if(D.members.length>0) {
    const tzWarning = D.members.filter(m=>m.tz==='Asia/Shanghai').length > 0;
    if(tzWarning) al.push({t:'warn',m:{vi:'Team TQ GMT+8 — lịch họp chênh 1h so với VN',en:'CN team GMT+8 — 1h ahead of VN',zh:'中国团队 GMT+8 — 比越南早1小时'}});
  }
  if(D.changes.length>0) al.push({t:'ok',m:{vi:`Change Log: ${D.changes.length} logged`,en:`Change Log: ${D.changes.length} recorded`,zh:`变更日志: ${D.changes.length} 条`}});
  // Payment alerts
  const overduePays = D.payments.filter(p=>p.status!=='paid'&&getDaysLeft(p.due)<0);
  const dueSoon = D.payments.filter(p=>p.status!=='paid'&&getDaysLeft(p.due)>=0&&getDaysLeft(p.due)<=3);
  if(overduePays.length>0) al.push({t:'err',m:{vi:`💳 ${overduePays.length} khoản thanh toán quá hạn!`,en:`💳 ${overduePays.length} overdue payments!`,zh:`💳 ${overduePays.length} 笔付款已逾期！`}});
  if(dueSoon.length>0) al.push({t:'warn',m:{vi:`💳 ${dueSoon.length} khoản TT đến hạn trong 3 ngày`,en:`💳 ${dueSoon.length} payments due in 3 days`,zh:`💳 ${dueSoon.length} 笔付款3天内到期`}});
  // Todo alerts
  const overdueTodos = D.todos.filter(td=>!td.done&&td.due&&getDaysLeft(td.due)<0&&td.priority==='high');
  const todayTodos = D.todos.filter(td=>!td.done&&td.due===new Date().toISOString().split('T')[0]);
  if(overdueTodos.length>0) al.push({t:'err',m:{vi:`✅ ${overdueTodos.length} việc ưu tiên cao đã quá hạn!`,en:`✅ ${overdueTodos.length} high-priority tasks overdue!`,zh:`✅ ${overdueTodos.length} 项高优先级任务已逾期！`}});
  if(todayTodos.length>0) al.push({t:'warn',m:{vi:`✅ ${todayTodos.length} việc cần làm hôm nay`,en:`✅ ${todayTodos.length} tasks due today`,zh:`✅ ${todayTodos.length} 项任务今天到期`}});
  $('alerts-box').innerHTML = al.map(a => `<div class="alert a-${a.t}">${a.t==='err'?'⚠️':a.t==='warn'?'🔔':'✅'} ${a.m[lang]||a.m.vi}</div>`).join('');
}

function renderSnapshot() {
  $('site-snapshot').innerHTML = D.sites.map(s => {
    const p=+s.pct||0; const col=s.status==='done'?'#3D5CF5':pCol(p);
    const sc=statusCol[s.status]||'#6B6B6B';
    const sl=statusLbl[s.status]?statusLbl[s.status][lang]||statusLbl[s.status].vi:'';
    return `<div class="card" style="border-top:3px solid ${col};cursor:pointer" onclick="openEditSite('${s.id}')">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:5px">
        <div style="font-size:12px;font-weight:700">${s.name}</div>
        <span class="pill" style="background:${sc}20;color:${sc};font-size:9px">${sl}</span>
      </div>
      ${s.country?`<div style="font-size:10px;color:#aaa;margin-bottom:4px">📍 ${s.country}</div>`:''}
      <div style="font-size:10px;color:#6B6B6B;margin-bottom:7px">${s.phase||'—'}</div>
      <div style="margin-bottom:5px">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px">
          <span>Progress</span><span style="font-weight:700;color:${col}">${p}%</span>
        </div>
        <div class="prog"><div class="pf" style="width:${p}%;background:${col}"></div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
        <div style="font-size:10px;color:#6B6B6B">SOP: <strong>${s.sop||0}/${s.sopT||5}</strong></div>
        <div style="font-size:10px;color:#6B6B6B">Fill: <strong>${s.fill||0}%</strong></div>
      </div>
    </div>`;
  }).join('');
}

// ── SITES ────────────────────────────────────────────────────
function renderSiteList() {
  const q = ($('site-search')?.value||'').toLowerCase();
  const filtered = D.sites.filter(s => {
    const mq = !q||s.name.toLowerCase().includes(q)||(s.phase||'').toLowerCase().includes(q)||(s.country||'').toLowerCase().includes(q);
    return mq && (D.activeFilter==='all'||s.status===D.activeFilter);
  });
  if(!filtered.length) { $('site-list').innerHTML=`<div class="empty">${t('no-sites')} <button class="btn btn-primary btn-sm" onclick="openAddSite()">${t('add-first')}</button></div>`; return; }
  $('site-list').innerHTML = filtered.map(s => {
    const p=+s.pct||0; const col=pCol(p); const sc=statusCol[s.status]||'#6B6B6B';
    const sl=statusLbl[s.status]?statusLbl[s.status][lang]||statusLbl[s.status].vi:'';
    const overPct = s.budget>0?Math.round((+s.over||0)/(+s.budget)*100):0;
    const langFlag = {vi:'🇻🇳',en:'🇬🇧',zh:'🇨🇳','vi-en':'🇻🇳🇬🇧','vi-zh':'🇻🇳🇨🇳'}[s.lang||'vi']||'';
    return `<div class="site-card">
      <div style="padding:12px 14px 8px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
          <div><div style="font-weight:700;font-size:13px">${langFlag} ${s.name}</div>
            <div style="font-size:10px;color:#6B6B6B">${s.type}${s.country?' · '+s.country:''}</div></div>
          <span class="pill" style="background:${sc}20;color:${sc}">${sl}</span>
        </div>
        <div style="font-size:11px;color:#3D5CF5;font-weight:500;margin-bottom:8px">📍 ${s.phase||'—'}</div>
        <div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px">
            <span style="color:#6B6B6B">Progress</span><span style="font-weight:700;color:${col}">${p}%</span>
          </div>
          <div class="prog"><div class="pf" style="width:${p}%;background:${col}"></div></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px">
          <div style="background:#F5F5F2;border-radius:6px;padding:5px 8px"><div style="color:#6B6B6B;font-size:10px">Budget</div><div style="font-weight:600">${s.budget?fmt(s.budget)+' tr':'—'}</div></div>
          <div style="background:${overPct>5?'#FCEBEB':'#F5F5F2'};border-radius:6px;padding:5px 8px"><div style="color:#6B6B6B;font-size:10px">Overrun</div><div style="font-weight:600;color:${overPct>5?'#C0392B':'inherit'}">${s.over?fmt(s.over)+' tr':'0'}</div></div>
          <div style="background:${pct(+s.sop,+s.sopT||5)>=100?'#E0F8EE':'#FFF3DC'};border-radius:6px;padding:5px 8px"><div style="color:#6B6B6B;font-size:10px">SOP</div><div style="font-weight:600;color:${pct(+s.sop,+s.sopT||5)>=100?'#0D6E4A':'#B86B00'}">${s.sop||0}/${s.sopT||5}</div></div>
          <div style="background:${(+s.fill||0)>=80?'#E0F8EE':'#F5F5F2'};border-radius:6px;padding:5px 8px"><div style="color:#6B6B6B;font-size:10px">Occupancy</div><div style="font-weight:600;color:${(+s.fill||0)>=80?'#0D6E4A':'inherit'}">${s.fill||0}%</div></div>
        </div>
        ${s.rubix==='yes'?'<div style="margin-top:7px;font-size:10px;background:#E0F8EE;color:#0D6E4A;padding:4px 8px;border-radius:5px;text-align:center;font-weight:600">✓ Rubix 4★</div>':''}
        ${s.note?`<div style="margin-top:6px;font-size:10px;color:#6B6B6B;padding:5px 8px;background:#F5F5F2;border-radius:5px;border-left:2px solid #D0D0CC">${s.note}</div>`:''}
      </div>
      <div class="site-card-actions">
        <button class="btn btn-primary btn-sm" onclick="openEditSite('${s.id}')">✏️ Edit</button>
        <button class="btn btn-sm" style="background:#F5F5F2;color:#1A1A1A" onclick="duplicateSite('${s.id}')">📋 Clone</button>
        <button class="btn btn-red btn-sm" onclick="deleteSite('${s.id}')">🗑️</button>
      </div>
    </div>`;
  }).join('');
}

function openAddSite() {
  D.editingSiteId=null; $('modal-site-title').textContent='Add new project';
  ['ms-name','ms-phase','ms-lead','ms-note','ms-country'].forEach(id=>$(id).value='');
  ['ms-pct','ms-budget','ms-actual','ms-over','ms-rev'].forEach(id=>$(id).value=0);
  $('ms-sop').value=0; $('ms-sop-t').value=5; $('ms-fill').value=0;
  $('ms-type').value='Văn phòng cho thuê'; $('ms-status').value='active';
  $('ms-rubix').value='no'; $('ms-start').value=''; $('ms-end').value=''; $('ms-lang').value='vi';
  openModal('modal-site'); setTimeout(()=>$('ms-name').focus(),100);
}
function openEditSite(id) {
  const s=D.sites.find(x=>x.id===id); if(!s) return;
  D.editingSiteId=id; $('modal-site-title').textContent='Edit: '+s.name;
  $('ms-name').value=s.name||''; $('ms-type').value=s.type||''; $('ms-status').value=s.status||'active';
  $('ms-phase').value=s.phase||''; $('ms-country').value=s.country||'';
  $('ms-pct').value=s.pct||0; $('ms-budget').value=s.budget||0; $('ms-actual').value=s.actual||0;
  $('ms-over').value=s.over||0; $('ms-rev').value=s.rev||0;
  $('ms-sop').value=s.sop||0; $('ms-sop-t').value=s.sopT||5; $('ms-fill').value=s.fill||0;
  $('ms-rubix').value=s.rubix||'no'; $('ms-lead').value=s.lead||'';
  $('ms-lang').value=s.lang||'vi'; $('ms-start').value=s.start||''; $('ms-end').value=s.end||''; $('ms-note').value=s.note||'';
  openModal('modal-site');
}
function saveSite() {
  const name=$('ms-name').value.trim(); if(!name){toast(t('err-name'),true);return;}
  const d={id:D.editingSiteId||uid(),name,type:$('ms-type').value,status:$('ms-status').value,
    phase:$('ms-phase').value,country:$('ms-country').value,pct:+$('ms-pct').value||0,
    budget:+$('ms-budget').value||0,actual:+$('ms-actual').value||0,over:+$('ms-over').value||0,
    rev:+$('ms-rev').value||0,sop:+$('ms-sop').value||0,sopT:+$('ms-sop-t').value||5,
    fill:+$('ms-fill').value||0,rubix:$('ms-rubix').value,lead:$('ms-lead').value,
    lang:$('ms-lang').value,start:$('ms-start').value,end:$('ms-end').value,note:$('ms-note').value};
  if(D.editingSiteId){const i=D.sites.findIndex(s=>s.id===D.editingSiteId);if(i>=0)D.sites[i]=d;}
  else D.sites.push(d);
  closeModal('modal-site'); refreshAll(); saveAll();
  toast((D.editingSiteId?t('toast-updated'):t('toast-added'))+': '+name+' ✓');
}
function deleteSite(id){
  const s=D.sites.find(x=>x.id===id);
  if(!s||!confirm(t('confirm-delete',{name:s.name})))return;
  D.sites=D.sites.filter(x=>x.id!==id); refreshAll(); saveAll(); toast(t('toast-deleted')+': '+s.name);
}
function duplicateSite(id){
  const s=D.sites.find(x=>x.id===id); if(!s)return;
  D.sites.push({...s,id:uid(),name:s.name+' (copy)',pct:0,actual:0,over:0,sop:0,fill:0,rubix:'no'});
  refreshAll(); saveAll(); toast(t('toast-cloned'));
}

// ── INTL TEAM ────────────────────────────────────────────────
function renderClocks() {
  const tzList = [
    {tz:'Asia/Ho_Chi_Minh',label:'🇻🇳 Hà Nội'},
    {tz:'Asia/Shanghai',label:'🇨🇳 Thượng Hải'},
    {tz:'Asia/Singapore',label:'🇸🇬 Singapore'},
    {tz:'Asia/Tokyo',label:'🇯🇵 Tokyo'},
    {tz:'Europe/London',label:'🇬🇧 London'},
  ];
  // Add member timezones
  D.members.forEach(m => {
    if(m.tz && !tzList.find(t=>t.tz===m.tz)) tzList.push({tz:m.tz,label:flagMap[m.nat||'other']+' '+m.name});
  });
  $('tz-clocks').innerHTML = tzList.slice(0,6).map(t => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US',{timeZone:t.tz,hour:'2-digit',minute:'2-digit',hour12:false});
    const date = now.toLocaleDateString('vi-VN',{timeZone:t.tz,weekday:'short',day:'2-digit',month:'2-digit'});
    const h = parseInt(time.split(':')[0]);
    const isWork = h>=8&&h<18;
    return `<div class="card" style="text-align:center;border-top:3px solid ${isWork?'#0D6E4A':'#6B6B6B'}">
      <div style="font-size:12px;font-weight:600;margin-bottom:4px">${t.label}</div>
      <div style="font-size:24px;font-weight:700;color:${isWork?'#0D6E4A':'#6B6B6B'};font-family:monospace">${time}</div>
      <div style="font-size:10px;color:#6B6B6B;margin-top:2px">${date}</div>
      <div style="margin-top:4px;font-size:10px;color:${isWork?'#0D6E4A':'#C0392B'}">${isWork?t('working'):t('off-hours')}</div>
    </div>`;
  }).join('');
  setTimeout(renderClocks, 30000);
}

function renderMembers() {
  if(!D.members.length) {
    $('member-list').innerHTML=`<div class="empty">${t('no-members')} <button class="btn btn-primary btn-sm" onclick="openAddMember()">${t('addMember')}</button></div>`;
    return;
  }
  $('member-list').innerHTML = D.members.map((m,i) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US',{timeZone:m.tz||'Asia/Ho_Chi_Minh',hour:'2-digit',minute:'2-digit',hour12:false});
    const h = parseInt(time.split(':')[0]);
    const isWork = h>=8&&h<18;
    return `<div class="card" style="display:flex;align-items:center;gap:12px;padding:10px 14px">
      <div style="font-size:28px">${flagMap[m.nat||'other']}</div>
      <div style="flex:1">
        <div style="font-weight:700;font-size:13px">${statusDot[m.status]||'⚪'} ${m.name}</div>
        <div style="font-size:11px;color:#6B6B6B">${m.role||'—'} · ${m.site||'—'}</div>
        <div style="font-size:10px;color:#6B6B6B;margin-top:2px">${m.contact||''}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:16px;font-weight:700;font-family:monospace;color:${isWork?'#0D6E4A':'#C0392B'}">${time}</div>
        <div style="font-size:10px;color:#6B6B6B">${m.lang||'—'}</div>
        ${m.note?`<div style="font-size:10px;color:#B86B00;max-width:120px;text-align:right">${m.note}</div>`:''}
      </div>
      <button class="btn btn-red btn-sm" onclick="D.members.splice(${i},1);renderMembers();saveAll()">✕</button>
    </div>`;
  }).join('');
}

function openAddMember() {
  // Populate site select
  $('mb-site').innerHTML='<option value="">-- No site --</option>'+D.sites.map(s=>`<option value="${s.name}">${s.name}</option>`).join('');
  openModal('modal-member');
}
function saveMember() {
  const name=$('mb-name').value.trim(); if(!name){toast(t('err-name'),true);return;}
  D.members.push({
    id:uid(), name, role:$('mb-role').value, nat:$('mb-nat').value,
    tz:$('mb-tz').value, site:$('mb-site').value, lang:$('mb-lang').value,
    contact:$('mb-contact').value, status:$('mb-status').value, note:$('mb-note').value,
  });
  closeModal('modal-member'); renderMembers(); renderClocks(); saveAll(); toast(t('toast-member-added'));
}

function renderMeetings() {
  if(!D.meetings.length){$('meeting-list').innerHTML=`<div style="font-size:11px;color:#aaa">${t('no-meetings')}</div>`;return;}
  $('meeting-list').innerHTML = D.meetings.map((m,i) => `
    <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:#F5F5F2;border-radius:7px;margin-bottom:5px">
      <div style="flex:1;font-size:12px"><strong>${m.name}</strong> · ${m.day} ${m.time} (VN)
        ${m.note?`<span style="color:#3D5CF5;font-size:11px"> · ${m.note}</span>`:''}
      </div>
      <button class="btn btn-red btn-sm" onclick="D.meetings.splice(${i},1);renderMeetings();saveAll()">✕</button>
    </div>`).join('');
}
function addMeeting() {
  const name=$('mtg-name').value.trim(); if(!name){toast(t('err-name'),true);return;}
  D.meetings.push({name,time:$('mtg-time').value,day:$('mtg-day').value,note:$('mtg-note').value});
  $('mtg-name').value=''; $('mtg-note').value=''; renderMeetings(); saveAll(); toast(t('toast-meeting-added'));
}

function renderIntlChecklist() {
  const checks = {
    vi:[
      {done:false,text:'Thống nhất ngôn ngữ làm việc (EN hoặc VI+EN)'},
      {done:false,text:'Kiểm tra múi giờ — lịch họp phải phù hợp cả 2 bên'},
      {done:false,text:'Tất cả SOP có bản dịch tiếng Anh'},
      {done:false,text:'Change log có cột tiếng Anh cho team TQ'},
      {done:false,text:'Dashboard dashboard được chia sẻ qua link GitHub Pages'},
      {done:false,text:'Thiết lập kênh WeChat/Teams cho team TQ'},
      {done:false,text:'Báo cáo tuần có format EN hoặc ZH song song'},
      {done:false,text:'Phân quyền RACI được dịch sang tiếng Anh'},
    ],
    en:[
      {done:false,text:'Agree on working language (EN or bilingual)'},
      {done:false,text:'Check time zones — schedule meetings for both sides'},
      {done:false,text:'All SOPs have English translation'},
      {done:false,text:'Change log has English column for CN team'},
      {done:false,text:'Dashboard shared via GitHub Pages link'},
      {done:false,text:'WeChat/Teams channel set up for CN team'},
      {done:false,text:'Weekly report in EN or ZH (bilingual)'},
      {done:false,text:'RACI matrix translated to English'},
    ],
    zh:[
      {done:false,text:'确认工作语言（英语或双语）'},
      {done:false,text:'检查时区 — 安排双方都方便的会议'},
      {done:false,text:'所有SOP有英文翻译'},
      {done:false,text:'变更日志有英文列供中国团队使用'},
      {done:false,text:'通过GitHub Pages链接共享仪表板'},
      {done:false,text:'为中国团队建立微信/Teams频道'},
      {done:false,text:'周报使用英文或中文（双语）'},
      {done:false,text:'RACI矩阵翻译成英文'},
    ]
  };
  const tips = {
    vi:['✅ Dùng số liệu cụ thể — tránh mơ hồ trong giao tiếp kỹ thuật','✅ Confirm bằng văn bản sau mỗi cuộc họp — tránh "hiểu lầm văn hóa"','✅ Tôn trọng thứ bậc — team TQ thường làm theo cấp trên','⚠️ WeChat > Email trong giao tiếp với đối tác TQ','⚠️ Tránh thảo luận nhạy cảm trong group — chuyển sang 1-1','💡 Dùng hình ảnh/diagram thay lời nói khi rào cản ngôn ngữ'],
    en:['✅ Use specific numbers — avoid vague language in technical comms','✅ Confirm in writing after every meeting','✅ Respect hierarchy — CN teams follow their manager closely','⚠️ WeChat > Email when communicating with CN partners','⚠️ Avoid sensitive topics in group chats','💡 Use diagrams/visuals when language barriers exist'],
    zh:['✅ 使用具体数字 — 避免技术沟通中的模糊表达','✅ 每次会议后书面确认','✅ 尊重层级 — 越南团队通常遵循管理层决策','⚠️ 微信 > 邮件与越南合作伙伴沟通','⚠️ 避免在群聊中讨论敏感话题','💡 语言障碍时使用图表/视觉效果']
  };
  const cl = checks[lang]||checks.vi;
  const tp = tips[lang]||tips.vi;
  $('intl-checklist').innerHTML = cl.map((c,i) => `
    <label style="display:flex;gap:8px;align-items:flex-start;margin-bottom:7px;cursor:pointer;font-size:12px">
      <input type="checkbox" ${c.done?'checked':''} onchange="toggleCheck(${i},this.checked)" style="margin-top:2px;width:auto;flex-shrink:0">
      <span style="color:${c.done?'#aaa':'#1A1A1A'};text-decoration:${c.done?'line-through':'none'}">${c.text}</span>
    </label>`).join('');
  $('intl-tips').innerHTML = tp.map(t => `<div style="font-size:11px;margin-bottom:6px;line-height:1.5">${t}</div>`).join('');
}
window.toggleCheck = function(i, val) {
  const checks_key = `intl_checks_${lang}`;
  // just visual for now
};

// ── FINANCE ──────────────────────────────────────────────────
function populateFinSelect() {
  $('fin-sel').innerHTML=D.sites.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  renderFinance();
}
function renderFinance() {
  const s=D.sites.find(x=>x.id===$('fin-sel').value); if(!s)return;
  $('f-budget').value=s.budget||''; $('f-actual').value=s.actual||'';
  $('f-over').value=s.over||''; $('f-rev').value=s.rev||''; calcFinance();
}
function calcFinance() {
  const b=+$('f-budget').value||0,a=+$('f-actual').value||0,o=+$('f-over').value||0,r=+$('f-rev').value||0;
  if(!b){$('fin-result').innerHTML='<div class="empty">Enter budget to calculate</div>';return;}
  const up=pct(a,b),op=b>0?((o/b)*100).toFixed(1):0,rem=b-a,pb=r>0?Math.ceil(b/r):'—';
  const uc=up>=90?'#C0392B':up>=70?'#B86B00':'#0D6E4A',oc=+op>5?'#C0392B':'#B86B00';
  $('fin-result').innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
    <div style="text-align:center;padding:10px;background:#F5F5F2;border-radius:8px"><div style="font-size:20px;font-weight:700;color:${uc}">${up}%</div><div style="font-size:10px;color:#6B6B6B">${t('spent-budget')}</div><div class="prog" style="margin-top:4px"><div class="pf" style="width:${up}%;background:${uc}"></div></div></div>
    <div style="text-align:center;padding:10px;background:${+op>5?'#FCEBEB':'#FFF3DC'};border-radius:8px"><div style="font-size:20px;font-weight:700;color:${oc}">${op}%</div><div style="font-size:10px;color:#6B6B6B">${t('overrun')}</div>${+op>5?'<div style="font-size:10px;color:#C0392B">⚠️ Exceeds 5%</div>':''}</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    <div style="padding:8px;background:#EEF2FF;border-radius:7px;text-align:center"><div style="font-size:14px;font-weight:700;color:#3D5CF5">${fmt(rem)} tr</div><div style="font-size:10px;color:#6B6B6B">${t('remaining')}</div></div>
    <div style="padding:8px;background:#E0F8EE;border-radius:7px;text-align:center"><div style="font-size:14px;font-weight:700;color:#0D6E4A">${pb}${pb!=='—'?' mo':''}</div><div style="font-size:10px;color:#6B6B6B">${t('payback')}</div></div>
  </div>`;
}
function saveFinance() {
  const id=$('fin-sel').value; const i=D.sites.findIndex(s=>s.id===id); if(i<0)return;
  D.sites[i].budget=+$('f-budget').value||0; D.sites[i].actual=+$('f-actual').value||0;
  D.sites[i].over=+$('f-over').value||0; D.sites[i].rev=+$('f-rev').value||0;
  refreshAll(); saveAll(); toast(t('toast-fin-saved'));
}
function calcP3() {
  const pool=+$('p3-pool').value||0,cdtP=+$('p3-cdt').value/100,teamP=+$('p3-team').value/100;
  if(!pool){$('p3-result').innerHTML='<div class="empty">Enter pool to calculate</div>';return;}
  const cdt=Math.round(pool*cdtP),team=Math.round(pool*teamP);
  const shares=[{n:'👤 PMO',p:.4,c:'#3D5CF5'},{n:'🔧 QL TC',p:.2,c:'#0D6E4A'},{n:'📐 QL TK',p:.2,c:'#B86B00'},{n:'⚙️ QL VH',p:.2,c:'#1A2F5A'}];
  $('p3-result').innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
    <div style="text-align:center;padding:10px;background:#FCEBEB;border-radius:8px"><div style="font-size:18px;font-weight:700;color:#C0392B">${fmt(cdt)} tr</div><div style="font-size:10px;color:#6B6B6B">CĐT (${Math.round(cdtP*100)}%)</div></div>
    <div style="text-align:center;padding:10px;background:#E0F8EE;border-radius:8px;border:2px solid #0D6E4A"><div style="font-size:18px;font-weight:700;color:#0D6E4A">${fmt(team)} tr</div><div style="font-size:10px;color:#6B6B6B">Team (${Math.round(teamP*100)}%)</div></div>
  </div>
  ${shares.map(s=>`<div style="display:flex;align-items:center;gap:9px;margin-bottom:6px"><span style="font-size:12px;flex:1">${s.n}</span><div style="width:80px;height:5px;background:#EBEBEB;border-radius:3px;overflow:hidden"><div style="width:${s.p*100}%;height:100%;background:${s.c};border-radius:3px"></div></div><span style="font-size:12px;font-weight:700;color:${s.c};width:70px;text-align:right">${fmt(Math.round(team*s.p))} tr</span></div>`).join('')}`;
}

// ── OKR ──────────────────────────────────────────────────────
function renderOKR() {
  let html='',last='';
  D.okrs.forEach((o,i)=>{
    if(o.obj!==last){last=o.obj;html+=`<div style="font-size:12px;font-weight:700;color:#1A2F5A;margin:12px 0 6px;padding:6px 10px;background:#EEF2FF;border-radius:7px">${o.obj}</div>`;}
    const p=o.target>0?Math.min(100,Math.round(o.actual/o.target*100)):0;
    const col=p>=70?'#0D6E4A':p>=40?'#B86B00':'#C0392B';
    html+=`<div class="card" style="margin-bottom:7px;padding:9px 13px">
      <div style="display:flex;align-items:flex-start;gap:8px">
        <div style="flex:1">
          <div style="font-size:12px;font-weight:500;margin-bottom:5px">${o.kr}</div>
          <div style="display:flex;align-items:center;gap:8px"><div style="flex:1;height:6px;background:#EBEBEB;border-radius:3px;overflow:hidden"><div style="width:${p}%;height:100%;background:${col};border-radius:3px"></div></div>
          <span style="font-size:11px;font-weight:700;color:${col};min-width:30px">${p}%</span></div>
          <div style="margin-top:3px;font-size:10px;color:#6B6B6B">${o.owner} · <span style="background:#EEF2FF;color:#3D5CF5;padding:1px 6px;border-radius:3px;font-weight:600">${o.truc}</span></div>
        </div>
        <div style="display:flex;gap:5px;align-items:center;flex-shrink:0">
          <div style="text-align:center"><div style="font-size:9px;color:#6B6B6B">${t('actual-lbl')}</div><input type="number" value="${o.actual}" min="0" style="width:58px;text-align:center;font-weight:700;font-size:12px;border:1px solid #E2E2DC;border-radius:5px;padding:3px" oninput="D.okrs[${i}].actual=+this.value;renderOKR()"></div>
          <div style="text-align:center"><div style="font-size:9px;color:#6B6B6B">${t('target-lbl')}</div><input type="number" value="${o.target}" min="0" style="width:58px;text-align:center;font-size:12px;border:1px solid #E2E2DC;border-radius:5px;padding:3px" oninput="D.okrs[${i}].target=+this.value;renderOKR()"></div>
          <div style="font-size:10px;color:#6B6B6B">${o.unit}</div>
          <button class="btn btn-red btn-sm" onclick="D.okrs.splice(${i},1);renderOKR()">✕</button>
        </div>
      </div>
    </div>`;
  });
  $('okr-list').innerHTML=html||`<div class="empty">${t('no-kr')}</div>`;
}
function openAddOKR(){openModal('modal-okr');setTimeout(()=>$('okr-obj').focus(),100);}
function saveOKR(){
  const kr=$('okr-kr').value.trim();if(!kr){toast(t('err-kr'),true);return;}
  D.okrs.push({obj:$('okr-obj').value.trim()||'O — New',kr,truc:$('okr-truc').value,owner:$('okr-owner').value||'PMO',target:+$('okr-target').value||1,unit:$('okr-unit').value||'',actual:0});
  closeModal('modal-okr');renderOKR();toast(t('toast-kr-added'));
}
function resetOKR(){if(!confirm(t('confirm-reset')))return;D.okrs.forEach(o=>o.actual=0);renderOKR();}

// ── CHANGE LOG ────────────────────────────────────────────────
function populateChangeSel(){$('ch-site').innerHTML='<option value="">Select site...</option>'+D.sites.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');}
function addChange(){
  const siteId=$('ch-site').value,content=$('ch-content').value.trim();
  if(!siteId||!content){toast(t('err-site-content'),true);return;}
  const site=D.sites.find(s=>s.id===siteId);
  D.changes.unshift({id:'CHG-'+String(D.changeCounter++).padStart(3,'0'),siteId,site:site?.name||'',content,truc:$('ch-truc').value,level:$('ch-level').value,cost:+$('ch-cost').value||0,time:+$('ch-time').value||0,owner:$('ch-owner').value||'PMO',status:'Pending',date:today()});
  renderChanges();renderOverview();
  $('ch-content').value='';$('ch-cost').value='';$('ch-time').value='';$('ch-owner').value='';
  toast('Logged '+D.changes[0].id+' ✓');saveAll();
}
function renderChanges(){
  const pend=D.changes.filter(c=>c.status==='Pending').length;
  $('change-stats').textContent=`${D.changes.length} total · ${pend} pending`;
  if(!D.changes.length){$('change-table').innerHTML='';$('change-empty').style.display='block';$('change-empty').textContent=t('no-changes');return;}
  $('change-empty').style.display='none';
  const SC={Pending:'p-warn',Approved:'p-ok',Rejected:'p-err',Done:'p-ok'};
  $('change-table').innerHTML=D.changes.map((c,i)=>`<tr>
    <td style="font-weight:700;color:#3D5CF5">${c.id}</td>
    <td style="font-size:11px">${c.site}</td>
    <td style="max-width:160px;font-size:11px">${c.content}</td>
    <td><span class="pill p-c" style="font-size:9px">${c.truc||'—'}</span></td>
    <td style="font-size:11px">${c.cost?c.cost+'tr':'—'}</td>
    <td style="font-size:10px">${c.level?.split(' ')[0]||'L1'}</td>
    <td style="font-size:11px">${c.owner}</td>
    <td style="font-size:10px;color:#6B6B6B">${c.date}</td>
    <td><select style="font-size:10px" onchange="D.changes[${i}].status=this.value;renderChanges();renderOverview()">
      ${['Pending','Approved','Rejected','Done'].map(s=>`<option${s===c.status?' selected':''}>${s}</option>`).join('')}
    </select></td>
    <td><button class="btn btn-red btn-sm" style="padding:2px 7px" onclick="D.changes.splice(${i},1);renderChanges();renderOverview()">✕</button></td>
  </tr>`).join('');
}

// ── REPORTS ───────────────────────────────────────────────────
function populateRptSel(){$('rpt-site').innerHTML='<option value="">All sites</option>'+D.sites.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');}

function buildReport(type, siteId, period, sender, note) {
  const sites=siteId?D.sites.filter(s=>s.id===siteId):D.sites;
  const changes=siteId?D.changes.filter(c=>c.siteId===siteId):D.changes;
  const keys=['be1','be2','be3','be4','be5','be6','be7','be8'];
  const healthAvg=keys.reduce((a,k)=>a+D.health[k],0)/8;
  const pending=changes.filter(c=>c.status==='Pending').length;
  const totalSop=sites.reduce((a,s)=>a+(+s.sop||0),0);
  const okrPct=D.okrs.length?Math.round(D.okrs.reduce((a,o)=>a+(o.target>0?Math.min(100,o.actual/o.target*100):0),0)/D.okrs.length):0;
  const intlCount=D.members.length;

  if(type==='intl') {
    // English report for international team
    return `<h2>PROJECT OPERATIONS REPORT</h2>
<p><strong>Period:</strong> ${period||today()} | <strong>From:</strong> ${sender||'PMO'} | <strong>Date:</strong> ${today()}</p>
<h3>OVERVIEW</h3>
<table><tr><th>Metric</th><th>Value</th><th>Status</th></tr>
<tr><td>Active Sites</td><td>${sites.filter(s=>s.status==='active').length}/${sites.length}</td><td>—</td></tr>
<tr><td>8×5 Health Score</td><td>${Math.round(healthAvg*20)}/100</td><td>${healthAvg>=3.5?'✅':'⚠️'}</td></tr>
<tr><td>SOPs Completed</td><td>${totalSop}</td><td>${totalSop>=5?'✅':'⚠️'}</td></tr>
<tr><td>Pending Changes</td><td>${pending}</td><td>${pending===0?'✅':'⚠️'}</td></tr>
<tr><td>OKR Average</td><td>${okrPct}%</td><td>${okrPct>=70?'✅':okrPct>=40?'⚠️':'🔴'}</td></tr>
<tr><td>International Members</td><td>${intlCount}</td><td>—</td></tr>
</table>
<h3>SITE PROGRESS</h3>
<table><tr><th>Site</th><th>Country</th><th>Phase</th><th>Progress</th><th>Budget</th><th>Overrun</th><th>Occupancy</th></tr>
${sites.map(s=>{const op=s.budget>0?((+s.over||0)/(+s.budget)*100).toFixed(1):0;return`<tr><td><strong>${s.name}</strong></td><td>${s.country||'VN'}</td><td>${s.phase||'—'}</td><td>${s.pct||0}%</td><td>${fmt(s.budget)} tr</td><td style="color:${+op>5?'#C0392B':'inherit'}">${op}%</td><td>${s.fill||0}%</td></tr>`;}).join('')}
</table>
${changes.length?`<h3>RECENT CHANGES (last 5)</h3><table><tr><th>ID</th><th>Site</th><th>Description</th><th>Level</th><th>Status</th></tr>${changes.slice(0,5).map(c=>`<tr><td>${c.id}</td><td>${c.site}</td><td>${c.content}</td><td>${c.level?.split(' ')[0]||'L1'}</td><td>${c.status}</td></tr>`).join('')}</table>`:''}
${note?`<h3>NOTES</h3><p>${note}</p>`:''}
<p style="color:#aaa;font-size:10px;margin-top:20px">— Auto-generated · BIM × 8×5 × Tgq Ops Dashboard · ${today()} —</p>`;
  }

  // Vietnamese report
  return `<h2>BÁO CÁO VẬN HÀNH DỰ ÁN</h2>
<p><strong>Kỳ:</strong> ${period||today()} | <strong>Người lập:</strong> ${sender||'PMO'} | <strong>Ngày:</strong> ${today()}</p>
<h3>I. TỔNG QUAN</h3>
<table><tr><th>Chỉ tiêu</th><th>Giá trị</th><th>Đánh giá</th></tr>
<tr><td>Site đang chạy</td><td>${sites.filter(s=>s.status==='active').length}/${sites.length}</td><td>—</td></tr>
<tr><td>Health Score 8×5</td><td>${Math.round(healthAvg*20)}/100</td><td>${healthAvg>=3.5?'✅':'⚠️'}</td></tr>
<tr><td>SOP hoàn chỉnh</td><td>${totalSop}</td><td>${totalSop>=5?'✅ Đạt':'⚠️ Chưa đạt'}</td></tr>
<tr><td>Change pending</td><td>${pending}</td><td>${pending===0?'✅':'⚠️ Cần duyệt'}</td></tr>
<tr><td>OKR trung bình</td><td>${okrPct}%</td><td>${okrPct>=70?'✅':okrPct>=40?'⚠️':'🔴'}</td></tr>
</table>
<h3>II. TIẾN ĐỘ SITE</h3>
<table><tr><th>Site</th><th>Giai đoạn</th><th>Tiến độ</th><th>Phát sinh</th><th>SOP</th><th>Lấp đầy</th></tr>
${sites.map(s=>{const op=s.budget>0?((+s.over||0)/(+s.budget)*100).toFixed(1):0;return`<tr><td><strong>${s.name}</strong></td><td>${s.phase||'—'}</td><td>${s.pct||0}%</td><td>${op}%</td><td>${s.sop||0}/${s.sopT||5}</td><td>${s.fill||0}%</td></tr>`;}).join('')}
</table>
${type==='monthly'||type==='okr'?`<h3>III. OKR</h3><table><tr><th>KR</th><th>Trục</th><th>Target</th><th>Actual</th><th>%</th></tr>${D.okrs.map(o=>{const p=o.target>0?Math.min(100,Math.round(o.actual/o.target*100)):0;return`<tr><td style="font-size:10px">${o.kr}</td><td>${o.truc}</td><td>${o.target} ${o.unit}</td><td>${o.actual}</td><td style="color:${p>=70?'#0D6E4A':p>=40?'#B86B00':'#C0392B'};font-weight:700">${p}%</td></tr>`;}).join('')}</table>`:''}
${changes.length?`<h3>IV. CHANGE LOG (5 gần nhất)</h3><table><tr><th>ID</th><th>Site</th><th>Nội dung</th><th>Level</th><th>Status</th></tr>${changes.slice(0,5).map(c=>`<tr><td>${c.id}</td><td>${c.site}</td><td style="font-size:10px">${c.content}</td><td>${c.level?.split(' ')[0]||'L1'}</td><td>${c.status}</td></tr>`).join('')}</table>`:''}
${note?`<h3>GHI CHÚ</h3><p>${note}</p>`:''}
<p style="color:#aaa;font-size:10px;margin-top:20px">— Tạo tự động từ Ops Dashboard · BIM × 8×5 · ${today()} —</p>`;
}

function renderReportPreview() {
  const html = buildReport($('rpt-type').value,$('rpt-site').value,$('rpt-period').value,$('rpt-sender').value,$('rpt-note').value);
  $('rpt-preview').innerHTML = `<div style="font-size:11px;line-height:1.6">${html.replace(/<h[23]/g,'<div style="margin:10px 0 5px;font-weight:700;color:#1A2F5A">').replace(/<\/h[23]>/g,'</div>').replace(/<table>/g,'<table style="width:100%;border-collapse:collapse;margin-bottom:8px">').replace(/<th>/g,'<th style="background:#1A2F5A;color:#fff;padding:4px 6px;text-align:left;font-size:10px">').replace(/<td>/g,'<td style="padding:4px 6px;border-bottom:1px solid #F5F5F2;font-size:10px">').replace(/<td style="color/g,'<td style="font-size:10px;color')}</div>`;
}

function openExport(){renderReportPreview();sw('report',document.querySelectorAll('.tab')[6]);}

function printReport(){
  const html=buildReport($('rpt-type').value,$('rpt-site').value,$('rpt-period').value,$('rpt-sender').value,$('rpt-note').value);
  const w=window.open('','_blank','width=900,height=700');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ops Report</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;padding:30px;max-width:800px;margin:0 auto}h2{font-size:18px;color:#1A2F5A;border-bottom:3px solid #1A2F5A;padding-bottom:8px;margin-bottom:16px}h3{font-size:14px;color:#3D5CF5;margin:16px 0 8px}table{width:100%;border-collapse:collapse;margin-bottom:12px;font-size:11px}th{background:#1A2F5A;color:#fff;padding:6px 8px;text-align:left}td{padding:5px 8px;border-bottom:1px solid #E2E2DC}p{margin-bottom:8px;line-height:1.6}@media print{.no-print{display:none}}</style></head><body>
  <div class="no-print" style="margin-bottom:16px;padding:10px;background:#EEF2FF;border-radius:6px;display:flex;justify-content:space-between"><span style="font-size:12px;color:#3D5CF5;font-weight:600">Press Ctrl+P to print / save PDF</span><button onclick="window.print()" style="background:#3D5CF5;color:#fff;border:none;padding:7px 16px;border-radius:6px;cursor:pointer">🖨️ Print / Save PDF</button></div>
  ${html}</body></html>`);
  w.document.close();
}

function buildEmailContent() {
  const sites=D.sites.filter(s=>s.status==='active');
  const pending=D.changes.filter(c=>c.status==='Pending').length;
  const totalSop=D.sites.reduce((a,s)=>a+(+s.sop||0),0);
  const period=$('rpt-period').value||today();
  const sender=$('rpt-sender').value||'PMO — Quản lý Vận hành';
  const type=$('rpt-type').value;
  if(type==='intl') {
    $('email-subj').value=`[Ops Report] ${period} · ${sites.length} active sites`;
    $('email-body').textContent=`Dear Team,\n\nPlease find the operations summary for ${period}.\n\n━━━ OVERVIEW ━━━\n🏢 Active sites: ${sites.length}\n⚡ 8×5 Health: ${Math.round(D.okrs.length?50:0)}/100\n📋 SOPs done: ${totalSop}\n${pending>0?`⚠️ ${pending} changes pending`:'✅ No pending changes'}\n\n━━━ SITE PROGRESS ━━━\n${sites.map(s=>`${s.pct>=70?'🟢':s.pct>=40?'🟡':'🔴'} ${s.name} — ${s.pct||0}% · SOP ${s.sop||0}/${s.sopT||5} · Occupancy ${s.fill||0}%`).join('\n')}\n\n━━━ ACTION ITEMS ━━━\n${D.okrs.filter(o=>o.target>0&&o.actual/o.target<0.4).slice(0,3).map(o=>`⚠️ ${o.kr.split(':')[0]} — ${Math.round(o.actual/o.target*100)}%`).join('\n')||'✅ All KRs on track'}\n\nBest regards,\n${sender}\n${today()}`;
  } else {
    $('email-subj').value=`[Báo cáo vận hành] ${period} · ${sites.length} site đang chạy`;
    $('email-body').textContent=`Kính gửi Chủ đầu tư / T2.5,\n\nBáo cáo vận hành kỳ ${period}.\n\n━━━ TỔNG QUAN ━━━\n🏢 Site đang chạy: ${sites.length}\n📋 SOP hoàn chỉnh: ${totalSop}\n${pending>0?`⚠️ ${pending} Change đang Pending`:'✅ Không có Change pending'}\n\n━━━ TIẾN ĐỘ SITE ━━━\n${sites.map(s=>`${s.pct>=70?'🟢':s.pct>=40?'🟡':'🔴'} ${s.name}: ${s.pct||0}% tiến độ · SOP ${s.sop||0}/${s.sopT||5} · Lấp đầy ${s.fill||0}%`).join('\n')}\n\n━━━ ACTION TUẦN TỚI ━━━\n• Tiếp tục hoàn thiện SOP site T23\n• Review milestone với Rubix\n• Cập nhật hồ sơ pháp lý BE7\n\nTrân trọng,\n${sender}\n${today()}`;
  }
}

function openEmail(){buildEmailContent();openModal('modal-email');}

function openSlack(){
  const sites=D.sites.filter(s=>s.status==='active');
  const pending=D.changes.filter(c=>c.status==='Pending').length;
  const period=$('rpt-period').value||today();
  const type=$('rpt-type').value;
  if(type==='intl'){
    $('slack-body').textContent=`📊 *OPS REPORT* · ${period}\n━━━━━━━━━━━━━━━━\n\n*SITES*\n${sites.map(s=>`${s.pct>=70?'🟢':s.pct>=40?'🟡':'🔴'} *${s.name}* — ${s.pct||0}% · SOP ${s.sop||0}/${s.sopT||5}`).join('\n')}\n\n*STATUS*\n${pending>0?`⚠️ ${pending} changes pending`:'✅ No pending changes'}\n\n_Auto-generated · ${today()}_`;
  } else {
    $('slack-body').textContent=`📊 *BÁO CÁO VẬN HÀNH* · ${period}\n━━━━━━━━━━━━━━━━\n\n*TIẾN ĐỘ SITE*\n${sites.map(s=>`${s.pct>=70?'🟢':s.pct>=40?'🟡':'🔴'} *${s.name}* — ${s.pct||0}% · SOP ${s.sop||0}/${s.sopT||5}`).join('\n')}\n\n${pending>0?`⚠️ ${pending} Change Pending — cần duyệt ngay`:'✅ Không có Change pending'}\n\n_Tự động · ${today()}_`;
  }
  openModal('modal-slack');
}

function openWechat(){
  const sites=D.sites.filter(s=>s.status==='active');
  const pending=D.changes.filter(c=>c.status==='Pending').length;
  const period=$('rpt-period').value||today();
  const type=$('rpt-type').value;
  if(type==='intl'||type==='weekly'){
    $('wechat-body').textContent=`【项目进度报告】${period}\n\n📍 在建项目：${sites.length}个\n\n${sites.map(s=>`${s.pct>=70?'🟢':s.pct>=40?'🟡':'🔴'} ${s.name}\n   进度：${s.pct||0}% | SOP：${s.sop||0}/${s.sopT||5}\n   国家：${s.country||'越南'}`).join('\n\n')}\n\n${pending>0?`⚠️ ${pending}项变更待审批`:'✅ 无待审变更'}\n\n_${today()} · OPS Dashboard_`;
  } else {
    $('wechat-body').textContent=`【Báo cáo vận hành】${period}\n\n${sites.map(s=>`${s.pct>=70?'✅':s.pct>=40?'⚠️':'🔴'} ${s.name}: ${s.pct||0}%`).join('\n')}\n${pending>0?`\n⚠️ ${pending} Change pending`:''}`;
  }
  openModal('modal-wechat');
}

// ── INIT ─────────────────────────────────────────────────────
function refreshAll(){
  renderOverview();renderSiteList();renderOKR();renderChanges();
  populateFinSelect();populateChangeSel();populateRptSel();
  if(document.getElementById('panel-ma')?.classList.contains('active')) renderMa();
}

document.querySelectorAll('.overlay').forEach(o=>{o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');});});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.overlay.open').forEach(o=>o.classList.remove('open'));});
window.addEventListener('beforeunload', () => {
  // Lưu trước khi đóng tab
  if (_pendingSave || _syncStatus !== 'online') {
    localStorage.setItem(LS_KEY, JSON.stringify(D));
  }
});

// Retry pending save khi có mạng trở lại
window.addEventListener('online', () => {
  if (_pendingSave) { _pendingSave = false; pushToSheets(); }
});

// Auto-refresh mỗi 5 phút (để sync khi team TQ cập nhật)
setInterval(() => {
  if (document.visibilityState === 'visible') loadFromSheets();
}, 5 * 60 * 1000);

// Khởi động: load từ Sheets trước
// ═══════════════════════════════════════════════════════════════
// LỊCH THANH TOÁN
// ═══════════════════════════════════════════════════════════════

const PAY_TYPES = {
  'thue':'🏢 Thuê MB', 'nha-thau':'🔨 Nhà thầu',
  'dich-vu':'🧹 Dịch vụ', 'dien-nuoc':'💡 Điện/Nước',
  'luong':'👥 Nhân sự', 'khac':'📦 Khác',
};

function getDaysLeft(due) {
  if (!due) return null;
  return Math.ceil((new Date(due) - new Date().setHours(0,0,0,0)) / 86400000);
}

function payStatus(p) {
  if (p.status === 'paid') return { label:'✅ Đã TT', color:'#0D6E4A', bg:'#E0F8EE' };
  const d = getDaysLeft(p.due);
  if (d === null) return { label:'⏳ Chưa TT', color:'#6B6B6B', bg:'#F5F5F2' };
  if (d < 0)  return { label:`🔴 Quá hạn ${Math.abs(d)}d`, color:'#C0392B', bg:'#FCEBEB' };
  if (d <= 3) return { label:`🟠 Còn ${d}d`, color:'#C0392B', bg:'#FCEBEB' };
  if (d <= 7) return { label:`🟡 Còn ${d}d`, color:'#B86B00', bg:'#FFF3DC' };
  return { label:`⏳ Còn ${d}d`, color:'#3D5CF5', bg:'#EEF2FF' };
}

function setPayFilter(f, btn) {
  D.payFilter = f;
  document.querySelectorAll('#payment-filters .filter-chip, #panel-overview .filter-chip').forEach(b => {
    if (b.closest('#payment-list') || b.onclick?.toString().includes('setPayFilter')) b.classList.remove('active');
  });
  // simpler: re-query by parent
  btn.parentElement.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPayments();
}

function renderPayments() {
  const now = new Date().setHours(0,0,0,0);
  let list = [...D.payments].sort((a,b) => {
    if (a.status==='paid' && b.status!=='paid') return 1;
    if (b.status==='paid' && a.status!=='paid') return -1;
    return new Date(a.due||'9999') - new Date(b.due||'9999');
  });

  if (D.payFilter === 'upcoming') list = list.filter(p => p.status!=='paid' && getDaysLeft(p.due)>=0 && getDaysLeft(p.due)<=14);
  else if (D.payFilter === 'overdue') list = list.filter(p => p.status!=='paid' && getDaysLeft(p.due)<0);
  else if (D.payFilter === 'paid') list = list.filter(p => p.status==='paid');

  // Badge tổng quá hạn lên KPI
  const overdue = D.payments.filter(p => p.status!=='paid' && getDaysLeft(p.due)<0).length;
  const soonDue = D.payments.filter(p => p.status!=='paid' && getDaysLeft(p.due)>=0 && getDaysLeft(p.due)<=3).length;

  if (!list.length) {
    $('payment-list').innerHTML = `<div style="font-size:11px;color:#aaa;text-align:center;padding:20px">Chưa có lịch thanh toán nào.</div>`;
    return;
  }

  $('payment-list').innerHTML = list.map(p => {
    const st = payStatus(p);
    const site = D.sites.find(s=>s.id===p.siteId);
    const isPaid = p.status==='paid';
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 14px;border-bottom:1px solid #F5F5F2;${isPaid?'opacity:0.55':''}">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:#1A1A1A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</div>
        <div style="font-size:10px;color:#6B6B6B;margin-top:2px">
          ${site?`<span style="color:#3D5CF5">${site.name}</span> · `:''}
          ${PAY_TYPES[p.type]||p.type||''}
          ${p.recur==='monthly'?' · 🔁 Hàng tháng':p.recur==='quarterly'?' · 🔁 Hàng quý':''}
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:12px;font-weight:700;color:#1A2F5A">${p.amount?Number(p.amount).toLocaleString('vi-VN')+' tr':''}</div>
        <div style="font-size:10px;margin-top:2px"><span style="background:${st.bg};color:${st.color};padding:1px 7px;border-radius:10px;font-weight:600">${st.label}</span></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;flex-shrink:0">
        ${!isPaid?`<button onclick="markPaid('${p.id}')" style="font-size:10px;padding:2px 6px;background:#E0F8EE;color:#0D6E4A;border:1px solid #0D6E4A;border-radius:4px;cursor:pointer">✓ TT</button>`:''}
        <button onclick="openEditPayment('${p.id}')" style="font-size:10px;padding:2px 6px;background:#F5F5F2;color:#3D5CF5;border:1px solid #ddd;border-radius:4px;cursor:pointer">✏️</button>
      </div>
    </div>`;
  }).join('');
}

function markPaid(id) {
  const p = D.payments.find(x=>x.id===id); if(!p) return;
  p.status = 'paid'; p.paidAt = today();
  // Nếu lặp lại → tự tạo kỳ tiếp
  if (p.recur === 'monthly' || p.recur === 'quarterly') {
    const next = new Date(p.due);
    if (p.recur === 'monthly') next.setMonth(next.getMonth()+1);
    else next.setMonth(next.getMonth()+3);
    D.payments.push({...p, id:'PAY-'+String(D.payCounter++).padStart(3,'0'),
      status:'unpaid', due:next.toISOString().split('T')[0], paidAt:''});
  }
  renderPayments(); saveAll(); toast('✅ Đã đánh dấu thanh toán');
}

function populatePaySiteSelect(selId) {
  const el = $(selId); if(!el) return;
  el.innerHTML = '<option value="">— Chung —</option>' +
    D.sites.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
}

function openAddPayment() {
  D.editingPayId = null;
  $('modal-pay-title').textContent = 'Thêm lịch thanh toán';
  $('pay-del-btn').style.display = 'none';
  ['pay-name','pay-note'].forEach(id=>$(id).value='');
  $('pay-amount').value=''; $('pay-type').value='thue';
  $('pay-status').value='unpaid'; $('pay-recur').value='';
  $('pay-due').value = '';
  populatePaySiteSelect('pay-site');
  openModal('modal-payment');
}

function openEditPayment(id) {
  const p = D.payments.find(x=>x.id===id); if(!p) return;
  D.editingPayId = id;
  $('modal-pay-title').textContent = 'Sửa: '+p.name;
  $('pay-del-btn').style.display = 'inline-block';
  populatePaySiteSelect('pay-site');
  $('pay-name').value = p.name||''; $('pay-type').value = p.type||'thue';
  $('pay-amount').value = p.amount||''; $('pay-due').value = p.due||'';
  $('pay-recur').value = p.recur||''; $('pay-status').value = p.status||'unpaid';
  $('pay-site').value = p.siteId||''; $('pay-note').value = p.note||'';
  openModal('modal-payment');
}

function savePayment() {
  const name = $('pay-name').value.trim();
  if (!name) { toast('Nhập nội dung thanh toán', true); return; }
  const entry = {
    id: D.editingPayId || ('PAY-'+String(D.payCounter++).padStart(3,'0')),
    name, type:$('pay-type').value, amount:+$('pay-amount').value||0,
    due:$('pay-due').value, recur:$('pay-recur').value,
    status:$('pay-status').value, siteId:$('pay-site').value,
    note:$('pay-note').value, updatedAt:today(),
  };
  if (D.editingPayId) { const i=D.payments.findIndex(x=>x.id===D.editingPayId); if(i>=0) D.payments[i]=entry; }
  else D.payments.push(entry);
  closeModal('modal-payment'); renderPayments(); saveAll();
  toast((D.editingPayId?'Đã cập nhật':'Đã thêm')+': '+name);
}

function deletePayFromModal() {
  if(!D.editingPayId) return;
  const p = D.payments.find(x=>x.id===D.editingPayId);
  if(!p||!confirm(`Xóa "${p.name}"?`)) return;
  D.payments = D.payments.filter(x=>x.id!==D.editingPayId);
  closeModal('modal-payment'); renderPayments(); saveAll(); toast('Đã xóa '+p.name);
}

// ═══════════════════════════════════════════════════════════════
// NHẮC VIỆC PMO
// ═══════════════════════════════════════════════════════════════

const PRIORITY_CFG = {
  high: { label:'🔴 Cao', color:'#C0392B', bg:'#FCEBEB' },
  med:  { label:'🟡 Vừa', color:'#B86B00', bg:'#FFF3DC' },
  low:  { label:'🟢 Thấp', color:'#0D6E4A', bg:'#E0F8EE' },
};

function setTodoFilter(f, btn) {
  D.todoFilter = f;
  btn.parentElement.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTodos();
}

function renderTodos() {
  const todayStr = new Date().toISOString().split('T')[0];
  const weekEnd = new Date(); weekEnd.setDate(weekEnd.getDate()+7);
  const weekStr = weekEnd.toISOString().split('T')[0];

  let list = [...D.todos].sort((a,b) => {
    if (a.done && !b.done) return 1; if (!a.done && b.done) return -1;
    const pa = {high:0,med:1,low:2}[a.priority]??1;
    const pb = {high:0,med:1,low:2}[b.priority]??1;
    if (pa!==pb) return pa-pb;
    return (a.due||'9999').localeCompare(b.due||'9999');
  });

  if (D.todoFilter==='today') list = list.filter(t => !t.done && t.due===todayStr);
  else if (D.todoFilter==='week') list = list.filter(t => !t.done && t.due && t.due<=weekStr);
  else if (D.todoFilter==='done') list = list.filter(t => t.done);
  else list = list.filter(t => !t.done); // 'all' = chưa xong

  if (!list.length) {
    $('todo-list').innerHTML = `<div style="font-size:11px;color:#aaa;text-align:center;padding:20px">${D.todoFilter==='done'?'Chưa có việc nào hoàn thành.':'Không có việc nào. Tốt lắm! 🎉'}</div>`;
    return;
  }

  $('todo-list').innerHTML = list.map(td => {
    const pr = PRIORITY_CFG[td.priority]||PRIORITY_CFG.med;
    const d = getDaysLeft(td.due);
    const dLabel = td.due ? (d<0?`🔴 Quá ${Math.abs(d)}d`:d===0?'🔴 Hôm nay':d===1?'🟠 Ngày mai':`${d}d nữa`) : '';
    const dColor = d!==null&&d<=0?'#C0392B':d<=1?'#B86B00':'#6B6B6B';
    const site = D.sites.find(s=>s.id===td.siteId);
    return `<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 14px;border-bottom:1px solid #F5F5F2;${td.done?'opacity:0.45':''}">
      <input type="checkbox" ${td.done?'checked':''} onchange="toggleTodo('${td.id}',this.checked)"
        style="margin-top:3px;width:15px;height:15px;cursor:pointer;accent-color:#3D5CF5">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:${td.done?'400':'600'};color:${td.done?'#aaa':'#1A1A1A'};${td.done?'text-decoration:line-through':''}">
          ${td.name}
        </div>
        <div style="font-size:10px;color:#6B6B6B;margin-top:2px;display:flex;gap:6px;flex-wrap:wrap">
          <span style="background:${pr.bg};color:${pr.color};padding:1px 6px;border-radius:8px;font-size:9px;font-weight:600">${pr.label}</span>
          ${dLabel?`<span style="color:${dColor};font-weight:600">${dLabel}</span>`:''}
          ${site?`<span style="color:#3D5CF5">${site.name}</span>`:''}
          ${td.recur?`<span>🔁 ${td.recur==='daily'?'Hàng ngày':td.recur==='weekly'?'Hàng tuần':'Hàng tháng'}</span>`:''}
          ${td.note?`<span style="color:#888">${td.note}</span>`:''}
        </div>
      </div>
      <button onclick="openEditTodo('${td.id}')" style="font-size:10px;padding:2px 6px;background:#F5F5F2;color:#3D5CF5;border:1px solid #ddd;border-radius:4px;cursor:pointer;flex-shrink:0">✏️</button>
    </div>`;
  }).join('');
}

function toggleTodo(id, checked) {
  const td = D.todos.find(x=>x.id===id); if(!td) return;
  td.done = checked; td.doneAt = checked ? today() : '';
  // Nếu lặp lại và tick xong → tạo kỳ tiếp
  if (checked && td.recur && td.due) {
    const next = new Date(td.due);
    if (td.recur==='daily') next.setDate(next.getDate()+1);
    else if (td.recur==='weekly') next.setDate(next.getDate()+7);
    else next.setMonth(next.getMonth()+1);
    const nextStr = next.toISOString().split('T')[0];
    if (!D.todos.find(x=>x.name===td.name&&x.due===nextStr)) {
      D.todos.push({...td, id:'TODO-'+String(D.todoCounter++).padStart(3,'0'),
        done:false, doneAt:'', due:nextStr});
    }
  }
  renderTodos(); renderAlerts(); saveAll();
}

function populateTodoSiteSelect(selId) {
  const el=$(selId); if(!el) return;
  el.innerHTML='<option value="">— Chung —</option>'+D.sites.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
}

function openAddTodo() {
  D.editingTodoId = null;
  $('modal-todo-title').textContent='Thêm nhắc việc';
  $('todo-del-btn').style.display='none';
  $('todo-name').value=''; $('todo-note').value=''; $('todo-due').value='';
  $('todo-priority').value='med'; $('todo-recur').value='';
  populateTodoSiteSelect('todo-site');
  openModal('modal-todo');
}

function openEditTodo(id) {
  const td=D.todos.find(x=>x.id===id); if(!td) return;
  D.editingTodoId=id;
  $('modal-todo-title').textContent='Sửa: '+td.name;
  $('todo-del-btn').style.display='inline-block';
  populateTodoSiteSelect('todo-site');
  $('todo-name').value=td.name||''; $('todo-priority').value=td.priority||'med';
  $('todo-due').value=td.due||''; $('todo-recur').value=td.recur||'';
  $('todo-site').value=td.siteId||''; $('todo-note').value=td.note||'';
  openModal('modal-todo');
}

function saveTodo() {
  const name=$('todo-name').value.trim();
  if(!name){toast('Nhập nội dung việc cần làm',true);return;}
  const entry={
    id:D.editingTodoId||('TODO-'+String(D.todoCounter++).padStart(3,'0')),
    name, priority:$('todo-priority').value, due:$('todo-due').value,
    recur:$('todo-recur').value, siteId:$('todo-site').value,
    note:$('todo-note').value, done:false, doneAt:'', updatedAt:today(),
  };
  if(D.editingTodoId){const i=D.todos.findIndex(x=>x.id===D.editingTodoId);if(i>=0)D.todos[i]=entry;}
  else D.todos.push(entry);
  closeModal('modal-todo'); renderTodos(); renderAlerts(); saveAll();
  toast((D.editingTodoId?'Đã cập nhật':'Đã thêm')+': '+name);
}

function deleteTodoFromModal() {
  if(!D.editingTodoId) return;
  const td=D.todos.find(x=>x.id===D.editingTodoId);
  if(!td||!confirm(`Xóa "${td.name}"?`)) return;
  D.todos=D.todos.filter(x=>x.id!==D.editingTodoId);
  closeModal('modal-todo'); renderTodos(); saveAll(); toast('Đã xóa: '+td.name);
}

// ═══════════════════════════════════════════════════════════════
// M&A TRACKER
// ═══════════════════════════════════════════════════════════════

function getMAStages() {
  return [
    { id:'tim-kiem',  label:t('stage-tim-kiem'), color:'#6B6B6B', bg:'#F5F5F2' },
    { id:'tiep-can',  label:t('stage-tiep-can'), color:'#3D5CF5', bg:'#EEF2FF' },
    { id:'tham-dinh', label:t('stage-tham-dinh'),color:'#B86B00', bg:'#FFF3DC' },
    { id:'dam-phan',  label:t('stage-dam-phan'), color:'#8B4513', bg:'#FDF0E0' },
    { id:'hoan-tat',  label:t('stage-hoan-tat'), color:'#0D6E4A', bg:'#E0F8EE' },
  ];
}

const MA_TYPE_LABEL = { 've-sinh':'🧹 Vệ sinh CN', 'su-kien':'🎪 Sự kiện', 'other':'🏢 Khác' };
const MA_DEAL_LABEL = { '100%':'Mua 100%', '51%+':'Đầu tư 51%+', 'hop-tac':'Hợp tác ĐQ', '':'—' };

function maFiltered() {
  const q = ($('ma-search')?.value||'').toLowerCase();
  return D.ma.filter(c => {
    const matchType = D.maFilter==='all' || c.type===D.maFilter;
    const matchQ = !q || c.name.toLowerCase().includes(q) || (c.contact||'').toLowerCase().includes(q);
    return matchType && matchQ;
  });
}

function setMaFilter(f, btn) {
  D.maFilter = f;
  document.querySelectorAll('#panel-ma .filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMa();
}

function renderMa() {
  const items = maFiltered();

  // ── KPI strip ──
  const total    = D.ma.length;
  const active   = D.ma.filter(c => c.status !== 'hoan-tat').length;
  const done     = D.ma.filter(c => c.status === 'hoan-tat').length;
  const negotiating = D.ma.filter(c => c.status === 'dam-phan').length;
  const avgScore = D.ma.filter(c=>+c.score>0).length
    ? Math.round(D.ma.filter(c=>+c.score>0).reduce((a,c)=>a+(+c.score||0),0)/D.ma.filter(c=>+c.score>0).length)
    : 0;

  $('ma-kpi-row').innerHTML = [
    { val: total,       label: t('ma-total'),       color: '#1A2F5A', bg:'#EEF2FF' },
    { val: active,      label: t('ma-active'),       color: '#3D5CF5', bg:'#EEF2FF' },
    { val: negotiating, label: t('ma-negotiating'),  color: '#B86B00', bg:'#FFF3DC' },
    { val: done,        label: t('ma-done'),         color: '#0D6E4A', bg:'#E0F8EE' },
  ].map(k => `<div class="card kpi" style="border-top:3px solid ${k.color};background:${k.bg}">
    <div class="kpi-val" style="color:${k.color}">${k.val}</div>
    <div class="kpi-label">${k.label}</div>
  </div>`).join('');

  // ── Kanban ──
  $('ma-kanban').innerHTML = getMAStages().map(stage => {
    const cards = items.filter(c => c.status === stage.id);
    const cardsHtml = cards.map(c => {
      const scoreColor = +c.score>=70?'#0D6E4A':+c.score>=55?'#B86B00':+c.score>0?'#C0392B':'#aaa';
      const daysLeft = c.deadline ? Math.ceil((new Date(c.deadline)-new Date())/(1000*60*60*24)) : null;
      const deadlineBadge = daysLeft !== null
        ? `<span style="font-size:9px;padding:1px 6px;border-radius:10px;background:${daysLeft<7?'#FCEBEB':daysLeft<14?'#FFF3DC':'#F5F5F2'};color:${daysLeft<7?'#C0392B':daysLeft<14?'#B86B00':'#6B6B6B'}">⏰ ${daysLeft<0?t('ma-overdue'):daysLeft+'d'}</span>` : '';
      return `<div onclick="openEditMa('${c.id}')" style="background:#fff;border:1px solid #E2E2DC;border-radius:8px;padding:9px 11px;margin-bottom:7px;cursor:pointer;border-left:3px solid ${stage.color}">
        <div style="font-size:12px;font-weight:600;margin-bottom:4px;color:#1A1A1A">${c.name}</div>
        <div style="font-size:10px;color:#6B6B6B;margin-bottom:5px">${MA_TYPE_LABEL[c.type]||c.type} · ${c.location||'—'}</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center">
          ${c.score?`<span style="font-size:10px;font-weight:700;color:${scoreColor}">${c.score}/100</span>`:''}
          ${c.deal?`<span style="font-size:9px;padding:1px 6px;border-radius:10px;background:#EEF2FF;color:#3D5CF5">${MA_DEAL_LABEL[c.deal]}</span>`:''}
          ${deadlineBadge}
        </div>
        ${c.note?`<div style="font-size:10px;color:#B86B00;margin-top:4px;border-top:1px solid #F5F5F2;padding-top:4px">→ ${c.note}</div>`:''}
        <div style="font-size:9px;color:#aaa;margin-top:4px">${c.owner||'PMO'}</div>
      </div>`;
    }).join('') || `<div style="font-size:11px;color:#aaa;text-align:center;padding:12px 6px">Trống</div>`;

    return `<div style="background:#FAFAF8;border:1px solid #E2E2DC;border-radius:10px;padding:10px">
      <div style="font-size:11px;font-weight:700;color:${stage.color};margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
        <span>${stage.label}</span>
        <span style="background:${stage.bg};color:${stage.color};padding:2px 8px;border-radius:10px;font-size:10px">${cards.length}</span>
      </div>
      ${cardsHtml}
    </div>`;
  }).join('');

  // ── Table ──
  if(!items.length) {
    $('ma-table').innerHTML='';
    $('ma-empty').style.display='block';
    $('ma-empty').textContent=t('ma-empty');
    return;
  }
  $('ma-empty').style.display='none';
  const stageMap = Object.fromEntries(getMAStages().map(s=>[s.id,s]));
  $('ma-table').innerHTML = items.map(c => {
    const st = stageMap[c.status]||MA_STAGES[0];
    const sc = +c.score;
    const scColor = sc>=70?'#0D6E4A':sc>=55?'#B86B00':sc>0?'#C0392B':'#aaa';
    return `<tr>
      <td style="font-weight:600">${c.name}</td>
      <td>${MA_TYPE_LABEL[c.type]||c.type}</td>
      <td><span class="pill" style="background:${st.bg};color:${st.color}">${st.label}</span></td>
      <td style="font-weight:700;color:${scColor}">${sc||'—'}</td>
      <td style="font-size:11px">${MA_DEAL_LABEL[c.deal||'']}</td>
      <td style="font-size:11px">${c.valuation?Number(c.valuation).toLocaleString('vi-VN')+' tr':'—'}</td>
      <td style="font-size:11px">${c.contact||'—'}</td>
      <td style="font-size:10px;color:#6B6B6B">${c.updatedAt||c.date||'—'}</td>
      <td style="font-size:11px">${c.owner||'PMO'}</td>
      <td>
        <button class="btn btn-sm btn-amber" style="padding:2px 8px" onclick="openEditMa('${c.id}')">✏️</button>
      </td>
    </tr>`;
  }).join('');
}

// ── Open modal ──────────────────────────────────────────────
function openAddMa() {
  D.editingMaId = null;
  $('modal-ma-title').textContent = t('modal-ma-add');
  $('ma-del-btn').style.display = 'none';
  ['ma-name','ma-location','ma-contact','ma-owner','ma-pros','ma-cons','ma-note'].forEach(id => $(id).value='');
  ['ma-headcount','ma-revenue','ma-valuation','ma-score'].forEach(id => $(id).value='');
  $('ma-type').value='ve-sinh'; $('ma-status').value='tim-kiem';
  $('ma-deal').value=''; $('ma-date').value=''; $('ma-deadline').value='';
  openModal('modal-ma');
}

function openEditMa(id) {
  const c = D.ma.find(x=>x.id===id); if(!c) return;
  D.editingMaId = id;
  $('modal-ma-title').textContent = t('modal-ma-edit')+': '+c.name;
  $('ma-del-btn').style.display = 'inline-block';
  $('ma-name').value     = c.name||'';
  $('ma-type').value     = c.type||'ve-sinh';
  $('ma-status').value   = c.status||'tim-kiem';
  $('ma-deal').value     = c.deal||'';
  $('ma-location').value = c.location||'';
  $('ma-headcount').value= c.headcount||'';
  $('ma-revenue').value  = c.revenue||'';
  $('ma-valuation').value= c.valuation||'';
  $('ma-score').value    = c.score||'';
  $('ma-contact').value  = c.contact||'';
  $('ma-owner').value    = c.owner||'';
  $('ma-date').value     = c.date||'';
  $('ma-deadline').value = c.deadline||'';
  $('ma-pros').value     = c.pros||'';
  $('ma-cons').value     = c.cons||'';
  $('ma-note').value     = c.note||'';
  openModal('modal-ma');
}

function saveMa() {
  const name = $('ma-name').value.trim();
  if(!name){ toast(t('err-ma-name'), true); return; }
  const entry = {
    id: D.editingMaId || ('MA-'+String(D.maCounter++).padStart(3,'0')),
    name, type:$('ma-type').value, status:$('ma-status').value,
    deal:$('ma-deal').value, location:$('ma-location').value,
    headcount:+$('ma-headcount').value||0, revenue:+$('ma-revenue').value||0,
    valuation:+$('ma-valuation').value||0, score:+$('ma-score').value||0,
    contact:$('ma-contact').value, owner:$('ma-owner').value,
    date:$('ma-date').value, deadline:$('ma-deadline').value,
    pros:$('ma-pros').value, cons:$('ma-cons').value, note:$('ma-note').value,
    updatedAt: today(),
  };
  if(D.editingMaId) {
    const i = D.ma.findIndex(x=>x.id===D.editingMaId);
    if(i>=0) D.ma[i]=entry;
  } else {
    D.ma.push(entry);
  }
  closeModal('modal-ma');
  renderMa();
  saveAll();
  toast((D.editingMaId?t('toast-ma-updated'):t('toast-ma-added'))+': '+name+' ✓');
}

function deleteMaFromModal() {
  if(!D.editingMaId) return;
  const c = D.ma.find(x=>x.id===D.editingMaId);
  if(!c || !confirm(`Xóa "${c.name}"?`)) return;
  D.ma = D.ma.filter(x=>x.id!==D.editingMaId);
  closeModal('modal-ma');
  renderMa();
  saveAll();
  toast(t('toast-ma-deleted')+': '+c.name);
}

// ── Quick stage advance from kanban ─────────────────────────
function advanceMaStage(id) {
  const c = D.ma.find(x=>x.id===id); if(!c) return;
  const _stages = getMAStages();
  const idx = _stages.findIndex(s=>s.id===c.status);
  if(idx<_stages.length-1) { c.status=_stages[idx+1].id; c.updatedAt=today(); renderMa(); saveAll(); }
}

loadFromSheets().then(() => refreshAll());
