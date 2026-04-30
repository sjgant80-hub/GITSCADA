// data-bridge.js — fetch from all three repos (PLC, TAG, HMI)
var SCADA = { tags:{}, udts:{}, alarms:[], sites:[], ts:0 };

var REPOS = {
  plc: { owner:'teslasolar', repo:'GITPLC' },
  tag: { owner:'teslasolar', repo:'GITTAG', label:'gittag' },
  hmi: { owner:'teslasolar', repo:'GITHMI' },
};

async function fetchJSON(url) {
  try { var r = await fetch(url); return await r.json(); } catch { return null; }
}

async function loadTags() {
  var url = 'https://api.github.com/repos/'+REPOS.tag.owner+'/'+REPOS.tag.repo+'/issues?labels='+REPOS.tag.label+'&per_page=100&state=open';
  var issues = await fetchJSON(url);
  if (!Array.isArray(issues)) return 0;
  issues.forEach(function(iss) {
    var m = iss.body && iss.body.match(/```json\s*([\s\S]*?)```/);
    if (m) { try { var t = JSON.parse(m[1]); t._issue = iss.number; SCADA.tags[t.tag_path||iss.title] = t; } catch{} }
  });
  SCADA.ts = Date.now();
  return Object.keys(SCADA.tags).length;
}

async function loadUDTs() {
  var dirs = ['core','control','equipment'];
  var count = 0;
  for (var i=0; i<dirs.length; i++) {
    var files = await fetchJSON('https://api.github.com/repos/'+REPOS.plc.owner+'/'+REPOS.plc.repo+'/contents/'+dirs[i]);
    if (!Array.isArray(files)) continue;
    for (var j=0; j<files.length; j++) {
      if (!files[j].name.endsWith('.json')) continue;
      SCADA.udts[dirs[i]+'/'+files[j].name.replace('.json','')] = await fetchJSON(files[j].download_url);
      count++;
    }
  }
  return count;
}

async function loadSites() {
  var cfg = await fetchJSON('https://raw.githubusercontent.com/'+REPOS.plc.owner+'/GITSCADA/master/config/sites.json');
  if (cfg && cfg.sites) SCADA.sites = cfg.sites;
  return SCADA.sites.length;
}
