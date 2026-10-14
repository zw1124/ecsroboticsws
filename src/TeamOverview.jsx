import React from 'react';
import { groups, team } from './team';
import Reveal from './Reveal';
export default function TeamOverview() {
  return <>
    <Reveal as="section" className="team-overview section" aria-labelledby="team-overview-title">
      <div data-reveal><p className="eyebrow">WHERE WE ARE TODAY</p><h2 id="team-overview-title">Twelve students.<br/>A shared beginning.</h2><p>We have {team.members} confirmed team members. Right now, we’re learning the fundamentals and organizing our groups, building a foundation for the work ahead.</p><a className="text-link" href="/contact">Get to know our team <span aria-hidden="true">↗</span></a></div>
      <div className="team-overview__portrait" data-reveal><div className="team-overview__pixels" aria-hidden="true">{Array.from({length: team.members}, (_, i) => <span key={i} />)}</div><p><strong>12</strong> students, one team.</p><span className="eyebrow">{team.stage}</span></div>
    </Reveal>
    <Reveal as="section" className="team-disciplines section" aria-labelledby="disciplines-title"><header data-reveal><p className="eyebrow">FOUR AREAS. SHARED CURIOSITY.</p><h2 id="disciplines-title">Finding our place.<br/>Learning from each other.</h2></header><div className="team-disciplines__list">{groups.map((group, i) => <article key={group.name} id={group.name.toLowerCase()} data-reveal><span className="eyebrow">0{i + 1}</span><h3>{group.name}</h3><p>{group.detail}</p></article>)}</div></Reveal>
  </>;
}
