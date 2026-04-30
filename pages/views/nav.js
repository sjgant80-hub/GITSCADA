// nav.js — west dock navigation
var SCADA_VIEWS = ['dashboard','site-map','trends','alarms','config'];
var SCADA_ICONS = { dashboard:'📊', 'site-map':'🗺️', trends:'📈', alarms:'🔔', config:'⚙️' };
var currentScadaView = 'dashboard';

function renderScadaNav(el) {
  el.innerHTML = '<div class="ph">🏭 SCADA</div>'
    + SCADA_VIEWS.map(function(v) {
      return '<div class="nav-item'+(v===currentScadaView?' on':'')+'" onclick="switchView(\''+v+'\')">'
        + SCADA_ICONS[v]+' '+v.toUpperCase()+'</div>';
    }).join('')
    + '<div class="ph" style="margin-top:8px">🏢 SITES</div>'
    + SCADA.sites.map(function(s) {
      return '<div class="nav-item" onclick="switchView(\'dashboard\')">🏭 '+s.name+'</div>';
    }).join('')
    + '<div class="ph" style="margin-top:8px">📡 REPOS</div>'
    + '<div class="nav-item" style="font-size:7px">📐 GITPLC</div>'
    + '<div class="nav-item" style="font-size:7px">🖥️ GITHMI</div>'
    + '<div class="nav-item" style="font-size:7px">🏷️ GITTAG</div>';
}

function switchView(name) {
  currentScadaView = name;
  var main = document.getElementById('main-panel');
  renderScadaNav(document.getElementById('west-dock'));
  if (name === 'dashboard') renderDashboard(main);
  else if (name === 'site-map') renderSiteMap(main);
  else if (name === 'trends') renderTrends(main);
  else if (name === 'alarms') journalRender(main);
  else if (name === 'config') renderConfig(main);
}
