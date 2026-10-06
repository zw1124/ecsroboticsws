import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sponsors", description: "Support RobotECS at Evergreen Christian School." };
const impact = [
  ["Tools", "Safe, capable equipment for hands-on fabrication."],
  ["Parts", "Mechanical, electrical, and control-system components."],
  ["Access", "Training, events, transportation, and team operations."],
];
const steps = [
  ["Choose a level", "Select the package that fits your organization and desired recognition."],
  ["Start a conversation", "We confirm the details, timeline, and school approval requirements."],
  ["Build with us", "Your support becomes part of the program students experience all season."],
];

export default function SponsorsPage() {
  return <main id="main">
    <section className="home-sponsors sponsor-page-banner" aria-labelledby="sponsors-heading">
      <div><h1 id="sponsors-heading">SPONSORS</h1><p>Help our students build what comes next.</p></div>
    </section>
    <div className="team-page">
      <section className="team-section" aria-labelledby="support-heading">
        <h2 id="support-heading">SUPPORT TEAM 12394</h2>
        <p>RobotECS is an official FIRST Robotics Competition team at Evergreen Christian School. Your support gives our students the tools, materials, and hands-on experience to compete.</p>
        <Link href="/packages" className="team-link">Explore sponsorship packages ↗</Link>
      </section>
      <section className="team-section" aria-labelledby="impact-heading">
        <h2 id="impact-heading">YOUR IMPACT</h2>
        <div className="team-columns">{impact.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
      <section className="team-section" aria-labelledby="partnership-heading">
        <h2 id="partnership-heading">BECOME A SPONSOR</h2>
        <ol className="sponsor-steps">{steps.map(([title, copy]) => <li key={title}><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        <Link href="/contact" className="team-link">Contact RobotECS ↗</Link>
      </section>
    </div>
  </main>;
}
