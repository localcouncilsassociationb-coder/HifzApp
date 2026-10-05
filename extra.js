(()=>{
const $=s=>document.querySelector(s),Q=s=>document.querySelectorAll(s);
const E=(t,h)=>{const e=document.createElement(t);e.innerHTML=h||'';return e};
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const loc=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
const gap=(a,b)=>Math.round((new Date(b)-new Date(a))/864e5);
const OFF=()=>H.S.off===undefined?1:H.S.off;
const num=n=>String(n).replace(/\d/g,d=>'\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669'[d]);
window.AR='الفاتحة,البقرة,آل عمران,النساء,المائدة,الأنعام,الأعراف,الأنفال,التوبة,يونس,هود,يوسف,الرعد,إبراهيم,الحجر,النحل,الإسراء,الكهف,مريم,طه,الأنبياء,الحج,المؤمنون,النور,الفرقان,الشعراء,النمل,القصص,العنكبوت,الروم,لقمان,السجدة,الأحزاب,سبأ,فاطر,يس,الصافات,ص,الزمر,غافر,فصلت,الشورى,الزخرف,الدخان,الجاثية,الأحقاف,محمد,الفتح,الحجرات,ق,الذاريات,الطور,النجم,القمر,الرحمن,الواقعة,الحديد,المجادلة,الحشر,الممتحنة,الصف,الجمعة,المنافقون,التغابن,الطلاق,التحريم,الملك,القلم,الحاقة,المعارج,نوح,الجن,المزمل,المدثر,القيامة,الإنسان,المرسلات,النبأ,النازعات,عبس,التكوير,الانفطار,المطففين,الانشقاق,البروج,الطارق,الأعلى,الغاشية,الفجر,البلد,الشمس,الليل,الضحى,الشرح,التين,العلق,القدر,البينة,الزلزلة,العاديات,القارعة,التكاثر,العصر,الهمزة,الفيل,قريش,الماعون,الكوثر,الكافرون,النصر,المسد,الإخلاص,الفلق,الناس'.split(',');
const JN='الم,سيقول,تلك الرسل,لن تنالوا,والمحصنات,لا يحب الله,وإذا سمعوا,ولو أننا,قال الملأ,واعلموا,يعتذرون,وما من دابة,وما أبرئ,ربما,سبحان الذي,قال ألم,اقترب للناس,قد أفلح,وقال الذين,أمن خلق,اتل ما أوحي,ومن يقنت,وما لي,فمن أظلم,إليه يرد,حم,قال فما خطبكم,قد سمع الله,تبارك الذي,عم'.split(',');
let P={},PH={},V=null,M={},q=[],qi=0,ri=0,rr=0,playing=false;
const A=new Audio();

document.head.appendChild(E('style',`
[data-dir=ltr] footer{flex-direction:row-reverse}
.w.m{text-decoration:underline dotted var(--accent) 2px;text-underline-offset:.3em}
.w.hid:not(.r).m{text-decoration:none}
.w.pl{background:var(--tint);border-radius:.18em}
#aud{display:none}#aud.on{display:flex}

.rec-note{color:var(--muted);font-size:.92rem}.rec-live{display:flex;justify-content:space-between;gap:10px;padding:8px 10px;margin:8px 0;border:1px solid var(--line);border-radius:8px}.rec-live span:last-child{color:var(--muted)}.rec-ayah-results{max-height:38vh;overflow:auto;border:1px solid var(--line);border-radius:8px;padding:0 10px}.rec-ayah-row{display:flex;justify-content:space-between;gap:10px;align-items:center;border-top:1px solid var(--line);padding:8px 0}.rec-ayah-row:first-child{border-top:0}.rec-ayah-row em{color:var(--muted);font-style:normal}.rec-review{margin:3px}.rec-testing .page .w{visibility:hidden}.rec-testing .page .sur{visibility:hidden}.rec-testing #hid{opacity:.55}.rec-testing .page{opacity:.9}#recDlg::backdrop{background:transparent}.rec-status{margin:12px 0;padding:10px;border:1px solid var(--line);border-radius:8px}.rec-transcript{min-height:70px;padding:10px;border:1px solid var(--line);border-radius:8px;direction:rtl;font:24px/1.9 Khatt,serif;white-space:pre-wrap}.rec-score{display:flex;gap:14px;align-items:baseline;margin:12px 0;font-size:1.05rem}.rec-score b{font-size:2rem;color:var(--accent)}.rec-missing{direction:rtl;font:22px/1.8 Khatt,serif}.recDlg{}
dialog hr{border:0;border-top:1px solid var(--line)}
dialog .row button[data-p]{min-height:34px}
.mk{position:absolute;top:50%;transform:translateY(-50%);direction:ltr;text-align:right;white-space:nowrap;font:calc(var(--fs,40px)*.4)/1.15 Khatt,serif;color:var(--accent);pointer-events:none;z-index:3}.mk.r{left:100%;margin-left:8px;right:auto;text-align:left;font-size:calc(var(--fs,40px)*.62);line-height:1.15}
.page{position:relative}
.w{position:relative}
.ayah-tool{position:absolute;left:100%;top:50%;transform:translateY(-50%);margin-left:6px;width:24px;height:24px;min-height:24px;padding:0;border:1px solid var(--line);border-radius:50%;background:var(--paper);color:var(--accent);font:14px/22px system-ui,sans-serif;cursor:pointer;z-index:4;opacity:.72}.ayah-tool:hover,.ayah-tool:focus{opacity:1}.ayah-tool.booked{background:var(--accent);color:var(--paper)}
main{padding-top:34px;padding-bottom:34px}
.hd,.ft{position:absolute;left:0;right:0;display:flex;justify-content:space-between;align-items:flex-end;direction:ltr;color:var(--ink);font:calc(var(--fs,40px)*.78)/1.3 Khatt,serif;white-space:nowrap}
.hd{bottom:100%;padding:0 4px 2px}
.hd b{font-weight:700;font-size:1.35em}
.ft{top:100%;justify-content:center;padding-top:2px}
.sur b{font:calc(var(--fs,40px)*.78)/1.3 Khatt,serif}
.page{min-height:calc(var(--fs,40px)*27.2 + 30px)}

[data-rule=on] .page .line:not(.sur):not(:last-child){border-bottom:1px solid var(--line);border-bottom-color:color-mix(in srgb,var(--ink) 24%,transparent)}
.g{font:26px Khatt,serif;display:inline-block;min-width:1.6em;text-align:center;color:var(--ink)}
.df{color:#d9534f;font-weight:700}
.dim{opacity:.5}
.ar.sm{font-size:24px}
.key{font-size:.8rem}
.wg{display:flex;flex-wrap:wrap;direction:rtl;gap:6px}
.wc{text-align:center;border:1px solid var(--line);border-radius:8px;padding:4px 8px;min-width:64px}
.wc.sel{background:var(--tint);border-color:var(--accent)}
.wc .a{font:26px/1.8 Khatt,serif;color:var(--ink)}
.wc small{display:block;font-size:.8rem;line-height:1.3;color:var(--muted)}
.wc .u{direction:rtl;font-size:.95rem;color:var(--ink)}
.wc .e{direction:ltr}
.wc.big{display:inline-block;padding:8px 18px}.wc.big .a{font-size:40px}.wc.big small{font-size:1rem}
.ur{direction:rtl;font-size:1.15rem;line-height:1.9;color:var(--ink)!important}
input[type=checkbox]{min-height:auto;width:20px;height:20px}
.hl{background:var(--tint);color:var(--accent);border-radius:.2em}
dialog{max-height:88vh;overflow:auto}
.ar{font:28px/1.9 Khatt,serif;direction:rtl;color:var(--ink)!important}
`));

/* ---------- colours and page direction ---------- */
const PRE={Light:['#e8eeeb','#ffffff','#14231f','#0e5a4a'],Sepia:['#e9dcc3','#f6ecd6','#3b2f1e','#7a4a1c'],Dark:['#0d1513','#15201d','#e6efe9','#5fc3a6'],Black:['#000000','#000000','#e8e8e8','#5fc3a6']};
const cur=()=>{const g=k=>getComputedStyle(document.documentElement).getPropertyValue('--'+k).trim();return{bg:g('bg'),paper:g('paper'),ink:g('ink'),accent:g('accent')}};
function theme(){
  const r=document.documentElement.style,T=H.S.theme,ltr=H.S.dir=='ltr';
  ['bg','paper','ink','accent'].forEach(k=>T?r.setProperty('--'+k,T[k]):r.removeProperty('--'+k));
  [['--mask',18],['--tint',12]].forEach(([p,n])=>T?r.setProperty(p,'color-mix(in srgb,'+T.ink+' '+n+'%,transparent)'):r.removeProperty(p));
  document.documentElement.dataset.dir=ltr?'ltr':'ar';
  document.documentElement.dataset.rule=H.S.rule===false?'off':'on';
  $('#rl').checked=H.S.rule!==false;$('#po').value=OFF();
  $('#nx').textContent=ltr?'Next page \u25B6':'\u25C0 Next page';
  $('#pv').textContent=ltr?'\u25C0 Previous page':'Previous page \u25B6';
  const c=cur();$('#cb').value=c.bg;$('#cp').value=c.paper;$('#ct').value=c.ink;$('#dr').value=ltr?'ltr':'ar';
}
const dlg=$('#dlg');
dlg.insertBefore(E('div',`<h2>Meanings</h2><p>Tap a word to see these.</p><div class="row"><label><input type="checkbox" id="lwu"> Word: Urdu</label><label><input type="checkbox" id="lwe"> Word: English</label><label><input type="checkbox" id="ltu"> Translation: Urdu</label><label><input type="checkbox" id="lte"> Translation: English</label></div>`),dlg.children[0]);
dlg.insertBefore(E('div','<h2>Page</h2><div class="row"><label><input type="checkbox" id="lrl"> Show lines between the text lines</label></div>'),dlg.children[0]);
$('#lrl').checked=H.S.rule!==false;$('#lrl').onchange=()=>{H.S.rule=$('#lrl').checked;H.save();theme()};
['wu','we','tu','te'].forEach(id=>{const c=$('#l'+id);c.checked=(H.S.lg||{})[id]!=0;c.onchange=()=>{H.S.lg=Object.assign({wu:1,we:1,tu:1,te:1},H.S.lg||{});H.S.lg[id]=c.checked?1:0;H.save()}});
dlg.insertBefore(E('div',`<h2>Display</h2>
<div class="row"><label>Theme <select id="th"><option value="">Auto (device)</option>${Object.keys(PRE).map(k=>`<option>${k}</option>`).join('')}</select></label></div>
<div class="row"><label>Screen <input type="color" id="cb"></label><label>Page <input type="color" id="cp"></label><label>Text <input type="color" id="ct"></label></div>
<div class="row"><label><input type="checkbox" id="rl"> Line dividers</label></div>
<div class="row"><label>Header page number <select id="po"><option value="1">App page + 1 (as in your reference)</option><option value="0">Same as app page</option></select></label></div>
<div class="row"><label>Page turning <select id="dr"><option value="ar">Arabic: next page on the left</option><option value="ltr">Left to right: next page on the right</option></select></label></div>
<h2>Signs guide</h2><p><span class="g">\u06D8</span> Stop here (م)</p><p><span class="g">\u06D9</span> Do not stop (لا)</p><p><span class="g">\u06D7</span> Stopping is better (قلے)</p><p><span class="g">\u06D6</span> Continuing is better (صلے)</p><p><span class="g">\u06DA</span> Stop or continue, both fine (ج)</p><p><span class="g">\u0615</span> Stopping is fine (ط)</p><p><span class="g">\u06DB</span> Stop at one of the two dots, not both (معانقہ)</p><p><span class="g">\u06E9</span> Sajdah: prostration</p><p><span class="g">\u0639</span> Ruku ends here; the number counts rukus in the surah</p><h2>Mutashabihat</h2><p id="mst"></p>
<div class="row"><label>Import JSON <input type="file" id="mi" accept=".json,application/json"></label></div>`),dlg.children[0]);
$('#th').onchange=e=>{const v=e.target.value;H.S.theme=v?{bg:PRE[v][0],paper:PRE[v][1],ink:PRE[v][2],accent:PRE[v][3]}:null;H.save();theme()};
['cb','cp','ct'].forEach((id,i)=>$('#'+id).oninput=e=>{const T=H.S.theme||cur();T[['bg','paper','ink'][i]]=e.target.value;H.S.theme=T;H.save();theme()});
$('#rl').onchange=e=>{H.S.rule=e.target.checked;H.save();theme()};
$('#po').onchange=e=>{H.S.off=+e.target.value;H.save();frames()};
$('#dr').onchange=e=>{H.S.dir=e.target.value;H.save();theme()};

/* ---------- verse index ---------- */
function build(){
  V={};window.__HIFZ_V=V;let ck='',cc=0;
  H.D.pages.forEach((L,i)=>L.forEach(l=>{
    if(l[0])return;let[s,a]=l[3].split(':').map(Number);
    if(l[3]!=ck){ck=l[3];cc=0}
    l[4]=l[2].split(' ').map(w=>{const k=s+':'+a,v=V[k]||(V[k]={p:i+1,t:[]});
      if(w.charCodeAt(0)!=0x6dd){v.t.push(w);return ++cc}
      a++;cc=0;ck=s+':'+a;return 0});
  }));
}
function tag(){
  [[H.el,H.page],[$('#page2'),H.page+1]].forEach(([pe,pn])=>{
    if(pe.hidden)return;const ls=pe.children;
    H.D.pages[pn-1].forEach((l,i)=>{if(l[0]||!ls[i])return;ls[i].querySelectorAll('.w').forEach((w,j)=>{w.dataset.i=l[4][j]})});
  });
}
const pk=()=>[...new Set([...Q('.page .w[data-v]')].map(w=>w.dataset.v))].sort((a,b)=>{const[x,y]=a.split(':'),[u,v]=b.split(':');return x-u||y-v});
const nm=k=>H.D.surahs[k.split(':')[0]-1]+' '+k;

/* ---------- mutashabihat ---------- */
const norm=k=>{const m=String(k).match(/(\d+)\D+(\d+)/);return m?+m[1]+':'+ +m[2]:null};
function setP(j){
  PH=j.phrases;P={};
  Object.entries(PH).forEach(([id,o])=>Object.entries(o).forEach(([k,rs])=>rs.forEach(r=>(P[k]=P[k]||[]).push([r[0],r[1],id]))));
  $('#mst').textContent=Object.keys(PH).length+' phrases loaded, '+Object.keys(P).length+' ayahs marked.';
  V&&hook();
}
const cov=(k,i)=>(P[k]||[]).filter(r=>i>=r[0]&&i<=r[1]);
const srt=(a,b)=>{const[x,y]=a.split(':'),[u,v]=b.split(':');return x-u||y-v};
function setM(j){
  const f0=j&&!Array.isArray(j)?Object.values(j)[0]:0;
  if(f0&&f0.ayah)j={phrases:Object.fromEntries(Object.entries(j).map(([i,o])=>[i,o.ayah]))};
  if(j&&j.phrases)return setP(j);
  let gs=Array.isArray(j)?j:Array.isArray(j.groups)?j.groups:Array.isArray(j.data)?j.data:Object.entries(j).map(([k,v])=>[k].concat(v));
  M={};let n=0;
  gs.forEach(g=>{
    let ks=Array.isArray(g)?g:(g.verses||g.ayahs||g.keys||g.refs||[]),note=Array.isArray(g)?'':(g.note||g.text||g.title||'');
    ks=ks.map(norm).filter(Boolean);if(ks.length<2)return;n++;
    ks.forEach(k=>(M[k]=M[k]||[]).push({ks,note}));
  });
  if(!n){$('#mst').textContent='No usable data in that file. The built-in mutashabihat data is used instead.';return}
  $('#mst').textContent=n+' groups loaded, '+Object.keys(M).length+' ayahs marked.';
  V&&hook();
}
$('#mst').textContent='None loaded. Import your JSON below.';
$('#mi').onchange=e=>{const f=e.target.files[0];if(!f)return;
  f.text().then(t=>{setM(JSON.parse(t));if(Object.keys(M).length)try{localStorage.setItem('hifzM',t)}catch(x){}}).catch(()=>{$('#mst').textContent='That file could not be read. Check the JSON format.'})};
fetch('data/mutashabihat.json').then(r=>r.ok?r.json():Promise.reject()).then(j=>{setM(j);try{localStorage.removeItem('hifzM')}catch(e){}})
  .catch(()=>{try{const t=localStorage.getItem('hifzM');if(t)setM(JSON.parse(t))}catch(e){}});
const md=E('dialog');document.body.appendChild(md);
function show(k){
  const t=x=>V[x]?esc(V[x].t.join(' ')):'';
  let h=`<h2>${nm(k)}</h2><p class="ar">${t(k)}</p>`;
  M[k].forEach(g=>{
    if(g.note)h+=`<p>${esc(g.note)}</p>`;
    g.ks.filter(x=>x!=k).forEach(x=>{h+=`<hr><p><b>${nm(x)}</b>, page ${V[x]?V[x].p:'?'} <button data-p="${V[x]?V[x].p:1}">Go to page</button></p><p class="ar">${t(x)}</p>`});
  });
  md.innerHTML=h+'<div class="row"><button data-x>Close</button></div>';md.showModal();
}
let LP=null;
function lcs(A,B){const n=A.length,m=B.length,d=Array.from({length:n+1},()=>new Array(m+1).fill(0));
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)d[i][j]=A[i-1]==B[j-1]?d[i-1][j-1]+1:Math.max(d[i-1][j],d[i][j-1]);
  const r=new Array(m).fill(false);let i=n,j=m;
  while(i&&j){if(A[i-1]==B[j-1]){r[j-1]=true;i--;j--}else if(d[i-1][j]>=d[i][j-1])i--;else j--}
  return r}
const sn=w=>w.normalize('NFD').replace(/[\p{M}\u0640\u06DD-\u06E9]/gu,'');
function showP(k,rs,all){
  all=all||{};LP={k,rs,all};
  rs=[...rs].sort((a,b)=>(b[1]-b[0])-(a[1]-a[0]));
  const inr=(rg,i)=>rg.some(r=>i>=r[0]&&i<=r[1]);
  const tok=(x,rg,ref)=>{const t=V[x]?V[x].t:[];let m=[];
    if(ref){m=lcs(ref,t.slice(rg[0][0]-1,rg[0][1]).map(sn))}
    return t.map((w,i)=>{
      if(!inr(rg,i+1))return ref?'<span class="dim">'+w+'</span>':w;
      if(ref&&!m[i+1-rg[0][0]])return '<span class="df">'+w+'</span>';
      return '<span class="hl">'+w+'</span>'}).join(' ')};
  let h=`<h2>${nm(k)}</h2><p class="ar sm">${tok(k,rs.map(r=>[r[0],r[1]]))}</p>
<p class="key"><span class="hl">same words</span> <span class="df">different words</span> <span class="dim">outside the shared phrase</span></p>`;
  const seen={};
  rs.forEach(r=>{
    if(seen[r[2]])return;seen[r[2]]=1;
    const o=PH[r[2]],ks=Object.keys(o).filter(x=>x!=k).sort(srt),ph=V[k].t.slice(r[0]-1,r[1]),A=ph.map(sn),lim=all[r[2]]?ks.length:12;
    h+=`<hr><p><b>${ph.join(' ')}</b><br>also appears in ${ks.length} other place${ks.length==1?'':'s'}:</p>`;
    ks.slice(0,lim).forEach(x=>{h+=`<p><b>${nm(x)}</b>, page ${V[x]?V[x].p:'?'} <button data-p="${V[x]?V[x].p:1}">Go to page</button></p><p class="ar sm">${tok(x,o[x],A)}</p>`});
    if(ks.length>lim)h+=`<p><button data-m="${r[2]}">Show all ${ks.length}</button></p>`;
  });
  md.innerHTML=h+'<div class="row"><button data-x>Close</button></div>';
  if(!md.open)md.showModal();
}
md.onclick=e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.m){LP.all[b.dataset.m]=1;return showP(LP.k,LP.rs,LP.all)}
  md.close();if(b.dataset.p)H.go(b.dataset.p)};
