(()=>{
const Q=(s,r=document)=>r.querySelector(s),A=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const NL="https://script.google.com/macros/s/AKfycbyP6Tda9hDg0n134Fpa-NuEfcW12eZHG_mIhV0KEgWntlDLkdDiRB2EKSk-XV1m_wzNYQ/exec";
const nav=Q('.nav'),bar=Q('#bar');
const sc=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%';nav.classList.toggle('solid',scrollY>40);
 if(!calm)A('.band>img').forEach(i=>{const r=i.parentNode.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)i.style.transform=`translateY(${-(innerHeight-r.top)*.08}px)`})};
addEventListener('scroll',sc,{passive:true});sc();
Q('.burger').onclick=()=>{const o=nav.classList.toggle('open');Q('.burger').setAttribute('aria-expanded',o)};
A('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),x=document.createElement('span');x.className='rp';x.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.append(x);setTimeout(()=>x.remove(),600)});
// reveal
if(!calm){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});A('.rv').forEach(e=>io.observe(e))}else A('.rv').forEach(e=>e.classList.add('in'));
// lightbox
const lb=document.body.appendChild(Object.assign(document.createElement('div'),{className:'lb',innerHTML:'<button aria-label="Close">×</button><img alt=""><p></p>'}));
const li=Q('img',lb),lp=Q('p',lb),close=()=>lb.classList.remove('on');
document.addEventListener('click',e=>{const i=e.target.closest('[data-lb] img,img[data-lb]');if(i){li.src=i.currentSrc||i.src;li.alt=i.alt;lp.textContent=i.alt;lb.classList.add('on')}else if(e.target===lb||e.target.tagName==='BUTTON'&&lb.contains(e.target))close()});
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
// gallery filter
A('.chip').forEach(c=>c.onclick=()=>{A('.chip').forEach(x=>x.classList.toggle('on',x===c));A('.mas figure').forEach(f=>f.classList.toggle('hide',c.dataset.f!=='all'&&f.dataset.c!==c.dataset.f))});
// contact form -> opens email draft (no server needed)
const cf=Q('#cf');if(cf)cf.onsubmit=e=>{e.preventDefault();const d=new FormData(cf);location.href='mailto:gatoworks@yahoo.com?subject='+encodeURIComponent('Enquiry from '+d.get('name'))+'&body='+encodeURIComponent(d.get('msg')+'\n\n'+d.get('name')+' ('+d.get('email')+')')};
// newsletter
const nl=Q('#nl');if(nl)nl.onsubmit=e=>{e.preventDefault();const m=Q('#nlm');fetch(NL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'email='+encodeURIComponent(nl.email.value)}).then(()=>{m.textContent='Thank you, you are on the list.';nl.reset()}).catch(()=>m.textContent='Could not sign up. Please try again.')};
// brand colours: saved by the admin (site_text rows "theme.<scope>.<var>"), cached so pages paint with them straight away
const TV=['--sun','--ink','--wall','--mute','--txt','--lite','--f1','--f2','--fs'],HEX=/^#[0-9a-f]{6}$/i;
const scope=(document.body.className.match(/\bt-(\w+)/)||[])[1]||'site';
const FONTS={'--f1':['Bricolage Grotesque','Playfair Display','Fraunces','Montserrat','Poppins','Outfit','Sora','Syne','Raleway','Archivo'],'--f2':['Hanken Grotesk','Inter','DM Sans','Nunito','Work Sans','Source Sans 3','Lora','Merriweather','Lato']};
const loadFont=(v,n)=>{if(/^(Bricolage Grotesque|Hanken Grotesk)$/.test(n))return;const id='gwf-'+n.replace(/\W/g,'');if(document.getElementById(id))return;
 const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+n.replace(/ /g,'+')+':'+(v==='--f1'?'wght@800':/^(Merriweather|Lato)$/.test(n)?'wght@400;700':'wght@400;600;700')+'&display=swap';document.head.append(l)};
const cssVal=(v,x)=>{x=String(x||'');
 if(v==='--f1'||v==='--f2')return FONTS[v].includes(x)?(loadFont(v,x),"'"+x+"',system-ui,sans-serif"):null;
 if(v==='--fs')return /^\d{2,3}$/.test(x)&&+x>=80&&+x<=130?x+'%':null;
 return HEX.test(x)?x:null};
