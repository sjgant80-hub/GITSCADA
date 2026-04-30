// historian.js — tag history snapshots (stored as GitHub Issues)
var HISTORY = {};

async function loadHistory(tagPath) {
  var url = 'https://api.github.com/repos/teslasolar/GITSCADA/issues?labels=gittag-history&per_page=50&state=all';
  var issues = await fetchJSON(url);
  if (!Array.isArray(issues)) return [];
  var points = [];
  issues.forEach(function(iss) {
    if (!iss.title.startsWith(tagPath)) return;
    var m = iss.body && iss.body.match(/```json\s*([\s\S]*?)```/);
    if (m) { try { var d = JSON.parse(m[1]); points.push({ ts:new Date(iss.created_at).getTime(), value:d.value, quality:d.quality||'good' }); } catch{} }
  });
  points.sort(function(a,b){ return a.ts - b.ts; });
  HISTORY[tagPath] = points;
  return points;
}

function getHistory(tagPath) { return HISTORY[tagPath] || []; }
