// sparkline.js — inline mini trend
function sparkline(values, w, h, color) {
  if (!values.length) return '';
  var min = Math.min.apply(null, values);
  var max = Math.max.apply(null, values);
  var range = max - min || 1;
  var points = values.map(function(v, i) {
    return (i / (values.length - 1) * w).toFixed(1) + ',' + (h - (v - min) / range * h * 0.8 - h * 0.1).toFixed(1);
  }).join(' ');
  return '<svg width="'+w+'" height="'+h+'" style="vertical-align:middle">'
    +'<polyline points="'+points+'" fill="none" stroke="'+(color||'#38b5f9')+'" stroke-width="1.2"/></svg>';
}
