const { kind, width, height } = window.BANTRAB_AD;
const destination = 'https://experienciabantrab.com/solicita-tu-tarjeta-de-credito/';
const image = (name, className, alt = '') => `<img class="${className}" src="assets/${name}" alt="${alt}">`;
const front = `<div class="face-content front">
  <div class="photo" aria-hidden="true"></div><div class="shade" aria-hidden="true"></div>
  <div class="headline"><strong>TARJETA</strong><span>de Crédito Bantrab</span></div>
  <div class="offer-copy"><p><strong>TUYA</strong> para llegar listo<br>a la temporada de ofertas</p><div class="benefits">Cuotas sin intereses desde el primer día<br>Acumula puntos en cada compra</div></div>
  ${image('tarjetas.png','cards','Tres tarjetas Bantrab Visa')}
  <div class="footer"><span class="solicitala">Solicítala</span>${image('bantrab-60.png','anniversary','60 años Bantrab')}</div>
  ${kind === 'floating' ? '<span class="front-cta">Solicítala <b>↗</b></span>' : ''}
</div>`;
const action = `<div class="face-content action"><div class="action-glow"></div>${image('tarjetas.png','action-cards','Tres tarjetas Bantrab Visa')}<div class="action-title">TARJETA<br><span>de Crédito Bantrab</span></div><span class="action-cta">Solicítala <b>↗</b></span>${image('bantrab-60.png','action-brand','60 años Bantrab')}</div>`;
const inner = kind === 'cube' ? `<div class="cube"><div class="cube-face face-1">${front}</div><div class="cube-face face-2">${action}</div><div class="cube-face face-3">${front}</div><div class="cube-face face-4">${action}</div></div>` : front;
document.body.className = `size-${width}x${height} kind-${kind}`;
document.body.innerHTML = `<main class="ad"><div class="stage">${inner}</div><a class="click-area" href="${destination}" target="_blank" rel="noopener noreferrer" aria-label="Solicita tu Tarjeta de Crédito Bantrab"></a></main>`;
if (new URLSearchParams(location.search).has('static')) document.body.classList.add('static');
if (new URLSearchParams(location.search).get('face') === 'action') document.body.classList.add('show-action');
const scale = Number(new URLSearchParams(location.search).get('scale'));
if (scale > 0 && scale < 1) {
  const ad = document.querySelector('.ad');
  ad.style.transform = `scale(${scale})`;
  ad.style.transformOrigin = 'top left';
}
