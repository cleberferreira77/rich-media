(() => {
  const config = window.BANTRAB_AD;
  const destination = window.clickTag || window.clickTAG || 'http://bantrab.com/';
  const asset = (name) => `assets/${name}`;

  const stories = [
    {
      id: '03',
      alt: 'Trabalhadora guatemalteca sorrindo em sua padaria',
      copy: `
        <h1><em>Cada historia</em><br>es única y sus metas también</h1>
        <p>Miles de trabajadores guatemaltecos tienen la confianza de saber que somos un banco que está presente en cada etapa de su vida.</p>
        <p class="proof"><strong>+199 millones</strong><span>en consolidación de deudas</span></p>`
    },
    {
      id: '04',
      alt: 'Casal de idosos guatemaltecos olhando um álbum de fotografias',
      copy: `
        <h1>Nuestro propósito de<br><em>brindar bienestar</em><br>no tiene edad</h1>
        <p>Con el programa de Bienestar Mayor, nuestro seguro de vida te protege hasta los <strong>100 años.</strong></p>`
    },
    {
      id: '05',
      alt: 'Família guatemalteca sorrindo com seu bebê',
      copy: `
        <h1><em>Ayer:</em></h1>
        <p>Comenzamos creyendo en el valor del trabajo</p>
        <h2><em>Hoy:</em></h2>
        <p>Ese compromiso se refleja en la vida <strong>+145 mil familias,</strong> que hoy cuentan con una mejor salud financiera.</p>`
    }
  ];

  const story = (item, index, extraClass = '') => `
    <article class="story story-${item.id} ${extraClass}" aria-label="Historia ${index + 1} de 3">
      <div class="photo-wrap"><img class="photo" src="${asset(`foto-${item.id}.jpg`)}" alt="${item.alt}"></div>
      <img class="campaign-logo" src="${asset('tuyo-60.png')}" alt="Tuyo desde hace 60 años">
      <div class="copy-panel">${item.copy}</div>
    </article>`;

  const closing = `
    <article class="story closing-face" aria-label="Bantrab, Tuyo desde hace 60 años">
      <div class="closing-glow"></div>
      <img class="closing-campaign" src="${asset('tuyo-60.png')}" alt="Tuyo desde hace 60 años">
      <img class="closing-signature" src="${asset('assinatura-60-bantrab.png')}" alt="60 años Bantrab">
      <span class="closing-cta">Conoce más <span aria-hidden="true">↗</span></span>
    </article>`;

  const floating = `
    <div class="floating-stage">${stories.map((item, index) => story(item, index, `scene-${index + 1}`)).join('')}</div>
    <img class="floating-object" src="${asset('selo-60-anos.png')}" alt="" aria-hidden="true">`;

  const cube = `
    <div class="cube-stage"><div class="cube">
      ${stories.map((item, index) => `<div class="cube-face face-${index + 1}">${story(item, index)}</div>`).join('')}
      <div class="cube-face face-4">${closing}</div>
    </div></div>`;

  document.title = `Bantrab 60 años — ${config.kind === 'cube' ? '3D Cube' : 'Floating Object'} ${config.width}×${config.height}`;
  document.body.className = `${config.kind} size-${config.width}x${config.height}`;
  document.body.innerHTML = `
    <main class="ad" style="--ad-width:${config.width}px;--ad-height:${config.height}px">
      ${config.kind === 'cube' ? cube : floating}
      <div class="ad-footer" aria-hidden="true">
        <img src="${asset('assinatura-60-bantrab.png')}" alt="">
        <span class="cta">Conoce más <span>↗</span></span>
      </div>
      <a class="click-area" href="${destination}" target="_blank" rel="noopener noreferrer" aria-label="Conoce más sobre Bantrab"></a>
    </main>`;
})();
