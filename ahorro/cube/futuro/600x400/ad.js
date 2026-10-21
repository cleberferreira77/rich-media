(() => {
  const { kind, variant, width, height } = window.BANTRAB_AD;
  document.body.className = `size-${width}x${height} kind-${kind}`;
  const face = new URLSearchParams(location.search).get('face');
  if (['front', 'offer'].includes(face)) document.body.classList.add('static-face', `static-${face}`);
  const card = (id, image, line) => `<section class="scene scene-${id}" aria-label="Cuenta de Ahorro: ${line}">
    <div class="photo" style="background-image:url('assets/${image}')"></div>
    <div class="shade"></div>
    <img class="title-art" src="assets/cuenta-ahorro.png" alt="Cuenta de AHORRO">
    <div class="message"><div class="promise"><strong>TUYA</strong> para ${line}</div><div class="rate">con una tasa de hasta el <strong>6%</strong></div></div>
    <div class="float-badge" aria-hidden="true"><span>hasta el</span><strong>6%</strong></div>
  </section>`;
  const line = variant === 'futuro' ? 'respaldar su futuro' : 'hacer realidad tus sueños';
  const photo = variant === 'futuro' ? 'familia.jpg' : 'suenos.jpg';
  const first = card('front', photo, line);
  const offer = `<section class="scene scene-offer" aria-label="Bantrab: solicita tu cuenta aquí"><div class="final-glow"></div><img class="final-brand" src="assets/bantrab-60.png" alt="60 años Bantrab"><span class="blue-cta">Solicita tu cuenta aquí <b aria-hidden="true">↗</b></span></section>`;
  const scenes = kind === 'cube' ? `<div class="cube"><div class="cube-face face-1">${first}</div><div class="cube-face face-2">${offer}</div></div>` : first;
  document.body.innerHTML = `<main class="ad" style="--ad-width:${width}px;--ad-height:${height}px">
    <div class="stage ${kind === 'cube' ? 'cube-stage' : 'floating-stage'}">${scenes}</div>
    <div class="footer"><img src="assets/bantrab-60.png" alt="60 años Bantrab"><span class="cta">Solicita tu cuenta aquí <b aria-hidden="true">↗</b></span></div>
    <a class="click-area" href="https://experienciabantrab.com/ahorro/" target="_blank" rel="noopener" aria-label="Solicita tu cuenta de ahorro en Bantrab"></a>
  </main>`;
  const link = document.querySelector('.click-area');
  link.addEventListener('click', event => {
    const destination = window.clickTag || window.clickTAG || 'https://experienciabantrab.com/ahorro/';
    link.href = destination;
  });
})();
