// kpi-card.js — KPI summary cards (OEE, availability, etc.)
function renderKPI(el, label, value, unit, thresholds) {
  var cls = 'ok';
  if (thresholds) {
    if (value < thresholds.er) cls = 'er';
    else if (value < thresholds.wr) cls = 'wr';
  }
  el.innerHTML = '<div class="kpi-card '+cls+'">'
    +'<div class="label">'+label+'</div>'
    +'<div class="value">'+value.toFixed(1)+'</div>'
    +'<div class="unit">'+unit+'</div></div>';
}

function renderKPIRow(el, kpis) {
  el.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">'
    + kpis.map(function(k) {
      var cls = 'ok';
      if (k.thresholds) {
        if (k.value < k.thresholds.er) cls = 'er';
        else if (k.value < k.thresholds.wr) cls = 'wr';
      }
      return '<div class="kpi-card '+cls+'">'
        +'<div class="label">'+k.label+'</div>'
        +'<div class="value">'+k.value.toFixed(1)+'</div>'
        +'<div class="unit">'+k.unit+'</div></div>';
    }).join('') + '</div>';
}
