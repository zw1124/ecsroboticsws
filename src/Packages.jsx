import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './packages.css';

const tiers = [
  { key: 'community', art: 'community-simple', headline: ['Your name.', 'Part of our story.'], benefit: 'Logo on our Sponsors page', benefits: ['Logo on our Sponsors page'] },
  { key: 'bronze', art: 'bronze-simple', headline: ['Recognition,', 'beyond the field.'], benefit: 'Priority placement + social recognition', benefits: ['Priority placement on our Sponsors page', 'A social media thank-you'] },
  { key: 'silver', art: 'silver-simple', headline: ['With the team.', 'In the pit.'], benefit: 'Team T-shirt + pit recognition', benefits: ['Priority placement on our Sponsors page', 'A social media thank-you', 'Logo on team T-shirts', 'Recognition on pit signage'] },
  { key: 'gold', art: 'gold-simple', headline: ['On the robot.', 'Into competition.'], benefit: 'Your logo on our robot', benefits: ['Priority placement on our Sponsors page', 'A social media thank-you', 'Logo on team T-shirts', 'Recognition on pit signage', 'Your logo on our robot'] },
  { key: 'premier', art: 'premier-simple', headline: ['Our most visible', 'partnership.'], benefit: 'Our most prominent placement', benefits: ['Priority placement on our Sponsors page', 'A social media thank-you', 'Logo on team T-shirts', 'Recognition on pit signage', 'Your logo on our robot', 'Our most prominent logo placement'] },
];