/* ---------- tap a word: meanings and translations ---------- */
let MN=null,LW=null;
const MG={'2:181':3,'8:6':4,'13:37':8,'72:16':1};
const mj=(k,i)=>MG[k]&&i>MG[k]?i-1:i;
const wd=E('dialog');document.body.appendChild(wd);
const loadMN=()=>MN?Promise.resolve(MN):fetch('data/meanings.json').then(r=>r.json()).then(j=>MN=j);
const LG=()=>H.S.lg=Object.assign({wu:1,we:1,tu:1,te:1},H.S.lg||{});
function showW(k,i){
  if(!MN){
    wd.innerHTML='<p>Loading meanings...</p>';if(!wd.open)wd.showModal();
    return loadMN().then(()=>showW(k,i)).catch(()=>{wd.innerHTML='<p>Could not load the meanings. Connect to the internet once and try again.</p><div class="row"><button data-x>Close</button></div>'});
  }
  LW={k,i};const g=LG(),T=V[k].t,J=i?mj(k,i):0,n=MN.we[k].length,AK=Object.keys(V),ix=AK.indexOf(k);
  const cells=[];for(let j=1;j<=n;j++)cells.push(T.filter((_,x)=>mj(k,x+1)==j).join(' '));
  const mean=j=>(g.wu?`<small class="u">${esc(MN.wu[k][j-1]||'')}</small>`:'')+(g.we?`<small class="e">${esc(MN.we[k][j-1]||'')}</small>`:'');
  let h=`<h2>${nm(k)}${J?', word '+J:''}</h2>`;
  if(J)h+=`<div class="wc sel big"><div class="a">${cells[J-1]}</div>${mean(J)}</div>`;
  h+=`<p class="key">Word by word</p><div class="wg">${cells.map((a,x)=>`<div class="wc${x+1==J?' sel':''}"><div class="a">${a}</div>${mean(x+1)}</div>`).join('')}</div>`;
  if(g.tu)h+=`<hr><p class="key">Urdu translation (Fateh Muhammad Jalandhari)</p><p class="ur">${esc(MN.tu[k])}</p>`;
  if(g.te)h+=`<hr><p class="key">English translation (M.A.S. Abdel Haleem)</p><p>${esc(MN.te[k])}</p>`;
  const c=J?cov(k,i):[];
  if(c.length){const s=new Set(c.flatMap(r=>Object.keys(PH[r[2]]).filter(y=>y!=k)));h+=`<hr><div class="row"><button data-sim>Mutashabihat: ${s.size} other place${s.size==1?'':'s'}</button></div>`}
  h+=`<hr><div class="row"><button data-n="-1"${ix<1?' disabled':''}>Previous ayah</button><button data-n="1"${ix>=AK.length-1?' disabled':''}>Next ayah</button><button data-p="${V[k].p}">Go to page</button><button data-x>Close</button></div>`;
  wd.innerHTML=h;if(!wd.open)wd.showModal();
}
wd.onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.dataset.n){const AK=Object.keys(V);return showW(AK[AK.indexOf(LW.k)+ +b.dataset.n],0)}
  wd.close();
  if(b.dataset.sim)showP(LW.k,cov(LW.k,LW.i));
  if(b.dataset.p)H.go(b.dataset.p)};