const paint=(T)=>{[['site',document.documentElement],[scope,document.body]].forEach(([sc,el],n)=>{if(n&&sc==='site')return;TV.forEach(v=>{if(sc!=='site'&&/^--(f1|f2|fs)$/.test(v))return;const c=cssVal(v,T&&T[sc]&&T[sc][v]);c?el.style.setProperty(v,c):el.style.removeProperty(v)})});
 const m=document.querySelector('meta[name=theme-color]'),i=T&&((T[scope]||{})['--ink']||(T.site||{})['--ink']);if(m&&i)m.content=i};
const readTheme=t=>{const T={};Object.keys(t||{}).forEach(k=>{const m=k.match(/^theme\.(\w+)\.(--\w+)$/);if(m){(T[m[1]]=T[m[1]]||{})[m[2]]=t[k]}});return T};
try{paint(JSON.parse(localStorage.gwTheme||'{}'))}catch(e){}
// admin-controlled content: images (images.json + Supabase site_images, keyed by original src) and text (Supabase site_text, keyed by data-e)
const key=s=>{try{return new URL(s,location.href).pathname.replace(/^\//,'')}catch(e){return s}};
const G=window.GW||{};
A('img').forEach(i=>{i.dataset.k=key(i.getAttribute('src')||'')});
// minimal allow-list sanitiser for admin-written text (also used by the editor)
const OK=new Set(['B','I','EM','STRONG','U','BR','A','SMALL','SPAN','SUP','SUB','S','MARK']);
G.clean=h=>{const d=new DOMParser().parseFromString('<body>'+h,'text/html').body;
 (function w(n){[...n.childNodes].forEach(c=>{if(c.nodeType===3)return;if(c.nodeType!==1){c.remove();return}w(c);
  const t=c.tagName;if(!OK.has(t)||(t==='SPAN'&&!c.getAttribute('class'))){c.replaceWith(...c.childNodes);return}
  [...c.attributes].forEach(at=>{const n=at.name;if(n==='class')return;if(t==='A'&&n==='href'&&/^(https?:|mailto:|tel:|#|[\w.\-\/]+(\?|#|$))/i.test(at.value.trim()))return;if(t==='A'&&n==='target'&&at.value==='_blank')return;if(t==='A'&&n==='rel')return;c.removeAttribute(n)})})})(d);
 while(d.lastChild&&d.lastChild.nodeName==='BR')d.lastChild.remove();
 return d.innerHTML.replace(/&nbsp;/g,' ').replace(/\u00a0/g,' ')};
const LDB=()=>{try{return JSON.parse(localStorage.gwLocalDB||'{}')}catch(e){return{}}};
const get=t=>G.local?Promise.resolve(Object.entries(LDB()[t.split('?')[0]]||{}).map(([k,v])=>t.indexOf('site_text')===0?{key:k,html:v}:{key:k,url:v})):G.url?fetch(G.url+'/rest/v1/'+t,{headers:{apikey:G.key}}).then(r=>r.ok?r.json():null).catch(()=>null):Promise.resolve(null);
const rem=get('site_images?select=key,url').then(a=>Object.fromEntries((a||[]).map(x=>[x.key,x.url])));
const txt=get('site_text?select=key,html').then(a=>a&&Object.fromEntries(a.map(x=>[x.key,x.html])));
G.ready=Promise.all([fetch('images.json').then(r=>r.ok?r.json():{}).catch(()=>({})),rem,txt]).then(([m,d,t])=>{
 const M={...m,...d};A('img').forEach(i=>{const k=i.dataset.k;if(M[k])i.src=M[k]});
 if(t){A('[data-e]').forEach(e=>{const h=t[e.dataset.e];if(h!=null)e.innerHTML=G.clean(h)});const T=readTheme(t);paint(T);try{localStorage.gwTheme=JSON.stringify(T)}catch(e){}}
 return{images:M,text:t||{}}});
G.paint=paint;G.readTheme=readTheme;G.cssVal=cssVal;G.FONTS=FONTS;
window.GW=G;
A('img[loading=lazy]').forEach(i=>{if(!i.complete){i.classList.add('fade');i.addEventListener('load',()=>i.classList.add('ok'));i.addEventListener('error',()=>i.classList.add('ok'))}});
})();
