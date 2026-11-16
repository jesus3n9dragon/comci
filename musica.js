// Música original: se reproduce únicamente después del clic del visitante.
(() => {
  const audio = document.getElementById('ambience');
  const toggle = document.getElementById('musicControl');
  const label = document.getElementById('musicControlText');
  if (!audio || !toggle) return;
  audio.volume = 0.16;
  let wantsMusic = false;
  function sync() {
    const playing = !audio.paused;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Silenciar música ambiental' : 'Activar música ambiental');
    if (label) label.textContent = playing ? 'Música: ON' : 'Música: OFF';
  }
  toggle.addEventListener('click', async () => {
    wantsMusic = audio.paused;
    if (wantsMusic) { try { await audio.play(); } catch(e) { wantsMusic=false; } }
    else audio.pause();
    sync();
  });
  // Al entrar al lector, detener la música para que no distraiga.
  window.addEventListener('hashchange', () => {
    const reading = /^#(volumenes|leer|capitulo)/i.test(location.hash);
    if (reading && !audio.paused) { audio.pause(); wantsMusic=false; sync(); }
  });
  audio.addEventListener('pause',sync);audio.addEventListener('play',sync);
  sync();
})();