$('main').addEventListener('click',e=>{
  const w=e.target.closest('.w');if(!w||w.classList.contains('hid')||!w.dataset.v||!V)return;
  const k=w.dataset.v,i=+w.dataset.i;
  if(H.S.mean!==false)return showW(k,i);
  if(H.S.sim===false)return;const c=cov(k,i);if(c.length)showP(k,c);else if(M[k])show(k);
});

/* ---------- Hifz plan and progress: persistent Sabaq / Sabqi / Manzil ---------- */
const pd=E('dialog');pd.id='planDlg';pd.innerHTML=`<h2>Hifz Plan</h2>
<p>Your plan is saved in this browser. <b>Sabaq</b> is new memorization, <b>Sabqi</b> is recent revision, and <b>Manzil</b> is older revision. The app keeps a daily record of the pages assigned and whether each section was completed.</p>
<div id="planMsg" role="status"></div><div id="pb"></div><hr>
<h3>Plan settings</h3>
<div class="row"><label>Sabaq pages/day <input id="pn" type="number" min="1" max="10" style="width:64px"></label>
<label>Sabqi: revise memorized pages from last <input id="pk" type="number" min="1" max="60" style="width:64px"> days</label></div>
<div class="row"><label>Manzil pages/day <input id="pm" type="number" min="0" max="40" style="width:64px"></label>
<label>New Sabaq starts at page <input id="ps" type="number" min="1" max="548" style="width:72px"></label>
<label><select id="pr"><option value="1">Move forward</option><option value="-1">Move backward</option></select></label></div>
<h3>Manzil section</h3>
<p>Choose the actual Mushaf section you want to revise as Manzil. This range is saved and is used every day instead of silently picking arbitrary old pages.</p>
<div class="row"><label>From page <input id="mf" type="number" min="1" max="548" style="width:72px"></label><label>To page <input id="mt" type="number" min="1" max="548" style="width:72px"></label>
<label><select id="md"><option value="1">Forward</option><option value="-1">Backward</option></select></label></div>
<div class="row"><button data-save-settings>Save plan settings</button><button data-reset-plan>Regenerate today's plan</button><button data-progress="1">Open Progress</button><button data-x>Close</button></div>`;
document.body.appendChild(pd);

