import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './footer.css';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function Footer() {
  const footerRef = useRef(null);
  useLayoutEffect(() => {
    const footer = footerRef.current;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      // Keep the artwork stationary; animate only its composited opacity.
      gsap.fromTo(footer.querySelector('.site-footer__scene'),
        { opacity: 0 },
        {
          opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: footer, start: 'top bottom', end: 'bottom bottom',
            scrub: 0.25,
          },
        });
    });
    let active = true;
    let refreshTimer;
    const refresh = () => {
      if (!active) return;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => { if (active) ScrollTrigger.refresh(); }, 120);
    };
    document.fonts.ready.then(refresh);
    // Lazy images must not hold the initial layout refresh hostage.
    document.addEventListener('load', refresh, true);
    document.addEventListener('error', refresh, true);
    return () => {
      active = false; clearTimeout(refreshTimer);
      document.removeEventListener('load', refresh, true);
      document.removeEventListener('error', refresh, true);
      media.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="site-footer" aria-label="RobotECS Team 12394">
      <div className="site-footer__scene">
        <div className="site-footer__identity">
          <img src="/assets/frc-official.png" width="158" alt="FIRST Robotics Competition" />
          <p>RobotECS <span>TEAM 12394</span></p>
        </div>
      </div>
    </footer>
  );
}