export default function Packages({ levels, onChoose }) {
  const [selected, setSelected] = useState(4);
  const [transitionFrom, setTransitionFrom] = useState(4);
  const tierButtons = useRef([]);
  const rootRef = useRef(null);
  const previousTier = useRef(selected);
  const galleryRef = useRef(null);
  const frameRef = useRef(null);
  const selectedRef = useRef(selected);
  const frameTween = useRef(null);
  const frameReady = useRef(false);
  const chooseTier = index => {
    if (index === selected) return;
    setTransitionFrom(selected);
    setSelected(index);
  };
  const positionFrame = animate => {
    const gallery = galleryRef.current;
    const frame = frameRef.current;
    const picture = tierButtons.current[selectedRef.current]?.querySelector('.sponsor-tier__picture');
    if (!gallery || !frame || !picture) return;
    const bounds = gallery.getBoundingClientRect();
    // Measure the unanimated button so the artwork's lift cannot skew the frame.
    const buttonBounds = tierButtons.current[selectedRef.current].getBoundingClientRect();
    const target = { x: buttonBounds.left - bounds.left - 6, y: buttonBounds.top - bounds.top - 6, width: picture.offsetWidth + 12, height: picture.offsetHeight + 12, opacity: 1 };
    frameTween.current?.kill();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const outlines = frame.querySelectorAll('.sponsor-frame-contour');
    const outline = outlines[0];
    const runner = frame.querySelector('.sponsor-frame-runner');
    const width = target.width;
    const height = target.height;
    // Integer-pixel stair corners; the stroke follows a single continuous contour.
    const contour = `M 16 4 H ${width - 16} V 8 H ${width - 8} V 16 H ${width - 4} V ${height - 16} H ${width - 8} V ${height - 8} H ${width - 16} V ${height - 4} H 16 V ${height - 8} H 8 V ${height - 16} H 4 V 16 H 8 V 8 H 16 Z`;
    frame.querySelectorAll('path').forEach(path => path.setAttribute('d', contour));
    gsap.set(frame, { ...target, scale: 1 });
    const perimeter = outline.getTotalLength();
    if (animate && frameReady.current && !reduceMotion) {
      frameTween.current = gsap.timeline()
        .set(outlines, { strokeDasharray: perimeter, strokeDashoffset: perimeter, opacity: 1 })
        .set(runner, { strokeDasharray: `32 ${perimeter}`, strokeDashoffset: 32, opacity: 0 })
        .to(outlines, { strokeDashoffset: 0, duration: 0.52, ease: 'steps(48)' })
        .set(runner, { opacity: 1 }, 0.32)
        .to(runner, { strokeDashoffset: -perimeter, duration: 0.64, ease: 'steps(64)' }, 0.32)
        .set(runner, { opacity: 0 });
    } else {
      gsap.set(outlines, { strokeDasharray: 'none', strokeDashoffset: 0, opacity: 1 });
      gsap.set(runner, { opacity: 0 });
    }
    frameReady.current = true;
    rootRef.current.dataset.frameReady = 'true';
  };
  useLayoutEffect(() => {
    const resize = new ResizeObserver(() => positionFrame(false));
    resize.observe(galleryRef.current);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => positionFrame(false);
    media.addEventListener('change', settle);
    return () => { resize.disconnect(); media.removeEventListener('change', settle); frameTween.current?.kill(); };
  }, []);
  useLayoutEffect(() => {
    selectedRef.current = selected;
    positionFrame(true);
  }, [selected]);
  useLayoutEffect(() => {
    const previous = previousTier.current;
    previousTier.current = selected;
    if (previous === selected || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    const card = tierButtons.current[selected];
    const picture = card.querySelector('.sponsor-tier__picture');
    const image = picture.querySelector('img');
    const canvas = picture.querySelector('canvas');
    const brush = canvas.getContext('2d');
    const resolution = { frame: 0 };
    const sizes = [12, 18, 28, 44, 72, 112, 180, 288, 512];
    let lastFrame = -1;
    const paint = () => {
      const frame = Math.min(sizes.length - 1, Math.floor(resolution.frame));
      if (frame === lastFrame || !image.complete || !image.naturalWidth) return;
      lastFrame = frame;
      canvas.width = sizes[frame];
      canvas.height = sizes[frame];
      brush.imageSmoothingEnabled = false;
      brush.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    const direction = selected > previous ? 1 : -1;
    const rows = Array.from(root.querySelectorAll('.sponsor-recognition__benefits li'));
    const added = rows.filter(row => direction > 0 && !tiers[previous].benefits.includes(row.dataset.benefit));
    const retained = rows.filter(row => !added.includes(row));
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (image.complete && image.naturalWidth && brush) {
        paint();
        timeline.set(canvas, { opacity: 1 })
          .to(resolution, { frame: sizes.length - 1, duration: 0.72, ease: 'none', onUpdate: paint }, 0)
          .to(canvas, { opacity: 0, duration: 0.1, ease: 'steps(2)' }, 0.72);
      }
      timeline.set(picture, { y: 0, rotation: 0 }, 0)
        .fromTo(card.querySelector('.sponsor-tier__caption'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.12)
        .fromTo(root.querySelector('.sponsor-recognition__summary > .eyebrow'), { opacity: 0, x: direction * 12 }, { opacity: 1, x: 0, duration: 0.35 }, 0.08)
        .fromTo(root.querySelectorAll('.sponsor-recognition__line'), { yPercent: 110, rotate: direction * 2, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.6, stagger: 0.075 }, 0.1)
        .fromTo(root.querySelector('.sponsor-recognition__summary > .button'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.3);
      if (retained.length) timeline.fromTo(retained, { y: 8, opacity: 0.35 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.035 }, 0.2);
      if (added.length) {
        timeline.fromTo(added, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.055 }, 0.3)
          .fromTo(added.map(row => row.querySelector('.sponsor-benefit__check')), { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, stagger: 0.055, ease: 'back.out(1.4)' }, 0.42);
      }
    }, root);
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => { if (motionPreference.matches) context.revert(); };
    motionPreference.addEventListener('change', settle);
    return () => { motionPreference.removeEventListener('change', settle); context.revert(); };
  }, [selected]);
  const selectWithKeyboard = (event, index) => {
    const moves = { ArrowRight: (index + 1) % levels.length, ArrowLeft: (index - 1 + levels.length) % levels.length, Home: 0, End: levels.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = moves[event.key];
    chooseTier(next);
    tierButtons.current[next]?.focus();
  };
  const [name, amount] = levels[selected];
  const tier = tiers[selected];
  return <section ref={rootRef} className="sponsor-packages" data-active-tier={tier.key} aria-labelledby="packages-title">
    <header className="sponsor-packages__intro">
      <div><p className="eyebrow">SPONSORSHIP / TEAM 12394</p><h1 id="packages-title">A first season.<br/>Built <span>together.</span></h1></div>
      <div className="sponsor-packages__intro-copy"><p>Support the students behind the robot. Find a partnership that fits your organization and helps our first season take shape.</p><a className="text-link" href="mailto:kajin30@ecsloudoun.org">Talk with our team <PackageArrow/></a></div>
    </header>

    <p className="sponsor-packages__legend">Choose your level of support.</p>
    <div ref={galleryRef} className="sponsor-packages__cards" role="tablist" aria-label="Sponsorship levels">
      {levels.map(([label, price], index) => <article role="presentation" key={label} className={'sponsor-tier sponsor-tier--' + tiers[index].key} data-selected={selected === index}>
        <button ref={node => { tierButtons.current[index] = node; }} id={'sponsor-tab-' + index} role="tab" className="sponsor-tier__button" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} aria-controls="sponsor-recognition" onClick={() => chooseTier(index)} onKeyDown={event => selectWithKeyboard(event, index)}>
          <span className="sponsor-tier__picture"><img className="sponsor-tier__art" src={'/assets/sponsor-' + (tiers[index].art || tiers[index].key) + '.webp'} alt="" width="1024" height="1024" loading="lazy" /><canvas className="sponsor-tier__resolve" aria-hidden="true" /></span>
          <span className="sponsor-tier__caption"><span className="sponsor-tier__name">{label}<span className="sponsor-tier__arrow" aria-hidden="true">{selected === index ? '↗' : '→'}</span></span><span className="sponsor-tier__amount">{price}</span>{index === 4 && <span className="sponsor-tier__note">Our highest level of support</span>}</span>
        </button>
      </article>)}
      <span ref={frameRef} className="sponsor-gallery-frame" aria-hidden="true"><svg width="100%" height="100%"><path className="sponsor-frame-contour sponsor-frame-depth" /><path className="sponsor-frame-contour sponsor-frame-face" /><path className="sponsor-frame-runner" /></svg></span>
    </div>

    <p className="sponsor-packages__status" role="status" aria-live="polite" aria-atomic="true">{name} sponsorship, {amount}. {tier.benefit}.{selected > transitionFrom && ` Adds ${tier.benefits.filter(benefit => !tiers[transitionFrom].benefits.includes(benefit)).length} recognition benefits compared with ${levels[transitionFrom][0]}.`}</p>
    <article id="sponsor-recognition" className={'sponsor-recognition sponsor-recognition--' + tier.key} role="tabpanel" aria-labelledby={'sponsor-tab-' + selected} tabIndex={0}>
      <div className="sponsor-recognition__summary"><p className="eyebrow">{name.toUpperCase()} / {amount}</p><h2 id="recognition-title"><span className="sponsor-recognition__line-wrap"><span className="sponsor-recognition__line">{tier.headline[0]}</span></span><span className="sponsor-recognition__line-wrap sponsor-recognition__line-wrap--accent"><span className="sponsor-recognition__line">{tier.headline[1]}</span></span></h2><button className="button dark" onClick={() => onChoose(name)}>Become a {name} partner <PackageArrow/></button><p>We’ll help you work out the details.</p></div>
      <div className="sponsor-recognition__benefits"><p className="eyebrow">YOUR PARTNERSHIP INCLUDES</p><ul>{tier.benefits.map(benefit => <li key={benefit} data-benefit={benefit}><span className="sponsor-benefit__check" aria-hidden="true">✓</span>{benefit}</li>)}</ul></div>
    </article>

    <div className="sponsor-packages__other"><h2>Have something else in mind?</h2><p>Tools, materials, electronics, and fabrication services are welcome, too.</p><button className="text-link" onClick={() => onChoose('General question')}>Let’s talk <PackageArrow/></button></div>
    <p className="sponsor-packages__terms">Recognition is subject to team, school, and competition rules and approval.</p>
  </section>;
}

function PackageArrow() {
  return <span className="arrow" aria-hidden="true"><img src="/assets/arrow.svg" alt="" /></span>;
}
