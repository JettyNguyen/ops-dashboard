/* ViewLife Sales OS v3.2 — editing and Pricing v3.1 corrections */
(function () {
  const pricingProducts = [
    { sku: 'VL-G5400', model: 'G5400', spec: 'Intel Pentium Gold G5400 / DDR3 8GB / SSD 256GB / Win11 Pro', cost: 5697500, list: 7150000, authBase: 6792500, goldBase: 6292000, floor: 6006000, online: 8216208, shopeeMargin: 14.2 },
    { sku: 'VL-N5095-TOUCH', model: 'N5095-Touch', spec: 'N5095 / RAM 8GB / NVMe 128GB / Touch / Win11 Pro', cost: 7244930, list: 9100000, authBase: 8645000, goldBase: 8008000, floor: 7644000, online: 10456992, shopeeMargin: 15.5 },
    { sku: 'VL-1315U', model: '1315U', spec: 'Intel Core i3-1315U / DDR4 16GB / SSD 256GB / Webcam / Win11 Pro', cost: 10324155, list: 12950000, authBase: 12302500, goldBase: 11396000, floor: 10878000, online: 14881104, shopeeMargin: 16.5 },
    { sku: 'VL-1345U-OPT', model: '1345U-optional', spec: 'Intel Core i5-1345U / DDR4 16GB / SSD optional / Webcam / Win11 Pro', cost: 12737183, list: 15950000, authBase: 15152500, goldBase: 14036000, floor: 13398000, online: 18328464, shopeeMargin: 16.9 },
    { sku: 'VL-1345U-B256', model: '1345U-Black 256', spec: 'Intel Core i5-1345U / DDR4 16GB / SSD 256GB / Webcam / Win11 Pro', cost: 10884014, list: 13650000, authBase: 12967500, goldBase: 12012000, floor: 11466000, online: 15685488, shopeeMargin: 16.7 },
    { sku: 'VL-1345U-B512', model: '1345U-Black 512', spec: 'Intel Core i5-1345U / DDR4 16GB / SSD 512GB / Webcam / Win11 Pro', cost: 14149859, list: 17700000, authBase: 16815000, goldBase: 15576000, floor: 14868000, online: 20339424, shopeeMargin: 17.0 }
  ].map(p => ({ ...p, walkIn: Math.round(p.list * 1.08), vat: 8, maxDiscount: 16, status: 'Active' }));
  const tierDiscounts = {
    Authorized: [5, 7, 9], Silver: [8, 10, 12], Gold: [12, 14, 15], Platinum: [14, 15, 16]
  };

  function migratePricing() {
    if ((db.version || 0) >= 3.3) return;
    const previousProducts = db.products.slice();
    const idMap = new Map();
    const rebuilt = pricingProducts.map((correct, index) => {
      const exact = previousProducts.find(p => String(p.sku || '').toUpperCase() === correct.sku);
      const item = { id: exact?.id || uid() + index, ...correct };
      if (exact) idMap.set(exact.id, item.id);
      return item;
    });
    previousProducts.forEach(old => {
      if (idMap.has(old.id)) return;
      const oldText = `${old.sku || ''} ${old.model || ''}`.toUpperCase();
      let replacement = rebuilt.find(p => oldText.includes('G5400') && p.model === 'G5400')
        || rebuilt.find(p => oldText.includes('1315') && p.model === '1315U')
        || rebuilt.find(p => oldText.includes('1345') && oldText.includes('512') && p.model === '1345U-Black 512')
        || rebuilt.find(p => oldText.includes('1345') && oldText.includes('BLACK') && p.model === '1345U-Black 256')
        || rebuilt.find(p => oldText.includes('1345') && p.model === '1345U-optional');
      if (replacement) idMap.set(old.id, replacement.id);
    });
    ['activities','opportunities','orders'].forEach(collection => db[collection].forEach(row => { if (idMap.has(row.productId)) row.productId = idMap.get(row.productId); }));
    db.products = rebuilt;
    db.version = 3.3;
    save();
  }

  function setValues(values) {
    Object.entries(values).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.value = value ?? '';
    });
  }
  function upsert(collection, record) {
    const index = db[collection].findIndex(x => x.id === record.id);
    if (index >= 0) db[collection][index] = record;
    else db[collection].push(record);
    save();
  }
  function actions(type, id, editCall) {
    return `<div class="toolbar"><button class="btn sm" onclick="${editCall}(${id})">Edit</button><button class="btn sm red" onclick="del('${type}',${id})">Delete</button></div>`;
  }
  function tierDiscount(tier, qty) {
    const band = qty >= 100 ? 2 : qty >= 50 ? 1 : 0;
    return (tierDiscounts[tier] || [0, 0, 0])[band];
  }
  function walkInRule(qty) {
    if (qty > 50) return { defaultDiscount: 5, maxDiscount: 5, label: '>50 máy: yêu cầu ký hợp đồng, chuyển Authorized' };
    if (qty >= 31) return { defaultDiscount: 3, maxDiscount: 5, label: '31–50 máy: mặc định 3%, tối đa 5%' };
    if (qty >= 11) return { defaultDiscount: 2, maxDiscount: 4, label: '11–30 máy: mặc định 2%, tối đa 4%' };
    return { defaultDiscount: 0, maxDiscount: 2, label: '1–10 máy: mặc định 0%, tối đa 2%' };
  }
  function suggestedPrice(productId, accountId, qty) {
    const p = product(productId), a = byId(db.accounts, accountId);
    if (!p.id) return { unitPrice: 0, discount: 0, source: 'Missing product' };
    if (a.channel === 'Walk-in' || a.tier === 'Walk-in') {
      const rule = walkInRule(qty);
      const unitPrice = Math.round(p.list * (1 - rule.defaultDiscount / 100));
      return { unitPrice, discount: rule.defaultDiscount, source: `${rule.label}; khách trả ${money(unitPrice * 1.08)} incl. VAT` };
    }
    if (a.channel === 'Online') return { unitPrice: Math.round((p.online || p.list * 1.12 * 1.08) / 1.08), discount: 0, source: `Online ${money(p.online || p.list * 1.12 * 1.08)} incl. VAT; transaction price excl. VAT` };
    const discount = tierDiscount(a.tier, qty);
    return { unitPrice: Math.round(p.list * (1 - discount / 100)), discount, source: `${a.tier || 'List'} · ${qty >= 100 ? '≥100' : qty >= 50 ? '≥50' : 'Base'} · excl. VAT` };
  }
  window.recalcPrice = function (prefix) {
    const accountId = +document.getElementById(prefix + '_acc')?.value;
    const productId = +document.getElementById(prefix + '_product')?.value;
    const qty = +document.getElementById(prefix + '_qty')?.value || 0;
    const result = suggestedPrice(productId, accountId, qty);
    const price = document.getElementById(prefix + '_price');
    if (price && !price.dataset.manual) price.value = result.unitPrice;
    const preview = document.getElementById(prefix + '_price_preview');
    if (preview) preview.innerHTML = `<b>${money(result.unitPrice)}</b> / unit · ${esc(result.source)} · Total ${money(result.unitPrice * qty)}`;
  };
  window.pricing = function (order) {
    const p=product(order.productId), a=byId(db.accounts,order.accountId), discount=p.list?((p.list-order.unitPrice)/p.list*100):0, margin=order.unitPrice?((order.unitPrice-(order.cost||p.cost))/order.unitPrice*100):0;
    const walkIn = a.channel === 'Walk-in' || a.tier === 'Walk-in';
    const walkRule = walkIn ? walkInRule(order.qty || 1) : null;
    const exception = order.unitPrice < p.floor || discount > (walkRule?.maxDiscount ?? p.maxDiscount) || margin < db.settings.marginFloor || (walkIn && order.qty > 50);
    return { discount, margin, exception, reason: walkIn && order.qty > 50 ? 'Walk-in >50 máy phải ký hợp đồng' : walkIn && discount > walkRule.maxDiscount ? `Walk-in vượt mức ${walkRule.maxDiscount}%` : '' };
  };
  window.markManualPrice = function (prefix) { const el = document.getElementById(prefix + '_price'); if (el) el.dataset.manual = '1'; };

  window.renderProducts = function () {
    document.getElementById('productRows').innerHTML = db.products.map(p => `<tr><td><b>${esc(p.sku)}</b><br>${esc(p.model)}</td><td>${esc(p.spec)}</td><td>${money(p.cost)}</td><td>${money(p.list)}</td><td>${money(p.authBase)}</td><td>${money(p.goldBase)}</td><td><b>${money(p.walkIn || 0)}</b><br><span class="muted">1 máy, incl. VAT</span></td><td>${money(p.online || 0)}<br><span class="muted">Margin ${p.shopeeMargin}%</span></td><td>${money(p.floor)}</td><td>${badge(p.status,p.status==='Active'?'green':'amber')}</td><td>${actions('products',p.id,'editProduct')}</td></tr>`).join('') || empty(11);
  };
  window.renderAccounts = function () {
    document.getElementById('accountRows').innerHTML = db.accounts.map(a => { const os=db.opportunities.filter(o=>o.accountId===a.id&&!['Won','Lost'].includes(o.stage)), touch=db.activities.filter(x=>x.accountId===a.id&&x.followDate).sort((x,y)=>x.followDate.localeCompare(y.followDate))[0]; return `<tr><td><b>${esc(a.name)}</b></td><td>${esc(a.channel)}<br>${badge(a.tier)}</td><td>${esc(a.owner)}</td><td>${esc(a.contacts)}</td><td>${os.length}<br>${compact(os.reduce((s,o)=>s+o.value,0))}</td><td>${touch?.followDate||'—'}</td><td>${actions('accounts',a.id,'editAccount')}</td></tr>`; }).join('') || empty(7);
  };
  window.renderActivities = function () {
    document.getElementById('activityRows').innerHTML = db.activities.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(a => `<tr><td>${a.date}</td><td><b>${esc(account(a.accountId))}</b><br><span class="muted">${esc(a.contact)} · ${esc(a.role)}</span></td><td>${badge(a.type)}</td><td>${esc(product(a.productId).model||'—')}<br>${a.qty||0} units</td><td>${esc(a.outcome)}</td><td>${esc(a.nextAction)}</td><td>${a.followDate||'—'} ${a.followDate<TODAY()?badge('Late','red'):''}</td><td>${actions('activities',a.id,'editActivity')}</td></tr>`).join('') || empty();
  };
  window.renderOpps = function () {
    const open=db.opportunities.filter(o=>!['Won','Lost','After Sales'].includes(o.stage)), v=open.reduce((s,o)=>s+o.value,0), stale=open.filter(o=>days(o.created)>db.settings.staleDays&&!o.nextDate).length;
    document.getElementById('oppKpi').innerHTML=kpi('Open pipeline',compact(v),`${open.length} opportunities`)+kpi('Weighted value',compact(open.reduce((s,o)=>s+o.value*o.probability/100,0)),'Probability adjusted','green')+kpi('0–30 day',compact(open.filter(o=>o.horizon==='0–30 days').reduce((s,o)=>s+o.value,0)),'Near-term','amber')+kpi('Average aging',Math.round(open.reduce((s,o)=>s+days(o.created),0)/(open.length||1))+' days','Since created','violet')+kpi('Stale / incomplete',stale,'No dated next step',stale?'red':'green');
    document.getElementById('oppRows').innerHTML=db.opportunities.map(o=>`<tr><td><b>${esc(account(o.accountId))}</b><br>${esc(o.name)}</td><td>${esc(product(o.productId).model||'—')}<br>${o.qty} units<br><span class="muted">${money(o.unitPrice||0)}/unit</span></td><td>${badge(o.stage,o.stage==='Negotiation'?'amber':'blue')}<br><span class="muted">${esc(o.journey)}</span></td><td>${esc(o.horizon)}<br><span class="muted">Close ${o.close}</span></td><td>${compact(o.value)}<br><span class="muted">${o.probability}% weighted</span></td><td>${days(o.created)} days ${days(o.created)>db.settings.staleDays?badge('Aging','red'):''}</td><td><b>Champion:</b> ${esc(o.champion||'—')}<br><b>Buyer:</b> ${esc(o.economicBuyer||'—')}<br><span class="muted">Blocker: ${esc(o.blocker||'none')}</span></td><td>${esc(o.nextAction)}<br><span class="muted">${o.nextDate||'No date'}</span></td><td>${actions('opportunities',o.id,'editOpportunity')}</td></tr>`).join('')||empty(9);
  };
  window.renderOrders = function () {
    const rev=db.orders.reduce((s,o)=>s+o.qty*o.unitPrice,0), gm=db.orders.reduce((s,o)=>s+o.qty*(o.unitPrice-(o.cost||product(o.productId).cost)),0), pending=db.orders.filter(o=>!o.acceptanceDate).length, exc=db.orders.filter(o=>pricing(o).exception).length;
    document.getElementById('orderKpi').innerHTML=kpi('Booked revenue',compact(rev),`${db.orders.length} POs`)+kpi('Gross profit',compact(gm),`${rev?(gm/rev*100).toFixed(1):0}% margin`,'green')+kpi('Units',db.orders.reduce((s,o)=>s+o.qty,0),'Ordered','blue')+kpi('Pending acceptance',pending,'Delivery control','amber')+kpi('Pricing exceptions',exc,'Approval required',exc?'red':'green');
    document.getElementById('orderRows').innerHTML=db.orders.map(o=>{let p=pricing(o);return `<tr><td><b>${esc(o.po)}</b><br>${esc(account(o.accountId))}</td><td>${esc(product(o.productId).model||'—')}</td><td>${o.qty}</td><td>${money(o.unitPrice)}<br>${p.exception?badge('Exception','red'):badge('Within guardrail','green')}</td><td>${compact(o.qty*o.unitPrice)}</td><td>${p.margin.toFixed(1)}%</td><td>${badge(o.status,o.status==='Delivered'?'green':'blue')}</td><td>PO ${o.poDate}<br>Delivery ${o.deliveryDate||'—'}<br>Acceptance ${o.acceptanceDate||'—'}</td><td>${actions('orders',o.id,'editOrder')}</td></tr>`}).join('')||empty(9);
  };

  window.openProduct = function (record) {
    record = record || {};
    modal(record.id ? 'Edit Product & Pricing' : 'Product Master',f('p_sku','SKU')+f('p_model','Model')+area('p_spec','Specification')+f('p_cost','Landed cost excl. VAT','number')+f('p_list','List price excl. VAT','number')+f('p_auth','Authorized Base excl. VAT','number')+f('p_gold','Gold Base excl. VAT','number')+f('p_walkin','Walk-in price incl. VAT (0% discount)','number')+f('p_online','Online/Shopee SRP incl. VAT','number')+f('p_shopee','Shopee Margin %','number','step="0.1"')+f('p_floor','Platinum +100 / Floor excl. VAT','number')+f('p_vat','VAT %','number','value="8"')+f('p_discount','Contract maximum discount %','number','value="16"')+sel('p_status','Status','<option>Active</option><option>Inactive</option>'),()=>{upsert('products',{id:record.id||uid(),sku:val('p_sku'),model:val('p_model'),spec:val('p_spec'),cost:nval('p_cost'),list:nval('p_list'),authBase:nval('p_auth'),goldBase:nval('p_gold'),walkIn:nval('p_walkin'),online:nval('p_online'),shopeeMargin:nval('p_shopee'),floor:nval('p_floor'),vat:nval('p_vat'),maxDiscount:nval('p_discount'),status:val('p_status')});closeModal();renderProducts();toast('Product updated')});
    setValues({p_sku:record.sku,p_model:record.model,p_spec:record.spec,p_cost:record.cost,p_list:record.list,p_auth:record.authBase,p_gold:record.goldBase,p_walkin:record.walkIn,p_online:record.online,p_shopee:record.shopeeMargin,p_floor:record.floor,p_vat:record.vat??8,p_discount:record.maxDiscount??16,p_status:record.status||'Active'});
  };
  window.editProduct = id => openProduct(byId(db.products,id));

  window.openAccount = function (record) {
    record=record||{}; modal(record.id?'Edit Account & Buying Committee':'Account & Buying Committee',f('c_name','Account name')+sel('c_channel','Channel',['Dealer','Retail Chain','Direct B2B','Education','System Integrator','B2G','Walk-in','Online'].map(x=>`<option>${x}</option>`).join(''))+sel('c_tier','Pricing tier',['Walk-in','Authorized','Silver','Gold','Platinum'].map(x=>`<option>${x}</option>`).join(''))+f('c_owner','Account owner')+area('c_contacts','Contacts and roles (one per line)'),()=>{upsert('accounts',{id:record.id||uid(),name:val('c_name'),channel:val('c_channel'),tier:val('c_tier'),owner:val('c_owner'),contacts:val('c_contacts')});closeModal();renderAccounts();toast('Account updated')}); setValues({c_name:record.name,c_channel:record.channel||'Dealer',c_tier:record.tier||'Authorized',c_owner:record.owner,c_contacts:record.contacts});
  };
  window.editAccount=id=>openAccount(byId(db.accounts,id));

  window.openActivity = function(record) {
    record=record||{}; modal(record.id?'Edit Activity / Meeting':'Log Activity / Meeting',f('a_date','Date','date')+sel('a_acc','Account',opts(db.accounts,'name'))+f('a_contact','Contact')+f('a_role','Stakeholder role')+sel('a_type','Activity type',['Meeting','Call','Demo','Pilot','Follow-up','Email'].map(x=>`<option>${x}</option>`).join(''))+sel('a_product','Product',opts(db.products,'model'))+f('a_qty','Potential qty','number')+area('a_details','Details / agenda')+area('a_outcome','Outcome')+area('a_next','Next action')+f('a_follow','Next follow-up date','date')+sel('a_opp','Linked opportunity','<option value="">None</option>'+opts(db.opportunities,'name')),()=>{upsert('activities',{id:record.id||uid(),date:val('a_date'),accountId:+val('a_acc'),contact:val('a_contact'),role:val('a_role'),type:val('a_type'),productId:+val('a_product'),qty:nval('a_qty'),details:val('a_details'),outcome:val('a_outcome'),nextAction:val('a_next'),followDate:val('a_follow'),opportunityId:+val('a_opp')||null});closeModal();renderActivities();toast('Activity updated')}); setValues({a_date:record.date||TODAY(),a_acc:record.accountId,a_contact:record.contact,a_role:record.role,a_type:record.type||'Meeting',a_product:record.productId,a_qty:record.qty,a_details:record.details,a_outcome:record.outcome,a_next:record.nextAction,a_follow:record.followDate,a_opp:record.opportunityId});
  };
  window.editActivity=id=>openActivity(byId(db.activities,id));

  window.openOpportunity = function(record) {
    record=record||{}; const change='onchange="recalcPrice(\'o\')"'; modal(record.id?'Edit Opportunity':'New Opportunity',f('o_name','Opportunity name')+sel('o_acc','Account',opts(db.accounts,'name')).replace('<select','<select '+change)+sel('o_product','Product',opts(db.products,'model')).replace('<select','<select '+change)+f('o_qty','Qty','number',change)+f('o_price','Unit selling price','number','oninput="markManualPrice(\'o\')"')+'<div class="wide notice" id="o_price_preview"></div>'+sel('o_stage','Sales stage',['Lead','Qualified','Demo','Quotation','Negotiation','PO','Delivery','After Sales','Lost'].map(x=>`<option>${x}</option>`).join(''))+sel('o_journey','Customer journey',['Awareness','Demo','Pilot','IT Evaluation','Procurement','Board Approval','PO','Delivery','Acceptance','Warranty'].map(x=>`<option>${x}</option>`).join(''))+sel('o_horizon','Time horizon',['0–30 days','31–60 days','61–90 days','90+ days'].map(x=>`<option>${x}</option>`).join(''))+f('o_close','Expected close','date')+f('o_prob','Probability %','number','value="30"')+f('o_champion','Champion')+f('o_buyer','Economic buyer')+f('o_comp','Competitor')+area('o_block','Procurement blocker')+area('o_next','Next action')+f('o_nextdate','Next action date','date'),()=>{const unit=nval('o_price'),qty=nval('o_qty');upsert('opportunities',{id:record.id||uid(),name:val('o_name'),accountId:+val('o_acc'),productId:+val('o_product'),qty,unitPrice:unit,stage:val('o_stage'),journey:val('o_journey'),horizon:val('o_horizon'),created:record.created||TODAY(),close:val('o_close'),value:unit*qty,probability:nval('o_prob'),champion:val('o_champion'),economicBuyer:val('o_buyer'),competitor:val('o_comp'),blocker:val('o_block'),nextAction:val('o_next'),nextDate:val('o_nextdate')});closeModal();renderOpps();toast('Opportunity updated')}); setValues({o_name:record.name,o_acc:record.accountId,o_product:record.productId,o_qty:record.qty,o_price:record.unitPrice,o_stage:record.stage||'Lead',o_journey:record.journey||'Awareness',o_horizon:record.horizon||'0–30 days',o_close:record.close,o_prob:record.probability??30,o_champion:record.champion,o_buyer:record.economicBuyer,o_comp:record.competitor,o_block:record.blocker,o_next:record.nextAction,o_nextdate:record.nextDate}); if(record.unitPrice)document.getElementById('o_price').dataset.manual='1'; recalcPrice('o');
  };
  window.editOpportunity=id=>openOpportunity(byId(db.opportunities,id));

  window.openOrder = function(record) {
    record=record||{}; const change='onchange="recalcPrice(\'r\')"'; modal(record.id?'Edit Order / PO':'Add Order / PO',f('r_po','PO number')+sel('r_acc','Account',opts(db.accounts,'name')).replace('<select','<select '+change)+sel('r_product','Product',opts(db.products,'model')).replace('<select','<select '+change)+f('r_qty','Qty','number',change)+f('r_price','Unit selling price','number','oninput="markManualPrice(\'r\')"')+'<div class="wide notice" id="r_price_preview"></div>'+sel('r_status','Status',['PO Received','Confirmed','Delivering','Delivered','Accepted','Paid'].map(x=>`<option>${x}</option>`).join(''))+f('r_podate','PO date','date')+f('r_delivery','Delivery date','date')+f('r_accept','Acceptance date','date')+f('r_payment','Payment date','date'),()=>{let p=product(+val('r_product'));upsert('orders',{id:record.id||uid(),po:val('r_po'),accountId:+val('r_acc'),productId:+val('r_product'),qty:nval('r_qty'),unitPrice:nval('r_price'),cost:p.cost,status:val('r_status'),poDate:val('r_podate'),deliveryDate:val('r_delivery'),acceptanceDate:val('r_accept'),paymentDate:val('r_payment'),opportunityId:record.opportunityId||null});closeModal();renderOrders();toast('PO updated; guardrails recalculated')}); setValues({r_po:record.po,r_acc:record.accountId,r_product:record.productId,r_qty:record.qty,r_price:record.unitPrice,r_status:record.status||'PO Received',r_podate:record.poDate||TODAY(),r_delivery:record.deliveryDate,r_accept:record.acceptanceDate,r_payment:record.paymentDate}); if(record.unitPrice)document.getElementById('r_price').dataset.manual='1'; recalcPrice('r');
  };
  window.editOrder=id=>openOrder(byId(db.orders,id));

  function updateHeaders() {
    const row = document.querySelector('#products thead tr');
    if (row) row.innerHTML='<th>SKU / Model</th><th>Specification</th><th>Cost</th><th>List excl. VAT</th><th>Auth Base</th><th>Gold Base</th><th>Walk-in incl. VAT</th><th>Online SRP incl. VAT</th><th>Plat+100 / Floor</th><th>Status</th><th></th>';
    const panel = document.getElementById('products');
    const productTable = panel?.querySelector('.card.scroll');
    if (productTable && !document.getElementById('walkinPolicy')) {
      const policy = document.createElement('div');
      policy.id = 'walkinPolicy';
      policy.className = 'card scroll';
      policy.style.marginBottom = '14px';
      policy.innerHTML = `<div class="ct">Walk-in Discount Range by Order Size</div>
        <div class="muted" style="margin-bottom:10px">Selling price = List Price × (1 − Discount) · Customer pays = Selling price × 1.08</div>
        <table><thead><tr><th>Qty</th><th>Discount range</th><th>Default</th><th>Notes</th></tr></thead><tbody>
          <tr><td><b>1–10 units</b></td><td>0%–2%</td><td>0%</td><td>Sales may offer up to 2% if customer negotiates</td></tr>
          <tr><td><b>11–30 units</b></td><td>2%–4%</td><td>2%</td><td>Up to 4% for high-potential accounts</td></tr>
          <tr><td><b>31–50 units</b></td><td>3%–5%</td><td>3%</td><td>Max 5% = Authorized floor; recommend converting to contract</td></tr>
          <tr><td><b>&gt;50 units</b></td><td>${badge('Contract required','red')}</td><td>—</td><td>Authorized tier applies (5%+ base)</td></tr>
        </tbody></table>`;
      productTable.parentNode.insertBefore(policy, productTable);
    }
  }
  migratePricing();
  window.addEventListener('load', () => { updateHeaders(); if (document.getElementById('products').classList.contains('active')) renderProducts(); });
})();
