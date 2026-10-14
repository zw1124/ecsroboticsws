import React,{useState, useLayoutEffect, useRef} from 'react';
import { gsap } from 'gsap';
import TeamGroups from './TeamGroups';
import { groups } from './team';
import Reveal from './Reveal';
export default function LowerHome(){return <>
<TeamGroups/>
<Reveal as="section" className="join-build section"><p className="eyebrow">A PLACE FOR YOUR SUPPORT</p><h2 data-reveal>The next part<br/>could start <span>with you.</span></h2><div data-reveal><p>Tools. Materials. A little expertise.<br/>Every contribution gives an idea somewhere to go.</p><a href="/packages" className="button dark">Find your way to help <span aria-hidden="true">↗</span></a><a href="/contact" className="text-link">Or just say hello <span aria-hidden="true">↗</span></a></div></Reveal>
</>}

export function FirstBuild() {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const cycleRef = useRef(null);
  const visibleRef = useRef(false);
  const pausedRef = useRef(paused);
  const stages = [
        ['Outreach', 'Connect with sponsors, share our story, and bring robotics to our community.', 'Connecting our team with our community.'],
        ['Programming', 'Write robot code, work with sensors, and test autonomous routines.', 'Turning code into controlled motion.'],
        ['Build', 'Fabricate parts, assemble mechanisms, and wire the robot.', 'Making the robot work, part by part.'],
        ['Design', 'Model mechanisms in CAD and check fit, movement, and clearances.', 'Working out the details before the build.'],
      ];
  const cardRef = useRef(null);
  useLayoutEffect(() => {
    const card = cardRef.current;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const note = card.querySelector('.season-process');
      const detail = card.querySelector('.season-dynamic-detail');

      let index = 0;
      const cycle = gsap.timeline({ repeat: -1, paused: true });
      cycleRef.current = cycle;
      cycle.to({}, { duration: 4.8 })
        .to(note, { opacity: 0, x: 16, duration: 0.22, ease: 'power1.in' })
        .to(detail, { opacity: 0, duration: 0.15 }, '<')
        .call(() => {
          index = (index + 1) % stages.length;
          setStage(index);
        })
        .set(note, { x: 12 })
        .to(note, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' })
        .to(detail, { opacity: 1, duration: 0.35 }, '<');
      const observer = new IntersectionObserver(entries => {
        visibleRef.current = entries.some(entry => entry.isIntersecting);
        if (visibleRef.current && !pausedRef.current && !document.hidden) cycle.play();
        else cycle.pause();
      }, { threshold: 0.2 });
      observer.observe(card);
      const visibility = () => cycle.paused(document.hidden || pausedRef.current || !visibleRef.current);
      document.addEventListener('visibilitychange', visibility);
      return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); cycle.revert(); cycleRef.current = null; };
    });
    return () => media.revert();
  }, []);
  useLayoutEffect(() => {
    pausedRef.current = paused;
    cycleRef.current?.paused(paused || !visibleRef.current || document.hidden);
  }, [paused]);
  return <section ref={cardRef} className="season-takeover" id="season" aria-labelledby="season-title">
  <img loading="lazy" decoding="async" width="1536" height="1024" src="/assets/season-bright-robot.webp" alt="Original pixel-art concept of an FRC-style robot under a bright blue sky" />
  <div className="season-takeover__copy"><p className="eyebrow">CHAPTER ONE / TEAM 12394</p><h2 id="season-title">From a blank page.<br/>To a first build.</h2><p>Our first season starts here.<br/><span className="season-dynamic-detail">{stages[stage][2]}</span></p><a className="button dark" href="/about">Meet the builders <span aria-hidden="true">↗</span></a></div>
  <aside className="season-process" data-team={stage} aria-label="Our four team groups"><span className="season-process__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M4 10h4l10-5v14L8 14H4zM8 14l2 6h3l-2-5M21 9v6"/></svg>
    <svg viewBox="0 0 24 24"><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></svg>
    <svg viewBox="0 0 24 24"><path d="M14 3a6 6 0 0 0-7 8L2 17a3 3 0 0 0 5 5l6-6a6 6 0 0 0 8-7l-4 4-4-4 4-4z"/></svg>
    <svg viewBox="0 0 24 24"><path d="M4 20 20 4M4 20l1-6L15 4l5 5-10 10zM4 4h6M4 4v6M14 20h6v-6"/></svg>
  </span><div className="season-process__text"><strong>{groups[stage].name}</strong><span>{stages[stage][1]}</span></div></aside><p className="season-takeover__caption">OUR FIRST FRC SEASON</p><button className="season-motion-toggle" aria-label={paused ? "Play group stories" : "Pause group stories"} aria-pressed={paused} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
</section>; }
