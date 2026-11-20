import { useRef, useState } from 'react';

const topics = [
  {
    title: 'Learn the fundamentals',
    items: [
      ['Mechanisms', 'Sketch and prototype simple mechanisms before committing to a design.', 'M3 8l9-5 9 5v9l-9 5-9-5z M3 8l9 5 9-5 M12 13v9'],
      ['Electrical', 'Practice wiring power, controls, and sensors on the bench.', 'M7 7h10v10H7z M10 10h4v4h-4z M9 3v4 M15 3v4 M9 17v4 M15 17v4 M3 9h4 M3 15h4 M17 9h4 M17 15h4'],
      ['Programming', 'Test how the code translates driver inputs into robot motion.', 'm8 6-6 6 6 6 M16 6l6 6-6 6 M14 4l-4 16'],
    ],
  },
  {
    title: 'Work across the team',
    items: [
      ['Design for the build', 'Share sketches and measurements so builders can check how parts fit.', 'M4 20 20 4 M5 5h6 M5 5v6 M19 19h-6 M19 19v-6 M9 15l2 2 M13 11l2 2'],
      ['Test together', 'Bring mechanical, electrical, and software work together at the bench.', 'M8 4h8 M10 4v7l-5 7v2h14v-2l-5-7V4 M8 15h8'],
      ['Share our work', 'Use outreach to explain what the team is building and learning.', 'M4 5h16v11H9l-5 4z M8 9h8 M8 12h5'],
    ],
  },
  {
    title: 'Prepare to compete',
    items: [
      ['Parts and tools', 'Raise funds for the hardware and tools needed to build and maintain a robot.', 'M3 8h18v12H3z M8 8V5h8v3 M3 13h18 M10 12v3h4v-3'],
      ['Practice and inspection', 'Plan time for driver practice and review requirements before competition.', 'M6 5h12v16H6z M9 3h6v4H9z m0 8 2 2 4-4 M9 18h6'],
      ['First event', 'Prepare for our first planned FRC competition in 2027.', 'M5 22V3 M5 4h14l-3 5 3 5H5'],
    ],
  },
];

export default function SeasonExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  function handleKey(event, index) {
    const targets = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: topics.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    const next = (targets[event.key] + topics.length) % topics.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <section className="season-story" id="team-details" aria-labelledby="season-title">
    <h2 id="season-title">Our first season.</h2>
    <p className="season-intro">Twelve students at Evergreen Christian School preparing for the 2027 FIRST Robotics Competition.</p>
    <div className="season-tabs" role="tablist" aria-label="Season preparation">
      {topics.map(({ title }, index) => <button key={title} type="button" role="tab" id={`season-tab-${index}`} aria-controls={`season-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={element => { tabs.current[index] = element; }} onClick={() => setActive(index)} onKeyDown={event => handleKey(event, index)}>{title}</button>)}
    </div>
    {topics.map(({ title, items }, index) => <div key={title} className="season-panel" id={`season-panel-${index}`} role="tabpanel" aria-labelledby={`season-tab-${index}`} tabIndex={0} hidden={active !== index}>
      {items.map(([name, description, path]) => <article key={name}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
        <h3>{name}</h3>
        <p>{description}</p>
      </article>)}
    </div>)}
  </section>;
}
