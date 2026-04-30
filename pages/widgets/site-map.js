// site-map.js — ISA-95 site hierarchy visualization
function renderSiteMap(el) {
  if (!SCADA.sites.length) { el.innerHTML = '<div style="color:var(--t2);padding:20px">No sites configured</div>'; return; }
  el.innerHTML = '<div style="display:flex;flex-direction:column;gap:12px;align-items:center;padding:16px">'
    +'<div class="site-node" style="border-color:var(--ign)">🏢 '+((SCADA.sites[0]&&SCADA.sites[0].name)||'Enterprise')+'</div>'
    +'<div style="width:1px;height:12px;background:var(--b)"></div>'
    +'<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">'
    + SCADA.sites.map(function(s) {
      return '<div class="site-node" onclick="switchView(\'dashboard\')">🏭 '+s.name
        +'<span style="font-size:6px;color:var(--ok)">● ONLINE</span></div>';
    }).join('')
    +'</div>'
    +'<div style="width:1px;height:12px;background:var(--b)"></div>'
    +'<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">'
    + (SCADA.sites[0]?.areas||[]).map(function(a) {
      return '<div class="site-node" style="font-size:7px">📍 '+a+'</div>';
    }).join('')
    +'</div></div>';
}
