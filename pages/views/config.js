// config.js — SCADA configuration view
function renderConfig(el) {
  el.innerHTML = '<h3 style="color:var(--ign);font-size:10px;margin-bottom:8px">⚙️ Configuration</h3>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
    +'<div style="background:var(--card);border:1px solid var(--b);border-radius:4px;padding:8px">'
    +'<div style="color:var(--ig);font-size:9px;font-weight:700;margin-bottom:4px">📡 Repos</div>'
    + Object.keys(REPOS).map(function(k) {
      var r = REPOS[k];
      return '<div style="font-size:7.5px;padding:2px 0"><span style="color:var(--ign)">'+k+'</span> → '+r.owner+'/'+r.repo+'</div>';
    }).join('')
    +'</div>'
    +'<div style="background:var(--card);border:1px solid var(--b);border-radius:4px;padding:8px">'
    +'<div style="color:var(--ig);font-size:9px;font-weight:700;margin-bottom:4px">🏭 Sites</div>'
    + SCADA.sites.map(function(s) {
      return '<div style="font-size:7.5px;padding:2px 0"><span style="color:var(--ign)">'+s.id+'</span> — '+s.name+' ('+s.areas.length+' areas)</div>';
    }).join('')
    +'</div></div>';
}