const planDefaults={n:1,k:7,m:5,start:1,dir:1,mp:0,day:null,manFrom:1,manTo:548,manDir:1,history:{}};
function pageLabel(pg){let si=0,ji=0;if(H.D?.surahPage)H.D.surahPage.forEach((sp,i)=>{if(sp<=pg)si=i});if(H.D?.juzPage)H.D.juzPage.forEach((jp,i)=>{if(jp<=pg)ji=i});return `Page ${pg} · Juz ${ji+1} · ${H.D?.surahs?.[si]||''}`;}
function plan(){
  const P=H.S.plan=Object.assign({},planDefaults,H.S.plan||{});
  P.history=Object.assign({},P.history||{});
  const t=loc(),d=H.S.done||{};
  if(!P.day||P.day.d!==t){
    const sab=[];let p=Number(P.start)||1;
    while(sab.length<P.n&&p>=1&&p<=548){if(!d[p])sab.push(p);p+=P.dir}
    const mem=Object.keys(d).map(Number).sort((a,b)=>a-b);
    const rec=mem.filter(x=>d[x]!==t&&gap(d[x],t)<=P.k);
    let mf=Math.max(1,Math.min(548,Number(P.manFrom)||1)),mt=Math.max(1,Math.min(548,Number(P.manTo)||548));
    if(mf>mt)[mf,mt]=[mt,mf];
    const old=mem.filter(x=>x>=mf&&x<=mt&&gap(d[x],t)>P.k);
    const man=[];let mp=P.mp||0;
    for(let i=0;i<Math.min(P.m,old.length);i++)man.push(old[(mp+i)%old.length]);
    P.day={d:t,sab,rec,man,completed:{s:false,q:false,m:false},assigned:{s:[...sab],q:[...rec],m:[...man]},manSection:{from:mf,to:mt,direction:P.manDir}};
    P.history[t]=JSON.parse(JSON.stringify(P.day));
  }
  return P;
}
function planUI(){
  const P=plan(),D=P.day;
  const sec=(k,t,desc,a,autoMem)=>`<div class="plan-section"><p><b>${t}</b> — ${desc}</p><div class="plan-list">${a.length?a.map(pg=>`<div class="plan-item"><span>${pageLabel(pg)}${H.S.done[pg]?' ✓':''}</span><span><button data-p="${pg}">Open</button></span></div>`).join(''):'<span>Nothing assigned.</span>'}</div><div class="row">${a.length?`<button data-d="${k}" ${D.completed?.[k]?'disabled':''}>${D.completed?.[k]?'Completed today':'Mark section complete'}</button>`:''}</div>${autoMem?'<small>Completing Sabaq records these pages as memorized.</small>':''}</div>`;
  $('#pb').innerHTML=sec('s','Sabaq','new memorization',D.sab,true)+sec('q','Sabqi','recent memorization revision',D.rec,false)+sec('m','Manzil',`older revision · pages ${D.manSection?.from||P.manFrom}–${D.manSection?.to||P.manTo}`,D.man,false)+`<div class="plan-section"><p><b>Today's record</b></p><p>Saved as <b>${D.d}</b>. Sabaq: ${D.sab.length} pages · Sabqi: ${D.rec.length} pages · Manzil: ${D.man.length} pages.</p></div>`;
  $('#pn').value=P.n;$('#pk').value=P.k;$('#pm').value=P.m;$('#ps').value=P.start;$('#pr').value=P.dir;$('#mf').value=P.manFrom;$('#mt').value=P.manTo;$('#md').value=P.manDir;
}
function savePlanSettings(){
  const P=plan(),g=id=>Math.max(0,parseInt($('#'+id).value)||0);
  P.n=Math.max(1,g('pn'));P.k=Math.max(1,g('pk'));P.m=g('pm');P.start=Math.min(548,Math.max(1,g('ps')));P.dir=parseInt($('#pr').value)||1;
  P.manFrom=Math.min(548,Math.max(1,g('mf')));P.manTo=Math.min(548,Math.max(1,g('mt')));P.manDir=parseInt($('#md').value)||1;
  if(P.manFrom>P.manTo)[P.manFrom,P.manTo]=[P.manTo,P.manFrom];
  P.day=null;planUI();H.save();$('#planMsg').textContent='Plan settings saved. Today’s assignment has been updated.';
}
pd.onclick=e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.x!==undefined)return pd.close();
  if(b.dataset.progress){pd.close();return openProgress()}
  if(b.dataset.saveSettings!==undefined){savePlanSettings();return}
  if(b.dataset.resetPlan!==undefined){const P=plan();P.day=null;planUI();H.save();$('#planMsg').textContent='Today’s plan was regenerated from your saved settings.';return}
  if(b.dataset.p){pd.close();return H.go(+b.dataset.p)}
  if(b.dataset.d){
    const P=plan(),k=b.dataset.d,D=P.day;D.completed=D.completed||{};D.assigned=D.assigned||{s:[...D.sab],q:[...D.rec],m:[...D.man]};
    if(k==='s')D.sab.forEach(pg=>H.S.done[pg]=loc());
    D.completed[k]=true;
    P.history[D.d]=JSON.parse(JSON.stringify(D));
    if(k==='m'&&D.man.length){P.mp=(P.mp+D.man.length)%Math.max(1,Math.max(D.man.length,Object.keys(H.S.done||{}).length));}
    H.save();planUI();H.render();
  }
};

let progDlg=null;
function openProgress(){
  if(!progDlg){progDlg=E('dialog');progDlg.id='progressDlg';document.body.appendChild(progDlg);progDlg.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.x!==undefined)progDlg.close();if(b.dataset.go)H.go(+b.dataset.go);if(b.dataset.clear){delete H.S.done[b.dataset.clear];H.save();renderProgress()}}}
  renderProgress();progDlg.showModal();
}
window.openHifzPlan=()=>{planUI();pd.showModal()};
window.openHifzProgress=()=>openProgress();
function renderProgress(){
  const d=H.S.done||{},pages=Object.keys(d).map(Number).sort((a,b)=>a-b),today=loc(),recent=pages.filter(p=>d[p]===today).length,pct=Math.round(pages.length/548*100);
  const P=H.S.plan||planDefaults,hist=Object.values(P.history||{}).sort((a,b)=>String(b.d).localeCompare(String(a.d))),days=hist.length;
  const sabaq=hist.reduce((n,x)=>n+(x.sab?.length||0),0),sabqi=hist.reduce((n,x)=>n+(x.rec?.length||0),0),manzil=hist.reduce((n,x)=>n+(x.man?.length||0),0);
  const list=pages.slice().reverse().slice(0,150).map(p=>`<div class="plan-item"><span>${pageLabel(p)} — memorized ${d[p]}</span><span><button data-go="${p}">Open</button> <button data-clear="${p}">Unmark</button></span></div>`).join('');
  const pageList=a=>(a||[]).join(', ')||'—';const history=hist.slice(0,30).map(x=>`<details class="plan-history"><summary><b>${x.d}</b> · Sabaq ${x.sab?.length||0} · Sabqi ${x.rec?.length||0} · Manzil ${x.man?.length||0}</summary><p><b>Sabaq:</b> ${esc(pageList(x.sab))}<br><b>Sabqi:</b> ${esc(pageList(x.rec))}<br><b>Manzil:</b> ${esc(pageList(x.man))}</p><p>${x.completed?.s?'Sabaq ✓ ':''}${x.completed?.q?'Sabqi ✓ ':''}${x.completed?.m?'Manzil ✓':''}</p></details>`).join('');
  progDlg.innerHTML=`<h2>Memorization Progress</h2><div class="progress-grid"><div class="progress-card"><b>${pages.length}</b>pages memorized</div><div class="progress-card"><b>${pct}%</b>of Mushaf</div><div class="progress-card"><b>${recent}</b>marked today</div></div><div class="progress-grid"><div class="progress-card"><b>${sabaq}</b>Sabaq pages planned</div><div class="progress-card"><b>${sabqi}</b>Sabqi pages planned</div><div class="progress-card"><b>${manzil}</b>Manzil pages planned</div></div><p>Your memorized pages are stored in <b>Progress</b>, while the daily Sabaq/Sabqi/Manzil assignments are stored as dated plan records. The Manzil section is ${P.manFrom||1}–${P.manTo||548}.</p><h3>Recent plan records</h3><div class="plan-list">${history||'<p>No plan records yet. Open Plan and save your settings.</p>'}</div><h3>Memorized pages</h3><div class="plan-list">${list||'<p>No pages marked memorized yet.</p>'}</div><div class="row"><button data-x>Close</button></div>`;
}
/* ---------- audio: Sheikh Shuraym, repeat ---------- */
const url=k=>{const[s,a]=k.split(':');return 'https://everyayah.com/data/Saood_ash-Shuraym_128kbps/'+s.padStart(3,'0')+a.padStart(3,'0')+'.mp3'};
const rep=id=>$('#'+id).value;
function mark(){
  Q('.w.pl').forEach(w=>w.classList.remove('pl'));
  if(playing&&q[qi])Q('.w[data-v="'+q[qi]+'"]').forEach(w=>w.classList.add('pl'));
}
function say(t){$('#as').textContent=t||''}
function stop(m){A.pause();playing=false;$('#ap').textContent='Play';mark();say(m)}
function next(){
  A.src=url(q[qi]);A.play().catch(()=>stop('Could not play. Check your internet connection.'));
  mark();say(q[qi]+'  (ayah '+(qi+1)+' of '+q.length+')');
}
A.onerror=()=>playing&&stop('Could not load the audio. Check your internet connection.');
A.onended=()=>{
  ri++;if(ri<+rep('ae'))return next();
  ri=0;qi++;if(qi<q.length)return next();
  qi=0;rr++;if(rep('ar2')=='0'||rr<+rep('ar2'))return next();
  stop('Finished.');
};
const hd=$('header');
hd.appendChild(E('div',`<select id="af" aria-label="From ayah"></select><select id="at" aria-label="To ayah"></select>
<label>Each ayah <select id="ae"><option>1</option><option>2</option><option>3</option><option selected>5</option><option>10</option></select>x</label>
<label>Whole range <select id="ar2"><option>1</option><option>2</option><option>3</option><option>5</option><option>10</option><option value="0">Endless</option></select>x</label>
<button id="ap">Play</button><span id="as" role="status"></span>`)).className='ctl';
hd.lastChild.id='aud';
function fillAud(){
  if(playing)return;
  const ks=pk(),o=ks.map(k=>`<option>${k}</option>`).join('');
  $('#af').innerHTML=o;$('#at').innerHTML=o;$('#at').selectedIndex=ks.length-1;
}
$('#ap').onclick=()=>{
  if(playing)return stop();
  const ks=pk();let f=ks.indexOf(rep('af')),t=ks.indexOf(rep('at'));if(f<0)f=0;if(t<f)t=f;
  q=ks.slice(f,t+1);qi=ri=rr=0;playing=true;$('#ap').textContent='Stop';next();
};

