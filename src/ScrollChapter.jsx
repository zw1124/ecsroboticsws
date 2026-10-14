import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BuildStory from './BuildStory';
import { FirstBuild } from './LowerHome';
gsap.registerPlugin(ScrollTrigger);
export default function ScrollChapter() {
  const root = useRef(null);
  const [step, setStep] = useState(undefined);
  const progressTrigger = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 901px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)', () => {
      const container = root.current;
      const story = container.querySelector('.chapter-still');
      const panel = container.querySelector('.season-takeover');
      const copy = story.querySelector('.approach-editorial');
      container.classList.add('scroll-chapter--animated');
      setStep(0);
      gsap.set(panel, { y: () => window.innerHeight, visibility: 'visible', force3D: true });
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: container, start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 3.6),
        pin: true, pinSpacing: true, anticipatePin: 1,
        scrub: true, invalidateOnRefresh: true,
      }});
      const progress = { value: 0 };
      timeline.to(progress, { value: 1, duration: 3, ease: 'none', onUpdate: () => setStep(Math.min(3, Math.floor(progress.value * 4))) })
        .to(panel, { y: 0, duration: 1.4, ease: 'none' }, 3)
        .to(copy, { opacity: 0.18, filter: 'blur(8px)', duration: 0.8, ease: 'none' }, 3);
      progressTrigger.current = timeline.scrollTrigger;
      return () => {
        timeline.scrollTrigger?.kill();
        timeline.revert();
        gsap.set([panel, story, copy], { clearProps: 'all' });
        container.classList.remove('scroll-chapter--animated');
        progressTrigger.current = null;
        setStep(undefined);
      };
    });
    return () => media.revert();
  }, []);
  return <div className="scroll-chapter" ref={root}><div className="chapter-still"><BuildStory activeStep={step} onSelect={index => {
    const trigger = progressTrigger.current;
    if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * (((index + 0.3) / 4) * 3 / 4.4), behavior: 'instant' });
  }}/></div><FirstBuild/></div>;
}
