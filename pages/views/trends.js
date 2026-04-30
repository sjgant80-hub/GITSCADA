// trends.js — trend view with canvas charts
function renderTrends(el) {
  var ids = Object.keys(SCADA.tags).slice(0, 6);
  if (!ids.length) { el.innerHTML = '<div style="color:var(--t2);padding:20px">No tags to trend</div>'; return; }
  el.innerHTML = '<h3 style="color:var(--ign);font-size:10px;margin-bottom:8px">📈 Trends</h3>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px">'
    + ids.map(function(id) {
      return '<div style="background:var(--card);border:1px solid var(--b);border-radius:4px;padding:6px">'
        +'<div style="font-size:8px;color:var(--ig);margin-bottom:4px">'+id+'</div>'
        +'<canvas id="trend-'+id.replace(/[^a-zA-Z0-9]/g,'_')+'" width="300" height="100"></canvas></div>';
    }).join('') + '</div>';

  ids.forEach(async function(id) {
    var points = await loadHistory(id);
    if (!points.length) points = generateMockPoints(20);
    var canvas = document.getElementById('trend-'+id.replace(/[^a-zA-Z0-9]/g,'_'));
    if (canvas) renderTrend(canvas, points, { label:id.split('/').pop(), color:'#38b5f9' });
  });
}

function generateMockPoints(n) {
  var pts = []; var v = 50;
  for (var i=0; i<n; i++) { v += (Math.random()-0.5)*10; pts.push({ts:Date.now()-n*60000+i*60000,value:v}); }
  return pts;
}
