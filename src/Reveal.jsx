import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Above-the-fold content is immediate. Offscreen compositions enter once.
export default function Reveal({ children, className = '', as: Element = 'div', ...props }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const parts = [...ref.current.querySelectorAll('[data-reveal]')];
      const pending = parts.filter(part => part.getBoundingClientRect().top >= window.innerHeight);
      if (!pending.length) return;
      const animations = [];
      gsap.set(pending, { opacity: 0, y: 18 });
      const observer = new IntersectionObserver(entries => {
        const entering = entries.filter(entry => entry.isIntersecting).map(entry => entry.target);
        if (!entering.length) return;
        animations.push(gsap.to(entering, { opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease: 'power3.out', clearProps: 'opacity,transform' }));
        entering.forEach(part => observer.unobserve(part));
      }, { threshold: 0.08 });
      pending.forEach(part => observer.observe(part));
      return () => { observer.disconnect(); animations.forEach(animation => animation.kill()); gsap.set(pending, { clearProps: 'opacity,transform' }); };
    });
    return () => media.revert();
  }, []);
  return <Element ref={ref} className={className} {...props}>{children}</Element>;
}
