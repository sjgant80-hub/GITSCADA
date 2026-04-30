// alarm-journal.js — persistent alarm log
var JOURNAL = [];
var PRI_COLOR = { 1:'#ff2244', 2:'#ff4466', 3:'#f0a030', 4:'#38b5f9' };
var PRI_NAME = { 1:'CRIT', 2:'HIGH', 3:'MED', 4:'LOW' };

function journalAdd(tag, priority, msg) {
  JOURNAL.push({ tag:tag, priority:priority, msg:msg, ts:Date.now(), acked:false });
}

function journalAck(idx) {
  if (JOURNAL[idx]) JOURNAL[idx].acked = true;
}

function journalActive() { return JOURNAL.filter(function(a){ return !a.acked; }); }

function journalRender(el) {
  var items = JOURNAL.slice().reverse();
  if (!items.length) { el.innerHTML = '<div style="padding:20px;color:var(--ok);text-align:center">No alarms in journal</div>'; return; }
  el.innerHTML = '<table style="width:100%;font-size:8px;border-collapse:collapse">'
    +'<tr style="color:var(--ign);border-bottom:1px solid var(--b)"><th>Time</th><th>Tag</th><th>Pri</th><th>Message</th><th>State</th></tr>'
    + items.map(function(a,i) {
      var c = PRI_COLOR[a.priority];
      return '<tr style="border-bottom:1px solid var(--b)">'
        +'<td style="padding:2px;font-size:7px">'+new Date(a.ts).toLocaleTimeString()+'</td>'
        +'<td style="color:var(--ig)">'+a.tag+'</td>'
        +'<td style="color:'+c+'">'+PRI_NAME[a.priority]+'</td>'
        +'<td>'+a.msg+'</td>'
        +'<td>'+(a.acked?'<span style="color:var(--t2)">ACK</span>':'<span style="color:'+c+'">ACTIVE</span>')+'</td></tr>';
    }).join('') + '</table>';
}
