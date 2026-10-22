const {kind,variant,width,height}=window.YOLO_AD;
const destination='https://yolo.com.gt/descargarweb/';
const asset=(file,cls,alt='')=>`<img class="${cls}" src="assets/${file}" alt="${alt}">`;
const logo=kind==='cube'&&variant==='transfiero'
 ? `<div class="yolo-letters" aria-label="YOLO">${[1,2,3,4].map((n)=>asset(`yolo-letter-${n}.png`,`letter letter-${n}`)).join('')}</div>`
 : asset('yolo-logo.png','yolo-logo','YOLO');
const stores=`<div class="stores">${asset('google-play.png','store','Google Play')}${asset('app-store.png','store','App Store')}</div>`;
const download=`<div class="download-box">${asset('yolo-app-icon.png','app-icon','Aplicación YOLO')}<strong>Descárgala</strong>${stores}</div>`;
const brand=`<div class="brand-badge">${asset('bantrab-60.png','brand','60 años Bantrab')}</div>`;
const transfiero=`<div class="face-content front transfiero"><div class="photo"></div><div class="shade"></div><div class="content">${logo}<div class="hero-word">transfiero</div><div class="here pink">aquí y ahora</div><div class="support-box"><span class="typed-white">Disfruta </span><strong class="typed-color">sin filas ni complicaciones.</strong></div>${download}</div>${brand}</div>`;
const cobroFront=`<div class="face-content front cobro"><div class="photo"></div><div class="shade"></div><div class="content">${logo}<div class="hero-word">cobro</div><div class="here yellow">aquí y ahora</div><div class="line line-1">Divide la cuenta fácil.</div><div class="line line-2">Envía tu link <strong>y listo.</strong></div>${kind==='floating'?download:''}</div>${brand}</div>`;
const cobroAction=`<div class="face-content action"><div class="action-glow"></div>${asset('yolo-logo.png','action-logo','YOLO')}${download}${brand}</div>`;
const scenes=variant==='transfiero'?transfiero:(kind==='cube'?`<div class="cube"><div class="cube-face face-1">${cobroFront}</div><div class="cube-face face-2">${cobroAction}</div><div class="cube-face face-3">${cobroFront}</div><div class="cube-face face-4">${cobroAction}</div></div>`:cobroFront);
document.body.className=`size-${width}x${height} kind-${kind} variant-${variant}`;
document.body.innerHTML=`<main class="ad"><div class="stage">${scenes}</div><a class="click-area" href="${destination}" target="_blank" rel="noopener noreferrer" aria-label="Descarga la aplicación YOLO"></a></main>`;
const params=new URLSearchParams(location.search);
if(params.has('static')) document.body.classList.add('static','ready');
if(params.get('face')==='action') document.body.classList.add('show-action');
if(kind==='floating'&&variant==='transfiero'&&!params.has('static')){
 const white=document.querySelector('.typed-white');
 const color=document.querySelector('.typed-color');
 const first='Disfruta ';
 const second='sin filas ni complicaciones.';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced){white.textContent=first;color.textContent=second;document.body.classList.add('ready')}
 else{
  function cycle(){
   document.body.classList.remove('ready');white.textContent='';color.textContent='';
   let index=0;const all=first+second;
   setTimeout(()=>{const timer=setInterval(()=>{
    index++;white.textContent=all.slice(0,Math.min(index,first.length));
    color.textContent=all.slice(first.length,index);
    if(index>=all.length){clearInterval(timer);document.body.classList.add('ready')}
   },75)},1150);
   setTimeout(cycle,12000)
  }
  cycle()
 }
}