/* ---------- header buttons ---------- */
const bar=$('.ctl');
[['mean','Meanings'],['aub','Audio'],['sim','Mutashabihat'],['two','Two pages']].forEach(([id,t])=>{const b=E('button',t);b.id=id;bar.appendChild(b)});
$('#aub').onclick=()=>{const on=$('#aud').classList.toggle('on');$('#aub').setAttribute('aria-pressed',on);if(!on&&playing)stop();dispatchEvent(new Event('resize'))};
H.S.sim=true;H.save();$('#sim').setAttribute('aria-pressed',true);
$('#sim').onclick=()=>{openCurrentMutashabihat()};
function openCurrentMutashabihat(){const keys=pk().filter(k=>P[k]&&P[k].length);if(!keys.length){md.innerHTML='<h2>Mutashabihat</h2><p>No marked Mutashabihat phrases are present on this page.</p><div class="row"><button data-x>Close</button></div>';md.showModal();return}const k=keys[0],rs=P[k];showP(k,rs)}

$('#mean').setAttribute('aria-pressed',H.S.mean!==false);
$('#mean').onclick=()=>{H.S.mean=H.S.mean===false;H.save();$('#mean').setAttribute('aria-pressed',H.S.mean!==false)};
$('#two').setAttribute('aria-pressed',!!H.S.two);
$('#two').onclick=()=>{H.S.two=!H.S.two;H.save();$('#two').setAttribute('aria-pressed',!!H.S.two);H.render()};
/* ---------- margin marks: ruku and sajdah ---------- */
const SAJ=new Set(['7:206','13:15','16:50','17:109','19:58','22:18','22:77','25:60','27:26','32:15','38:24','41:38','53:62','84:21','96:19']);
let R={},RB={},RUB=[],MZ=[],PO=null;
function setR(j){const a=Array.isArray(j)?j:(j.ruku||j.rukus||[]),c={};R={};a.map(norm).filter(Boolean).forEach(k=>{const s=k.split(':')[0];R[k]=c[s]=(c[s]||0)+1;window.R=R});V&&hook()}
try{fetch('data/ruku.json').then(r=>r.ok?r.json():0).then(j=>j&&setR(j)).catch(()=>{})}catch(x){}
function setRub(j){
  RB={};RUB=j.rub;MZ=j.manzil;
  j.rub.forEach((k,i)=>{const r=i+1,q=(r-1)%4;
    RB[k]='\u06DE<br>'+(r%8==1?'\u062C\u0632\u0621 '+num((r-1>>3)+1):q==0?'\u062D\u0632\u0628 '+num((r-1>>2)+1):['','\u0631\u0628\u0639','\u0646\u0635\u0641','\u062B\u0644\u0627\u062B\u0629'][q])});
  V&&hook();
}
try{fetch('data/rub.json').then(r=>r.ok?r.json():0).then(j=>j&&setRub(j)).catch(()=>{})}catch(x){}
function add(w,t){const m=E('span',t);m.className='mk';w.appendChild(m)}
function marks(){
  Q('.mk').forEach(m=>m.remove());
  // One Rub/nisf/salasa marker per ayah. Attach it to the Mushaf line,
  // not to the first word, so it stays in the page margin and never moves
  // with the width of an individual Arabic word.
  const seen=new Set();
  Q('.page .w[data-ayah-start="1"]').forEach(w=>{
    const k=w.dataset.v,t=RB[k],line=w.closest('.line');
    if(!t||!line||seen.has(k))return;
    seen.add(k);
    const m=E('span',t);m.className='mk r';m.dataset.rub=k;line.appendChild(m);
  });
  // Ruku/sajdah symbols are attached to the ayah-ending marker, and stay on that word.
  Q('.page .w[data-v]').forEach(w=>{
    if(!w.textContent.includes('\u06dd'))return;
    const k=w.dataset.v,t=[R[k]?'\u0639'+num(R[k]):'',SAJ.has(k)?'\u06E9':''].filter(Boolean).join(' ');
    if(t)add(w,t);
  });
}
function frames(){
  [[H.el,H.page],[$('#page2'),H.page+1]].forEach(([pe,pn])=>{
    pe.querySelectorAll('.hd,.ft').forEach(e=>e.remove());
    if(pe.hidden||!PO)return;
    const f=H.D.pages[pn-1].find(l=>l[0]==0);if(!f)return;
    const p=PO[f[3]],s=+f[3].split(':')[0],j=RUB.filter((k,i)=>i%8==0&&PO[k]<=p).length,z=MZ.filter(k=>PO[k]<=p).length;
    const h=E('div',`<span>${AR[s-1]} ${num(s)}</span><b>${num(pn+OFF())}</b><span>${j?JN[j-1]:''}</span>`);h.className='hd';pe.appendChild(h);
    if(z){const t=E('div','\u0645\u0646\u0632\u0644 '+num(z));t.className='ft';pe.appendChild(t)}
  });
}
window.hook=()=>{
  if(!V)build();
  if(!PO){PO={};Object.keys(V).forEach((k,i)=>PO[k]=i)}
  theme();fillAud();mark();tag();marks();frames();
  Q('.page .w[data-v]').forEach(w=>w.classList.toggle('m',!!M[w.dataset.v]||cov(w.dataset.v,+w.dataset.i).length>0));
};
if(H.D)hook();
})();

