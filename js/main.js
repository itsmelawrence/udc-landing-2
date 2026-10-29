/* Universal Dental Clinic — progressive enhancements.
   Without this file the page is a complete, static, readable document. */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) root.classList.add('js-motion');

  // Footer year
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // Hero reveal once fonts are ready (avoids revealing fallback type),
  // with a timeout so slow font loads never leave the headline hidden.
  const reveal = () => root.classList.add('is-loaded');
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(reveal);
  } else {
    reveal();
  }

  if (reduceMotion) return;

  /* ---- Manifesto: split into words; light them up with scroll progress ---- */
  const scrubText = document.querySelector('[data-scrub]');
  const manifesto = scrubText ? scrubText.closest('.manifesto') : null;
  let words = [];
  if (scrubText) {
    // Keep the readable sentence for assistive tech; the spans are visual only.
    scrubText.setAttribute('aria-label', scrubText.textContent.trim());
    scrubText.innerHTML = scrubText.textContent.trim().split(/\s+/)
      .map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    words = Array.from(scrubText.querySelectorAll('.w'));
  }

  /* ---- Visit: vertical scroll drives a horizontal track (desktop only) ---- */
  const hSection = document.querySelector('[data-hscroll]');
  const track = hSection ? hSection.querySelector('[data-track]') : null;
  const bar = hSection ? hSection.querySelector('[data-progress]') : null;
  const desktop = window.matchMedia('(min-width: 64rem)');
  let travel = 0;

  const sizeHorizontal = () => {
    if (!hSection || !track) return;
    if (desktop.matches) {
      // Distance the track must move so its last panel ends at the right gutter
      const gutter = parseFloat(getComputedStyle(hSection.firstElementChild).paddingLeft) || 0;
      travel = Math.max(0, track.scrollWidth - (window.innerWidth - gutter * 2));
      hSection.style.height = `${window.innerHeight + travel}px`;
    } else {
      travel = 0;
      hSection.style.height = '';
      track.style.transform = '';
    }
  };

  const progressOf = (el) => {
    // 0 when the element's top reaches the viewport top, 1 when its bottom reaches the viewport bottom
    const r = el.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
  };

  let ticking = false;
  const update = () => {
    ticking = false;

    if (manifesto && words.length) {
      // Finish slightly before the end so the full sentence rests on screen
      const p = Math.min(1, progressOf(manifesto) / 0.8);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-on', i < lit));
    }

    if (hSection && track && travel > 0) {
      const p = progressOf(hSection);
      track.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
      if (bar) bar.style.transform = `scaleX(${p})`;
    }
  };

  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };

  sizeHorizontal();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { sizeHorizontal(); update(); });
  desktop.addEventListener('change', () => { sizeHorizontal(); update(); });
  // Images and fonts can change track width after first paint
  window.addEventListener('load', () => { sizeHorizontal(); update(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizeHorizontal(); update(); });
})();
