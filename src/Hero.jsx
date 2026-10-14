import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './hero-opening.css';

const columns = 24;
const rows = 16;
const tiles = Array.from({ length: columns * rows }, (_, index) => ({
  column: index % columns,
  row: Math.floor(index / columns),
}));
const letters = text => Array.from(text, (letter, index) => (
  <span className="hero-character" aria-hidden="true" key={index}>{letter === ' ' ? '\u00a0' : letter}</span>
));

export default function Hero() {
  const heroRef = useRef(null);
  useLayoutEffect(() => {
    const hero = heroRef.current;
    const header = document.querySelector('.topbar');
    const image = hero.querySelector('.hero-image');
    let active = true;
    let timeline;
    const media = gsap.matchMedia();
    const show = () => {
      hero.classList.remove('is-intro');
      gsap.set(header, { autoAlpha: 1 });
    };
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (location.hash || window.scrollY > 80) { show(); return; }
      let current = true;
      const label = hero.querySelectorAll('.hero-identity-label .hero-character');
      const digits = hero.querySelectorAll('.hero-identity-number .hero-character');
      const canvas = hero.querySelector('.hero-opening-canvas');
      const brush = canvas.getContext('2d');
      const resolution = { value: 0 };
      const grids = [18, 26, 38, 56, 84, 128, 192, 288, 448, 704, 1152];
      let lastGrid = -1;
      const paint = (force = false) => {
        if (!brush || !image.complete || !image.naturalWidth) return;
        const grid = Math.min(grids.length - 1, Math.floor(resolution.value));
        if (!force && grid === lastGrid) return;
        lastGrid = grid;
        const box = hero.getBoundingClientRect();
        canvas.width = grids[grid];
        canvas.height = Math.max(1, Math.round(canvas.width * box.height / box.width));
        const scale = Math.max(box.width / image.naturalWidth, box.height / image.naturalHeight);
        const sourceWidth = box.width / scale;
        const sourceHeight = box.height / scale;
        const position = getComputedStyle(image).objectPosition.split(' ').map(value => parseFloat(value) / 100);
        const x = (image.naturalWidth - sourceWidth) * (position[0] || 0.5);
        const y = (image.naturalHeight - sourceHeight) * (position[1] || 0.5);
        brush.imageSmoothingEnabled = false;
        brush.drawImage(image, x, y, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
      };
      const resize = new ResizeObserver(() => paint(true));
      resize.observe(hero);
      const pixels = hero.querySelectorAll('.hero-reveal-pixel');
      gsap.set(header, { autoAlpha: 0 });
      gsap.set([...label, ...digits], { visibility: 'visible', opacity: 1, y: 0, yPercent: 0 });
      timeline = gsap.timeline({ paused: true, onComplete: () => { resize.disconnect(); show(); } });
      timeline.call(() => paint(true), [], 0)
        .to(pixels, {
          opacity: 0, duration: 0.06, ease: 'steps(1)',
          stagger: index => {
            const { row, column } = tiles[index];
            // The scene opens outward from the campus, rather than a diagonal wipe.
            const distance = Math.hypot((column / columns - 0.65) * 1.1, row / rows - 0.48);
            return distance * 0.85;
          },
        }, 0.08)
        .to(resolution, { value: grids.length - 1, duration: 3.05, ease: 'power1.inOut', onUpdate: () => paint() }, 0.2)
        .to(canvas, { opacity: 0, duration: 0.4, ease: 'steps(5)' }, 3.25)
        .to([header, hero.querySelector('.location')], { autoAlpha: 1, duration: 0.45, ease: 'power2.out' }, 3.35);
      // Never hold navigation behind an undecoded image indefinitely.
      const imageReady = image.decode ? image.decode().catch(() => {}) : Promise.resolve();
      const fallback = window.setTimeout(() => {
        if (active && current) { timeline.progress(1); show(); }
      }, 4500);
      Promise.all([imageReady, document.fonts.ready]).then(() => {
        window.clearTimeout(fallback);
        if (active && current && timeline.progress() < 1) timeline.play();
      });
      const skipOnScroll = () => { if (window.scrollY > 80) timeline.progress(1); };
      const skipOnKeyboard = event => { if (event.key === 'Tab') timeline.progress(1); };
      window.addEventListener('scroll', skipOnScroll, { passive: true });
      window.addEventListener('keydown', skipOnKeyboard);
      return () => {
        current = false;
        resize.disconnect();
        window.clearTimeout(fallback);
        window.removeEventListener('scroll', skipOnScroll);
        window.removeEventListener('keydown', skipOnKeyboard);
      };
    });
    media.add('(prefers-reduced-motion: reduce)', show);
    return () => { active = false; media.revert(); };
  }, []);

  return <>
    <section ref={heroRef} className="hero is-intro" id="home">
      <img fetchPriority="high" className="hero-image" decoding="async" width="1536" height="1024" src="/assets/hero-ecs-airy.webp" alt="Pixel-art interpretation of Evergreen Christian School, based on supplied campus photographs, with its white-column entrance and stepped brick rooflines" />
      <canvas className="hero-opening-canvas" aria-hidden="true" />
      <div className="hero-pixel-cover" aria-hidden="true">
        {tiles.map(({ column, row }, index) => <span className="hero-reveal-pixel" key={index} style={{ left: `${column / columns * 100}%`, top: `${row / rows * 100}%` }} />)}
      </div>
      <div className="location">Loudoun, Virginia</div>
      <div className="hero-card-track"><article className="hero-card">
        <h1 className="hero-card-identity" aria-label="FRC team 12394">
          <span className="hero-identity-label">{letters('FRC team')}</span>
          <span className="hero-identity-number">{letters('12394')}</span>
        </h1>
      </article></div>
    </section>
    <div className="hero-divider" aria-hidden="true"><span /><span /><span /><span /></div>
  </>;
}