/* ---------- Quran search, ayah bookmarks/notes/themes, full-page reader ---------- */
(()=>{
  const $=s=>document.querySelector(s), Q=s=>document.querySelectorAll(s), E=(t,h)=>{const e=document.createElement(t);e.innerHTML=h||'';return e};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const st=document.createElement('style');st.textContent=`
    .sr{border-top:1px solid var(--line);padding:10px 0}.srhead{display:flex;justify-content:space-between;gap:10px;align-items:center}.srhead span{color:var(--muted);font-size:.85rem}.srtext{font-size:25px;line-height:1.9;margin-top:5px}.srtrans{margin-top:5px;line-height:1.7}.ayahbig{font-size:32px;line-height:2.1}.mark-mode-active{background:var(--accent)!important;color:var(--paper)!important}.marks-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.marks-tabs button.active{background:var(--accent);color:var(--paper)}.marks-list{max-height:60vh;overflow:auto}.progress-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}.progress-card{border:1px solid var(--line);border-radius:8px;padding:10px;text-align:center}.progress-card b{display:block;font-size:1.35rem}.plan-list{max-height:45vh;overflow:auto}.plan-item{display:flex;justify-content:space-between;gap:8px;align-items:center;border-top:1px solid var(--line);padding:8px 0}.progress-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}.progress-card{border:1px solid var(--line);border-radius:8px;padding:10px;text-align:center}.progress-card b{display:block;font-size:1.35rem}.plan-list{max-height:45vh;overflow:auto}.plan-item{display:flex;justify-content:space-between;gap:8px;align-items:center;border-top:1px solid var(--line);padding:8px 0}.mark-row{border-top:1px solid var(--line);padding:10px 0}.mark-row-head{display:flex;justify-content:space-between;gap:10px}.mark-row small{color:var(--muted)}
    .full-reader header,.full-reader footer{display:none}.full-reader main{position:fixed;inset:0;z-index:5;margin:0;padding:58px 64px 24px;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:auto;background:var(--bg)}.full-reader .page{border:0;border-radius:0;box-shadow:none;min-height:0;height:auto;padding:12px 32px;justify-content:center;max-width:min(760px,calc(100vw - 128px));background:var(--paper)}.full-reader{overflow:hidden}.full-reader .line{height:calc(var(--fs,40px)*1.72)}.full-reader .hd,.full-reader .ft{display:none}.full-reader .page{font-size:1em}.full-reader dialog{z-index:20}.full-reader .full-exit{display:flex}.full-reader .full-meta{display:flex}.full-exit{display:none;position:fixed;z-index:100;top:14px;right:14px;width:44px;height:44px;min-height:44px;padding:0;align-items:center;justify-content:center;border-radius:50%;font-size:28px;line-height:1;background:var(--paper);border:1px solid var(--line);box-shadow:0 3px 14px rgba(0,0,0,.18)}.full-exit span{display:block;transform:translateY(-1px)}
    .full-meta{display:none;position:fixed;z-index:101;top:10px;left:50%;transform:translateX(-50%);max-width:calc(100vw - 120px);padding:6px 12px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--paper) 92%,transparent);color:var(--muted);font:12px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 10px rgba(0,0,0,.08);pointer-events:none}.full-meta b{color:var(--ink);font-weight:650}.full-meta .sep{margin:0 6px;opacity:.45}
@media(max-width:600px){.srhead{align-items:flex-start;flex-direction:column;gap:2px}.srtext{font-size:21px}.ayahbig{font-size:25px}.aytheme{right:auto;left:100%;margin:0 0 0 5px;max-width:70px}.full-reader main{padding:50px 6px 8px;overflow:auto}.full-reader .page{padding:4px 6px;max-width:calc(100vw - 12px)}.full-reader .line{height:calc(var(--fs,40px)*1.72)}.full-exit{top:8px;right:8px;width:40px;height:40px;font-size:25px}.full-meta{top:10px;left:8px;right:56px;transform:none;max-width:none;justify-content:center;font-size:11px}}
  `;document.head.appendChild(st);

  const norm=s=>String(s??'').normalize('NFD').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[ٱأإآ]/g,'ا').replace(/ى/g,'ي').replace(/ئ/g,'ي').replace(/ؤ/g,'و').replace(/ة/g,'ه').replace(/[\s\u200f\u200e]+/g,' ').trim().toLowerCase();
  let idx=null, searchMode='all', markMode=null;
  const S=()=>H.S;
  const ayahState=k=>{S().ayah=S().ayah||{};S().ayah[k]=Object.assign({bookmark:false,note:'',theme:''},S().ayah[k]||{});return S().ayah[k]};
  const buildIndex=()=>{if(idx)return idx;const rows=[];if(!H.V||!H.D)return rows;Object.keys(H.V).forEach(k=>{const [s,a]=k.split(':').map(Number),v=H.V[k];rows.push({k,s,a,page:v.p,arabic:(v.t||[]).join(' '),urdu:window.MN&&MN.tu?MN.tu[k]||'':'',english:window.MN&&MN.te?MN.te[k]||'':''})});idx=rows;return rows};
  const loadTranslations=()=>{if(window.MN)return Promise.resolve(window.MN);return fetch('data/meanings.json').then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{window.MN=j;return j})};

  const ensureSearchDialog=()=>{if($('#searchDlg'))return;document.body.appendChild(E('dialog',`<h2>Quran Search</h2><div class="row"><input id="sq" type="search" placeholder="Search Arabic, Urdu or English…" autocomplete="off" style="flex:1;min-width:220px"></div><div class="row"><label>Search in <select id="sm"><option value="all">All text</option><option value="ar">Arabic</option><option value="ur">Urdu translation</option><option value="en">English translation</option></select></label><button id="sgo">Search</button></div><p id="sstatus" role="status"></p><div id="sresults"></div><div class="row"><button data-x>Close</button></div>`));const d=[...document.querySelectorAll('dialog')].find(x=>x.querySelector('#sq'));d.id='searchDlg';$('#sgo').onclick=runSearch;$('#sq').onkeydown=e=>{if(e.key==='Enter')runSearch};$('#sm').value=searchMode;d.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.x!==undefined)d.close();if(b.dataset.go){d.close();H.go(+b.dataset.go)}if(b.dataset.ayah){d.close();activateMode('notes');setTimeout(()=>showNote(b.dataset.ayah),0)}}};
  const runSearch=async()=>{ensureSearchDialog();const q=$('#sq').value.trim();searchMode=$('#sm').value;if(!q){$('#sstatus').textContent='Enter a word or phrase to search.';$('#sresults').innerHTML='';return}$('#sstatus').textContent='Loading translation data…';try{await loadTranslations()}catch(e){if(searchMode!=='ar')$('#sstatus').textContent='Could not load translations. Arabic search is still available.'}idx=null;const rows=buildIndex(),nq=norm(q),out=rows.filter(r=>{const fields=searchMode==='ar'?[r.arabic]:searchMode==='ur'?[r.urdu]:searchMode==='en'?[r.english]:[r.arabic,r.urdu,r.english];return fields.some(x=>norm(x).includes(nq))});$('#sstatus').textContent=`${out.length} ayah${out.length===1?'':'s'} found`;$('#sresults').innerHTML=out.slice(0,250).map(r=>`<div class="sr"><div class="srhead"><b>${esc(H.D.surahs[r.s-1])} ${r.s}:${r.a}</b><span>Mushaf page ${r.page}</span></div>${searchMode==='ar'||searchMode==='all'?`<div class="ar srtext">${esc(r.arabic)}</div>`:''}${searchMode==='ur'||searchMode==='all'?`<div class="ur srtrans">${esc(r.urdu)}</div>`:''}${searchMode==='en'||searchMode==='all'?`<div class="srtrans">${esc(r.english)}</div>`:''}<div class="row"><button data-go="${r.page}">Go to page</button><button data-ayah="${r.k}">Select ayah for notes</button></div></div>`).join('')||'<p>No matching ayahs.</p>';if(out.length>250)$('#sstatus').textContent+=` (showing first 250)`};

  const ensureNoteDialog=()=>{if($('#noteDlg'))return;document.body.appendChild(E('dialog',`<div id="noteBody"></div>`));const d=[...document.querySelectorAll('dialog')].find(x=>x.querySelector('#noteBody'));d.id='noteDlg';d.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.x!==undefined)d.close();if(b.dataset.save){saveNote(b.dataset.save)}}};
  const showNote=k=>{ensureNoteDialog();const st=ayahState(k),r=H.V[k],[s,a]=k.split(':').map(Number);$('#noteBody').innerHTML=`<h2>${esc(H.D.surahs[s-1])} ${s}:${a}</h2><p class="ar ayahbig">${esc((r.t||[]).join(' '))}</p><p><b>Mushaf page:</b> ${r.p}</p><label style="display:block">Note<textarea id="anote" rows="5" style="width:100%;margin-top:6px">${esc(st.note)}</textarea></label><div class="row" style="margin-top:10px"><button data-save="${esc(k)}">Save note</button><button data-x>Close</button><button data-go="${r.p}">Go to Mushaf page</button></div>`;$('#noteDlg').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.x!==undefined)$('#noteDlg').close();if(b.dataset.go){$('#noteDlg').close();H.go(+b.dataset.go)}if(b.dataset.save)saveNote(b.dataset.save)};$('#noteDlg').showModal()};
  const saveNote=k=>{const st=ayahState(k);st.note=$('#anote')?.value||'';delete st.comment;S().ayah[k]=st;H.save();applyAyahMarks();$('#noteDlg').close()};

  const ensureThemeDialog=()=>{if($('#themeDlg'))return;document.body.appendChild(E('dialog',`<div id="themeBody"></div>`));const d=[...document.querySelectorAll('dialog')].find(x=>x.querySelector('#themeBody'));d.id='themeDlg';d.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.x!==undefined)d.close();if(b.dataset.save)saveTheme(b.dataset.save)}};
  const showTheme=k=>{ensureThemeDialog();const st=ayahState(k),r=H.V[k],[s,a]=k.split(':').map(Number);$('#themeBody').innerHTML=`<h2>Theme — ${esc(H.D.surahs[s-1])} ${s}:${a}</h2><p class="ar ayahbig">${esc((r.t||[]).join(' '))}</p><label style="display:block">Theme code / name<input id="ath" value="${esc(st.theme)}" placeholder="e.g. sabr, dua, warning" style="width:100%;margin-top:6px"></label><div class="row" style="margin-top:10px"><button data-save="${esc(k)}">Save theme</button><button data-x>Close</button><button data-go="${r.p}">Go to Mushaf page</button></div>`;$('#themeDlg').showModal()};
  const saveTheme=k=>{const st=ayahState(k);st.theme=$('#ath')?.value.trim()||'';S().ayah[k]=st;H.save();applyAyahMarks();$('#themeDlg').close()};

  const activateMode=mode=>{markMode=markMode===mode?null:mode;['bookmark','notes','theme'].forEach(x=>{const b=$(`#mark-${x}`);if(b)b.classList.toggle('mark-mode-active',markMode===x)});};
  const selectAyah=k=>{if(!markMode)return;if(markMode==='bookmark'){const st=ayahState(k);st.bookmark=!st.bookmark;S().ayah[k]=st;H.save();applyAyahMarks();return}if(markMode==='notes'){showNote(k);markMode=null;activateMode(null);return}if(markMode==='theme'){showTheme(k);markMode=null;activateMode(null);return}};

  const ensureMarksDialog=()=>{if($('#marksDlg'))return;document.body.appendChild(E('dialog',`<h2>My Marks</h2><div class="marks-tabs"><button data-tab="bookmarks">Bookmarks</button><button data-tab="notes">Notes</button><button data-tab="themes">Themes</button></div><div id="marksList" class="marks-list"></div><div class="row"><button data-x>Close</button></div>`));const d=[...document.querySelectorAll('dialog')].find(x=>x.querySelector('#marksList'));d.id='marksDlg';d.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.x!==undefined)d.close();if(b.dataset.tab)renderMarks(b.dataset.tab);if(b.dataset.go){d.close();H.go(+b.dataset.go)}if(b.dataset.delete)deleteMark(b.dataset.delete,b.dataset.kind)};};
  const deleteMark=(k,kind)=>{const data=S().ayah||{};const st=data[k];if(!st)return;if(kind==='bookmark')st.bookmark=false;if(kind==='note')st.note='';if(kind==='theme')st.theme='';if(!st.bookmark&&!st.note&&!st.theme)delete data[k];H.save();applyAyahMarks();const active=document.querySelector('#marksDlg .marks-tabs button.active')?.dataset.tab||kind+'s';renderMarks(active==='bookmarks'?'bookmarks':active==='notes'?'notes':'themes');};
  const renderMarks=tab=>{ensureMarksDialog();Q('#marksDlg .marks-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));const list=$('#marksList'),data=S().ayah||{},items=Object.keys(data).filter(k=>{const s=data[k]||{};return tab==='bookmarks'?s.bookmark:tab==='notes'?s.note:tab==='themes'?s.theme:false}).sort((a,b)=>{const [as,aa]=a.split(':').map(Number),[bs,ba]=b.split(':').map(Number);return as-bs||aa-ba});if(!items.length){list.innerHTML=`<p>No ${tab} saved yet.</p>`;return}list.innerHTML=items.map(k=>{const [s,a]=k.split(':').map(Number),r=H.V[k],st=data[k];const kind=tab==='bookmarks'?'bookmark':tab==='notes'?'note':'theme';return `<div class="mark-row"><div class="mark-row-head"><b>${esc(H.D.surahs[s-1])} ${s}:${a}</b><small>Mushaf page ${r?.p??''}</small></div>${tab==='notes'?`<div>${esc(st.note)}</div>`:''}${tab==='themes'?`<div><b>${esc(st.theme)}</b></div>`:''}<div class="row"><button data-go="${r?.p??1}">Go to Mushaf page</button><button data-delete="${esc(k)}" data-kind="${kind}">Delete</button></div></div>`}).join('')};
  const openMarks=tab=>{ensureMarksDialog();renderMarks(tab||'bookmarks');$('#marksDlg').showModal()};

  const applyAyahMarks=()=>{if(!H.V)return;Q('.w[data-v]').forEach(w=>{const st=S().ayah&&S().ayah[w.dataset.v]||{};w.classList.remove('ayahhl');w.removeAttribute('data-highlight');w.style.removeProperty('--ayah-highlight');w.classList.toggle('abm',!!st.bookmark);w.classList.remove('hasayahnote');w.dataset.theme=st.theme||''});Q('.aytheme').forEach(x=>x.remove());Q('.page .w[data-ayah-start="1"]').forEach(w=>{const st=S().ayah&&S().ayah[w.dataset.v]||{};if(st.note)w.classList.add('hasayahnote');if(st.theme){const m=document.createElement('span');m.className='aytheme';m.textContent=st.theme;m.title='Theme: '+st.theme;w.appendChild(m)}})};

  /* ---------- Hifz Recitation Test v2 ---------- */
  let recDlg=null,recState={running:false,rec:null,target:[],source:'page',transcript:'',interim:''};
  const recNorm=s=>String(s||'').normalize('NFKD').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u08D3-\u08FF]/g,'').replace(/[ٱإأآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/[ـ]/g,'').replace(/[^\u0600-\u06FF\s]/g,' ').replace(/\s+/g,' ').trim();
  const recWords=s=>recNorm(s).split(/\s+/).filter(Boolean);
  const recSpeech=()=>window.SpeechRecognition||window.webkitSpeechRecognition;
  const recPageAyahs=p=>Object.keys(H.V||{}).filter(k=>H.V[k]?.p===p).sort((a,b)=>{const [as,aa]=a.split(':').map(Number),[bs,ba]=b.split(':').map(Number);return as-bs||aa-ba});
  const recTargets=source=>{
    if(source==='page')return recPageAyahs(H.page||1);
    const d=plan().day||{};
    if(source==='sabaq')return [...new Set((d.sab||[]).flatMap(recPageAyahs))];
    if(source==='sabqi')return [...new Set((d.rec||[]).flatMap(recPageAyahs))];
    if(source==='manzil')return [...new Set((d.man||[]).flatMap(recPageAyahs))];
    return recState.target||[];
  };
  const recPassage=keys=>keys.map(k=>({k,text:(H.V[k]?.t||[]).join(' '),page:H.V[k]?.p||0}));
  const recAlign=(expected,actual)=>{
    const n=expected.length,m=actual.length;
    if(!n)return {count:0,matched:[],missing:[],accuracy:0,extra:m};
    // LCS alignment is used instead of a simple position comparison because
    // speech recognition may omit a word or insert an extra word.
    const dp=Array.from({length:n+1},()=>new Uint16Array(m+1));
    for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)dp[i][j]=expected[i-1]===actual[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    const matched=[];let i=n,j=m;
    while(i&&j){
      if(expected[i-1]===actual[j-1]){matched.push([i-1,j-1]);i--;j--;}
      else if(dp[i-1][j]>=dp[i][j-1])i--;else j--;
    }
    matched.reverse();
    const good=new Set(matched.map(x=>x[0]));
    const actualGood=new Set(matched.map(x=>x[1]));
    return {count:dp[n][m],matched,missing:expected.map((w,x)=>({w,x})).filter(x=>!good.has(x.x)),extra:actual.map((w,x)=>({w,x})).filter(x=>!actualGood.has(x.x)),accuracy:Math.round(dp[n][m]/n*100)};
  };
  const recEnsure=()=>{
    if(recDlg)return recDlg;
    recDlg=E('dialog');recDlg.id='recDlg';
    recDlg.innerHTML=`<h2>Hifz Recitation Test</h2>
      <p class="rec-note">Recite from memory. This test checks recognized Quranic words and sequence; it does <b>not</b> judge Tajweed or pronunciation quality.</p>
      <div class="row"><label>Test <select id="recSource"><option value="page">Current page</option><option value="sabaq">Today's Sabaq</option><option value="sabqi">Today's Sabqi</option><option value="manzil">Today's Manzil</option></select></label></div>
      <div id="recTargetInfo"></div>
      <div class="rec-status" id="recStatus">Ready. The Quran text will be hidden while the test is running.</div>
      <div class="rec-live"><span id="recTimer">00:00</span><span id="recLiveState">Ready</span></div>
      <div class="rec-transcript" id="recTranscript" aria-live="polite"></div>
      <div id="recResult"></div>
      <div class="row"><button id="recStart">Start recitation</button><button id="recStop" disabled>Stop</button><button data-x>Close</button></div>`;
    document.body.appendChild(recDlg);
    recDlg.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.x!==undefined){recStop();recDlg.close();document.body.classList.remove('rec-testing');}};
    $('#recSource').onchange=()=>{if(recState.running)return;recPrepare($('#recSource').value)};
    $('#recStart').onclick=recStart;$('#recStop').onclick=recStop;
    return recDlg;
  };
  const recPrepare=source=>{
    recState.source=source;recState.target=recTargets(source);recState.transcript='';recState.interim='';
    const passages=recPassage(recState.target),ps=[...new Set(passages.map(x=>x.page).filter(Boolean))];
    const info=recState.target.length
      ? `<p><b>${recState.target.length} ayahs</b> · ${ps.length} page${ps.length===1?'':'s'}${ps.length?` · Page${ps.length===1?'':'s'} ${ps.join(', ')}`:''}</p>`
      : `<p>No passage is available. For Sabaq/Sabqi/Manzil, create today's Plan first.</p>`;
    $('#recTargetInfo').innerHTML=info;$('#recStatus').textContent=recState.target.length?'Ready. Quran text is hidden during the test.':'No test passage selected.';$('#recLiveState').textContent='Ready';$('#recTimer').textContent='00:00';$('#recTranscript').textContent='';$('#recResult').innerHTML='';$('#recStart').disabled=!recState.target.length;
  };
  const recTimerStart=()=>{recState.startedAt=Date.now();clearInterval(recState.timer);recState.timer=setInterval(()=>{const sec=Math.floor((Date.now()-recState.startedAt)/1000);$('#recTimer').textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`},250)};
  const recTimerStop=()=>{clearInterval(recState.timer);recState.timer=null};
  const recStart=()=>{
    const SR=recSpeech();
    if(!SR){$('#recStatus').innerHTML='<b>Speech recognition is not available in this browser.</b><br>Use a recent Chrome or Edge browser and allow microphone access.';return;}
    if(!recState.target.length)return;
    recState.transcript='';recState.interim='';recState.running=true;recState.startedAt=Date.now();
    $('#recStart').disabled=true;$('#recStop').disabled=false;$('#recResult').innerHTML='';$('#recTranscript').textContent='';$('#recLiveState').textContent='Listening';
    document.body.classList.add('rec-testing');recTimerStart();
    const r=new SR();recState.rec=r;r.lang='ar-SA';r.continuous=true;r.interimResults=true;r.maxAlternatives=3;
    r.onstart=()=>{$('#recStatus').textContent='Listening… Recite the selected passage from memory.'};
    r.onerror=e=>{if(!recState.running)return;recState.running=false;recTimerStop();$('#recStart').disabled=false;$('#recStop').disabled=true;$('#recLiveState').textContent='Error';$('#recStatus').textContent='Microphone/speech recognition error: '+(e.error||'unknown')+'. Try Start again.';document.body.classList.remove('rec-testing');};
    r.onresult=e=>{let final='',interim='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0]?.transcript||'';if(e.results[i].isFinal)final+=t+' ';else interim+=t+' ';}if(final)recState.transcript+=(recState.transcript?' ':'')+final.trim();recState.interim=interim.trim();$('#recTranscript').textContent=(recState.transcript||'')+(recState.interim?' '+recState.interim:'')};
    r.onend=()=>{if(recState.running){try{r.start()}catch(e){}}};
    try{r.start()}catch(e){recState.running=false;recTimerStop();document.body.classList.remove('rec-testing');$('#recStart').disabled=false;$('#recStop').disabled=true;$('#recLiveState').textContent='Error';$('#recStatus').textContent='Could not start microphone recognition.';}
  };
  const recStop=()=>{
    if(!recState.rec){return}
    recState.running=false;recTimerStop();try{recState.rec.onend=null;recState.rec.stop()}catch(e){}
    $('#recStart').disabled=false;$('#recStop').disabled=true;$('#recLiveState').textContent='Checking';$('#recStatus').textContent='Recitation stopped. Aligning your recitation with the expected ayahs…';document.body.classList.remove('rec-testing');
    recEvaluate();
  };
  const recEvaluate=()=>{
    const passages=recPassage(recState.target),expected=[];passages.forEach((p,pi)=>recWords(p.text).forEach(w=>expected.push({w,k:p.k,page:p.page,pi})));
    const actual=recWords(recState.transcript),al=recAlign(expected.map(x=>x.w),actual),byAyah=passages.map((p,pi)=>({p,pi,expected:expected.filter(x=>x.pi===pi)}));
    const matchedByExpected=new Set(al.matched.map(x=>x[0]));
    const ayahResults=byAyah.map(({p,expected:ew})=>{const miss=ew.filter((x,idx)=>!matchedByExpected.has(expected.indexOf(x))).map(x=>x.w);const hit=ew.length-miss.length;return {k:p.k,page:p.page,expected:ew.length,matched:hit,accuracy:ew.length?Math.round(hit/ew.length*100):0,missing:miss.slice(0,12)}});
    const weak=ayahResults.filter(x=>x.accuracy<85),overall=al.accuracy;
    const stamp=new Date().toISOString();H.S.recitation=H.S.recitation||{tests:[]};
    H.S.recitation.tests.unshift({at:stamp,source:recState.source,target:[...recState.target],accuracy:overall,matched:al.count,expected:expected.length,weak:weak.map(x=>({k:x.k,accuracy:x.accuracy,missing:x.missing}))});
    H.S.recitation.tests=H.S.recitation.tests.slice(0,50);H.save();
    let html=`<div class="rec-score"><b>${overall}%</b><span>${al.count} of ${expected.length} expected words matched</span></div>`;
    html+=`<h3>Ayah-by-ayah result</h3><div class="rec-ayah-results">${ayahResults.map(x=>`<div class="rec-ayah-row"><span><b>${esc(x.k)}</b> · page ${x.page}</span><span><b>${x.accuracy}%</b>${x.missing.length?` · <em>${esc(x.missing.join(' · '))}</em>`:' · ✓'}</span></div>`).join('')}</div>`;
    if(weak.length)html+=`<p><b>Needs review:</b> ${weak.map(x=>`<button class="rec-review" data-go="${x.page}">${esc(x.k)} · ${x.accuracy}%</button>`).join(' ')}</p>`;
    else html+='<p><b>No ayah fell below the 85% review threshold.</b></p>';
    if(al.extra.length)html+=`<details><summary>Possible extra/unmatched recognized words</summary><p class="rec-missing">${esc(al.extra.slice(0,30).map(x=>x.w).join(' · '))}</p></details>`;
    html+=`<details><summary>Show recognized text</summary><p class="ur">${esc(recState.transcript||'—')}</p></details><details><summary>Reveal expected passage</summary><div class="ur">${passages.map(x=>`<p><b>${esc(x.k)}</b> — ${esc(x.text)}</p>`).join('')}</div></details>`;
    $('#recResult').innerHTML=html;$('#recResult').onclick=e=>{const b=e.target.closest('[data-go]');if(b)H.go(+b.dataset.go)};$('#recStatus').textContent='Test complete. Review weak ayahs and retest them.';$('#recLiveState').textContent='Complete';
  };
  const openRecitation=()=>{const d=recEnsure();d.showModal();recPrepare($('#recSource')?.value||'page')};
  const addToolbarButtons=()=>{const bar=document.querySelector('.ctl');if(!bar)return;let tools=$('#toolsBtn');let menu=$('#toolsMenu');if(!tools){tools=document.createElement('button');tools.id='toolsBtn';tools.textContent='Tools';tools.setAttribute('aria-expanded','false');bar.appendChild(tools);menu=document.createElement('div');menu.id='toolsMenu';menu.className='tools-menu';document.body.appendChild(menu);tools.onclick=e=>{e.stopPropagation();const on=menu.classList.toggle('on');tools.setAttribute('aria-expanded',String(on))};document.addEventListener('click',e=>{if(!e.target.closest('#toolsMenu,#toolsBtn')){menu.classList.remove('on');tools.setAttribute('aria-expanded','false')}})}
    const add=(id,label,fn)=>{if($('#'+id))return;const b=document.createElement('button');b.id=id;b.textContent=label;b.onclick=()=>{menu.classList.remove('on');tools.setAttribute('aria-expanded','false');fn()};menu.appendChild(b)};
    add('mark-bookmark','Bookmark',()=>activateMode('bookmark'));add('mark-notes','Notes',()=>activateMode('notes'));add('mark-theme','Theme',()=>activateMode('theme'));add('mark-recite','Recite',openRecitation);add('myMarks','My Marks',()=>openMarks('bookmarks'));add('progress','Progress',()=>window.openHifzProgress());add('qsearch','Search',()=>{ensureSearchDialog();$('#sq').value='';$('#sstatus').textContent='';$('#sresults').innerHTML='';$('#searchDlg').showModal();setTimeout(()=>$('#sq').focus(),0)});add('full','Full page',toggleFull);
    if(!$('#planTool'))add('planTool','Plan',()=>window.openHifzPlan());
  };
  const ensureFullMeta=()=>{let m=$('#fullMeta');if(!m){m=document.createElement('div');m.id='fullMeta';m.className='full-meta';document.body.appendChild(m)}const p=H.page||1;let si=0;H.D.surahPage.forEach((sp,i)=>{if(sp<=p)si=i});let ji=0;H.D.juzPage.forEach((jp,i)=>{if(jp<=p)ji=i});let first=null;const pg=H.D.pages[p-1]||[];for(const l of pg){if(l[0]===0&&l[3]){first=l[3].split(':').map(Number);break}}let ruku='';if(first&&window.R){const [s,a]=first;let bestA=0,bestN='';Object.keys(window.R).forEach(k=>{const [rs,ra]=k.split(':').map(Number);if(rs===s&&ra<=a&&ra>=bestA){bestA=ra;bestN=window.R[k]}});if(bestN)ruku='Ruku '+bestN}m.innerHTML=`<b>Juz ${ji+1}</b><span class="sep">·</span><b>${esc(H.D.surahs[si]||'')}</b><span class="sep">·</span>Page ${p}<span class="sep">·</span>${ruku||'Ruku —'}`;m.style.display=H.S.full?'flex':'none';return m};
  const ensureFullExit=()=>{let b=$('#fullExit');if(!b){b=document.createElement('button');b.id='fullExit';b.className='full-exit';b.type='button';b.setAttribute('aria-label','Exit full page');b.title='Exit full page';b.innerHTML='<span aria-hidden="true">×</span>';b.onclick=()=>setFull(false);document.body.appendChild(b)}b.style.display=S().full?'flex':'none';return b};
  const setFull=on=>{S().full=!!on;H.save();document.body.classList.toggle('full-reader',S().full);const b=$('#full');if(b)b.setAttribute('aria-pressed',String(S().full));ensureFullExit();ensureFullMeta();if(H.render)H.render();ensureFullExit();ensureFullMeta();if(S().full)window.scrollTo(0,0)};const toggleFull=()=>setFull(!S().full);const fullOnLoad=()=>{document.body.classList.toggle('full-reader',!!S().full);const b=$('#full');if(b)b.setAttribute('aria-pressed',String(!!S().full));ensureFullExit();ensureFullMeta()};
  document.addEventListener('click',e=>{if(!markMode)return;if(e.target.closest('dialog,button,input,select,textarea,a'))return;const w=e.target.closest('.w[data-v]');if(!w)return;e.preventDefault();e.stopImmediatePropagation();selectAyah(w.dataset.v)},true);
  document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='/'){e.preventDefault();$('#qsearch')?.click()}if(e.key==='Escape'&&S().full){e.preventDefault();setFull(false);return}if(e.key.toLowerCase()==='f')$('#full')?.click()});
  let ftaps=0,ftimer=null;document.addEventListener('click',e=>{if(!S().full||e.clientX>70||e.clientY>70)return;ftaps++;clearTimeout(ftimer);ftimer=setTimeout(()=>ftaps=0,900);if(ftaps>=3){ftaps=0;setFull(false)}},{passive:true});
  const boot=()=>{if(!window.H||!H.D){setTimeout(boot,100);return}markMode=null;addToolbarButtons();activateMode(null);fullOnLoad();const oldRender=H.render;H.render=function(){oldRender();addToolbarButtons();applyAyahMarks();fullOnLoad()};applyAyahMarks()};boot();
})();
