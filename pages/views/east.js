// east.js — east dock status panel
function renderScadaEast(el) {
  el.innerHTML = '<div class="ph">📡 SYSTEM</div>'
    +'<div style="padding:4px 8px">'
    +'<div style="font-size:7.5px;padding:2px 0"><span style="color:var(--t2)">Status</span> <span style="color:var(--ok)">● RUN</span></div>'
    +'<div style="font-size:7.5px;padding:2px 0"><span style="color:var(--t2)">Tags</span> <span style="color:var(--wh)">'+Object.keys(SCADA.tags).length+'</span></div>'
    +'<div style="font-size:7.5px;padding:2px 0"><span style="color:var(--t2)">UDTs</span> <span style="color:var(--wh)">'+Object.keys(SCADA.udts).length+'</span></div>'
    +'<div style="font-size:7.5px;padding:2px 0"><span style="color:var(--t2)">Alarms</span> <span style="color:'+(journalActive().length?'var(--er)':'var(--ok)')+'">'+journalActive().length+'</span></div>'
    +'<div style="font-size:7.5px;padding:2px 0"><span style="color:var(--t2)">Updated</span> <span style="color:var(--t2)">'+(SCADA.ts?new Date(SCADA.ts).toLocaleTimeString():'—')+'</span></div>'
    +'</div>'
    +'<div class="ph">🔗 LINKS</div>'
    +'<div style="padding:4px 8px;font-size:7px">'
    +'<div><a href="https://teslasolar.github.io/GITPLC/" style="color:var(--ig);text-decoration:none">📐 GitPLC</a></div>'
    +'<div><a href="https://teslasolar.github.io/GITHMI/" style="color:var(--ig);text-decoration:none">🖥️ GitHMI</a></div>'
    +'<div><a href="https://teslasolar.github.io/GITTAG/" style="color:var(--ig);text-decoration:none">🏷️ GitTAG</a></div>'
    +'</div>';
}
