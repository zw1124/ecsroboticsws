import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BuildStory from './BuildStory';
gsap.registerPlugin(ScrollTrigger);
export default function AboutChapter() {
  const root = useRef(null);
  const progressTrigger = useRef(null);
  const [step, setStep] = useState(undefined);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 901px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)', () => {
      setStep(0);
      const trigger = ScrollTrigger.create({
        trigger: root.current, start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 2.4),
        pin: true, pinSpacing: true, anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => setStep(Math.min(3, Math.floor(self.progress * 4))),
      });
      progressTrigger.current = trigger;
      return () => { trigger.kill(); progressTrigger.current = null; setStep(undefined); };
    });
    return () => media.revert();
  }, []);
  return <div className="about-approach-stage" ref={root}><BuildStory activeStep={step} onSelect={index => {
    const trigger = progressTrigger.current;
    if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * ((index + 0.3) / 4), behavior: 'instant' });
  }}/></div>;
}
