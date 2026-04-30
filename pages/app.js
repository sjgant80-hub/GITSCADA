// app.js — boot: header → sites → UDTs → tags → dashboard
(async function() {
  var h = document.getElementById('header');
  h.innerHTML = '<span style="color:var(--ign);font-weight:700;font-size:11px">🏭 GitSCADA</span>'
    +'<span style="color:var(--b);margin:0 6px">│</span>'
    +'<span id="state" style="color:var(--ok);font-size:8px">● BOOT</span>'
    +'<span style="flex:1"></span>'
    + SCADA_VIEWS.map(function(v) {
      return '<span class="btn" onclick="switchView(\''+v+'\')" style="margin-left:3px">'
        +SCADA_ICONS[v]+' '+v.toUpperCase().replace('-',' ')+'</span>';
    }).join('')
    +'<span style="color:var(--b);margin:0 6px">│</span>'
    +'<span class="btn" onclick="refresh()">↻</span>'
    +'<span id="clock" style="color:var(--t2);font-size:8px;margin-left:6px"></span>';

  setState('Loading sites...');
  await loadSites();

  setState('Loading UDTs...');
  var udtCount = await loadUDTs();

  setState('Loading tags...');
  var tagCount = await loadTags();

  renderScadaNav(document.getElementById('west-dock'));
  renderScadaEast(document.getElementById('east-dock'));

  document.getElementById('status-bar').innerHTML =
    '<span style="color:var(--ok)">● ONLINE</span>'
    +'<span style="color:var(--b);margin:0 4px">│</span>'
    +'<span style="color:var(--t2)">'+SCADA.sites.length+' sites · '+udtCount+' UDTs · '+tagCount+' tags</span>'
    +'<span style="flex:1"></span>'
    +'<span style="color:var(--t2)">GitSCADA · PLC+HMI+TAG</span>';

  setState('● RUN');
  switchView('dashboard');

  setInterval(async function() {
    await loadTags();
    renderScadaEast(document.getElementById('east-dock'));
    if (currentScadaView === 'dashboard') renderDashboard(document.getElementById('main-panel'));
  }, 30000);
  setInterval(function() { document.getElementById('clock').textContent = new Date().toLocaleTimeString(); }, 1000);
})();

function setState(t) { document.getElementById('state').textContent = t; }
async function refresh() { setState('Refreshing...'); await loadTags(); await loadUDTs(); switchView(currentScadaView); setState('● RUN'); }
