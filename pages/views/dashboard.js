// dashboard.js — main SCADA overview dashboard
function renderDashboard(el) {
  var tagCount = Object.keys(SCADA.tags).length;
  var udtCount = Object.keys(SCADA.udts).length;
  var alarmCount = journalActive().length;

  el.innerHTML = '<div style="display:flex;flex-direction:column;gap:12px">'
    +'<div id="kpi-row"></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
    +'<div><h4 style="color:var(--ign);font-size:9px;margin-bottom:4px">📈 Tag Overview</h4>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:4px" id="tag-grid"></div></div>'
    +'<div><h4 style="color:var(--ign);font-size:9px;margin-bottom:4px">🔔 Recent Alarms</h4>'
    +'<div id="alarm-mini"></div></div></div></div>';

  renderKPIRow(document.getElementById('kpi-row'), [
    { label:'Tags', value:tagCount, unit:'total', thresholds:{wr:5,er:0} },
    { label:'UDTs', value:udtCount, unit:'loaded', thresholds:{wr:3,er:0} },
    { label:'Alarms', value:alarmCount, unit:'active', thresholds:{wr:3,er:10} },
    { label:'Sites', value:SCADA.sites.length, unit:'online', thresholds:{wr:0,er:0} },
  ]);

  var grid = document.getElementById('tag-grid');
  var ids = Object.keys(SCADA.tags).slice(0, 12);
  grid.innerHTML = ids.map(function(id) {
    var t = SCADA.tags[id];
    return '<div style="background:var(--card);border:1px solid var(--b);border-radius:3px;padding:4px 6px;font-size:7px">'
      +'<div style="color:var(--ig)">'+id.split('/').pop()+'</div>'
      +'<div style="color:var(--ok);font-size:10px;font-weight:700">'+(t.value||'—')+'</div>'
      +'<div style="color:var(--t2)">'+(t.udt_type||'')+'</div></div>';
  }).join('');

  journalRender(document.getElementById('alarm-mini'));
}
