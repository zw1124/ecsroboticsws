import React from 'react';
import './season-budget.css';

// Team planning estimates supplied by the user, not published FIRST fee guidance.
const items = [
  { name: 'FIRST team registration', min: 6500, max: 6500, group: 'events', note: 'Planned team registration and Kit of Parts.' },
  { name: 'Additional event registration', min: 3200, max: 3200, group: 'events', note: 'An anticipated additional event; participation is still being planned.' },
  { name: 'Robot materials & components', min: 4000, max: 5500, group: 'build', note: 'Motors, controls, electronics, structural materials, filament, sensors, and fasteners.' },
  { name: 'Tools, supplies & safety', min: 800, max: 1200, group: 'build', note: 'Hand tools, consumables, safety equipment, and possible makerspace fees.' },
  { name: 'Transportation & lodging', min: 2500, max: 4000, group: 'team', note: 'Estimated transport, hotel, and meals for one event; distance and overnight stays affect the cost.' },
  { name: 'Team apparel & branding', min: 500, max: 800, group: 'team', note: 'Team shirts, pit banners, and name tags.' },
  { name: 'Outreach, printing & miscellaneous', min: 400, max: 700, group: 'team', note: 'Printing and small outreach supplies.' },
  { name: 'Contingency', min: 1500, max: 2500, group: 'team', note: 'A reserve for unexpected costs.' },
];
const groups = [
  { id: 'events', title: 'Take the field.', label: 'Registration & events', copy: 'The registrations that make competition possible.' },
  { id: 'build', title: 'Make it work.', label: 'Robot, tools & safety', copy: 'The parts, materials, and equipment behind every iteration.' },
  { id: 'team', title: 'Bring us together.', label: 'Team, travel & reserve', copy: 'Getting students to the event, sharing our work, and planning for the unexpected.' },
];
const total = values => values.reduce((sum, item) => ({ min: sum.min + item.min, max: sum.max + item.max }), { min: 0, max: 0 });
const money = value => '$' + value.toLocaleString('en-US');
const range = ({ min, max }) => min === max ? money(min) : money(min) + '–' + money(max);
const budget = total(items);

export default function SeasonBudget() {
  return <section className="season-budget" aria-labelledby="budget-title">
    <header className="season-budget__heading"><div><p className="eyebrow">WHAT YOUR SUPPORT MAKES POSSIBLE</p><h2 id="budget-title">A first season.<br/><span>Every part counts.</span></h2></div><div className="season-budget__total"><p className="eyebrow">ESTIMATED SEASON BUDGET</p><p className="season-budget__amount">{range(budget)}</p><p>Our working estimate for the season ahead.</p></div></header>
    <div className="season-budget__uses">{groups.map((group, index) => <article key={group.id} className={'season-budget__use season-budget__use--' + group.id}><div className="season-budget__index"><span className="season-budget__pixel" aria-hidden="true"/><span className="eyebrow">0{index + 1} / {group.label}</span></div><h3>{group.title}</h3><p className="season-budget__group-amount">{range(total(items.filter(item => item.group === group.id)))}</p><p>{group.copy}</p></article>)}</div>
    <details className="season-budget__details"><summary><span>See the full budget breakdown</span><span className="season-budget__toggle" aria-hidden="true"/></summary><div className="season-budget__table"><table><caption className="season-budget__sr-only">Estimated season expenses in US dollars</caption><thead><tr><th scope="col">Expense</th><th scope="col">Estimate</th><th scope="col">What it covers</th></tr></thead><tbody>{items.map(item => <tr key={item.name}><th scope="row">{item.name}</th><td>{range(item)}</td><td>{item.note}</td></tr>)}</tbody><tfoot><tr><th scope="row">Total estimated budget</th><td>{range(budget)}</td><td>Calculated from the estimates above.</td></tr></tfoot></table></div></details>
    <p className="season-budget__note">Team planning estimates in USD, not final costs or a fundraising progress total. Event plans, travel, and material needs may change.</p>
  </section>;
}
