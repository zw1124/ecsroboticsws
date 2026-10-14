import React from 'react';
import { groups } from './team';
import Reveal from './Reveal';
export default function TeamGroups() {
  return <Reveal as="section" className="team-groups section" id="workshop" aria-labelledby="groups-title">
    <header data-reveal><h2 id="groups-title">The people behind the robot.</h2><a className="text-link" href="/about">Meet RobotECS <span aria-hidden="true">↗</span></a></header>
    <div className="team-groups__grid">{groups.map(({name, copy}, index) => <a className="team-group" data-reveal key={name} href={'/about#' + name.toLowerCase()} aria-label={'Meet our ' + name + ' group'}>
      <div className="team-group__art" role="img" aria-label={'Pixel-art illustration of ' + name.toLowerCase() + ' work'} style={{ backgroundPosition: `${(index % 2) * 100}% ${Math.floor(index / 2) * 100}%` }}/>
      <div className="team-group__label"><div><h3>{name}</h3></div><p>{copy}</p></div>
    </a>)}</div>
  </Reveal>;
}
