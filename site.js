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
// admin-controlled image swaps (images.json + Supabase), keyed by original src
const key=s=>{try{return new URL(s,location.href).pathname.replace(/^\//,'')}catch(e){return s}};
const G=window.GW||{};
const rem=G.url?fetch(G.url+'/rest/v1/site_images?select=key,url',{headers:{apikey:G.key}}).then(r=>r.ok?r.json():[]).then(a=>Object.fromEntries(a.map(x=>[x.key,x.url]))).catch(()=>({})):Promise.resolve({});
Promise.all([fetch('images.json').then(r=>r.ok?r.json():{}).catch(()=>({})),rem]).then(([m,d])=>{const M={...m,...d};A('img').forEach(i=>{const k=key(i.getAttribute('src')||'');if(M[k])i.src=M[k]})});
A('img[loading=lazy]').forEach(i=>{if(!i.complete){i.classList.add('fade');i.addEventListener('load',()=>i.classList.add('ok'));i.addEventListener('error',()=>i.classList.add('ok'))}});
})();
