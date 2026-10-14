import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const steps = [
  ['Learn', 'It starts with a better question.', 'Sketch, test, and discover. Every idea gives us something new to learn.'],
  ['Build', 'Give the idea a working form.', 'Mechanical, electrical, and software systems come together, one iteration at a time.'],
  ['Lead', 'Take ownership. Bring others along.', 'Share what we know, communicate clearly, and help every teammate grow.'],
  ['Serve', 'Make the work matter beyond us.', 'Put our engineering skills to work for our school and our community.'],
];
export default function BuildStory({ activeStep, onSelect }) {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [teamsOpen, setTeamsOpen] = useState(false);
  useLayoutEffect(() => {
    if (activeStep !== undefined) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const trigger = ScrollTrigger.create({ trigger: root.current, start: 'top 65%', end: 'bottom 35%', onUpdate: self => setActive(Math.min(3, Math.floor(self.progress * 4))) });
      return () => trigger.kill();
    });
    return () => media.revert();
  }, [activeStep !== undefined]);
  const selected = activeStep ?? active;
  return <section ref={root} className="approach-editorial section" id="goals" aria-labelledby="approach-title">
    <p className="eyebrow">THE ROBOTECS APPROACH</p>
    <h2 id="approach-title" className={teamsOpen ? 'approach-title teams-open' : 'approach-title'}><span className="approach-title__line">Building a robot takes engineering.</span><br/><span className="approach-title__line"><span className="team-keyword" onMouseEnter={() => setTeamsOpen(true)} onMouseLeave={() => setTeamsOpen(false)}><button className="team-keyword__trigger" aria-expanded={teamsOpen} aria-controls="approach-team-labels" onClick={() => setTeamsOpen(open => !open)} onFocus={() => setTeamsOpen(true)} onBlur={event => { if (!event.currentTarget.parentElement.contains(event.relatedTarget)) setTeamsOpen(false); }} onKeyDown={event => { if (event.key === 'Escape') setTeamsOpen(false); }}>Building a team</button><span className="team-keyword__labels" id="approach-team-labels" hidden={!teamsOpen}>{['Outreach', 'Programming', 'Build', 'Design'].map(name => <span key={name}>{name}</span>)}</span></span> takes more.</span></h2>
    <div className="approach-story">
      <div className="approach-description"><div className="approach-selector" aria-label="Explore our approach">{steps.map(([name], i) => <button key={name} onClick={() => { setActive(i); onSelect?.(i); }} aria-pressed={selected === i} aria-label={name}><span /></button>)}</div><h3>{steps[selected][1]}</h3><p>{steps[selected][2]}</p></div>
      <div className="approach-word" key={selected}><span>0{selected + 1} / 04</span><p>{steps[selected][0]}<i>.</i></p></div>
    </div>
  </section>;
}
