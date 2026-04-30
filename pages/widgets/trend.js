// trend.js — canvas-based trend chart widget
function renderTrend(canvas, points, opts) {
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  var color = opts.color || '#38b5f9';
  var label = opts.label || '';

  ctx.fillStyle = '#0e1220';
  ctx.fillRect(0, 0, w, h);

  if (!points.length) { ctx.fillStyle = '#4a5a74'; ctx.fillText('No data', w/2-20, h/2); return; }

  var vals = points.map(function(p){ return p.value; });
  var min = Math.min.apply(null, vals);
  var max = Math.max.apply(null, vals);
  var range = max - min || 1;

  ctx.strokeStyle = '#1e2840';
  for (var g=0; g<5; g++) {
    var gy = h * g / 4;
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  points.forEach(function(p, i) {
    var x = i / (points.length - 1) * w;
    var y = h - (p.value - min) / range * h * 0.9 - h * 0.05;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = '#4a5a74'; ctx.font = '8px IBM Plex Mono';
  ctx.fillText(label, 4, 10);
  ctx.fillText(max.toFixed(1), 4, 20);
  ctx.fillText(min.toFixed(1), 4, h - 4);
}
