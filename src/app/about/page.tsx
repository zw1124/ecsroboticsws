import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About", description: "Meet RobotECS, the student-led robotics program at Evergreen Christian School." };

const goals = [
  ["Learn", "Ask better questions, test ideas, and document what the team discovers."],
  ["Build", "Turn concepts into reliable mechanical, electrical, and software systems."],
  ["Lead", "Own the work, communicate clearly, and help every teammate improve."],
  ["Serve", "Represent our school with integrity and make engineering useful to others."],
];

export default function AboutPage() {
  return <main id="main" className="team-page">
    <section className="team-intro" aria-labelledby="about-heading">
      <div>
        <p className="eyebrow">EVERGREEN CHRISTIAN SCHOOL / FRC TEAM 12394</p>
        <h1 id="about-heading">ABOUT ROBOTECS</h1>
        <p>RobotECS is FIRST Robotics Competition Team 12394 at Evergreen Christian School in Loudoun, Virginia. Our student-led team learns engineering through designing, building, and working together.</p>
        <p>Students lead our engineering, teamwork, and outreach. We develop practical skills while learning to communicate, take responsibility, and support one another.</p>
      </div>
      <Image src="/assets/robotecs-eagle-cutout.png" alt="RobotECS eagle logo" width={600} height={600} className="team-intro-logo" />
    </section>
    <section className="team-section" aria-labelledby="team-goals-heading">
      <h2 id="team-goals-heading">OUR GOALS</h2>
      <p className="team-mission">We learn by building, lead by serving, and use engineering to make ideas real.</p>
      <div className="team-columns team-columns-four">{goals.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="team-section" aria-labelledby="season-heading">
      <h2 id="season-heading">OUR FIRST SEASON</h2>
      <p>RobotECS is officially FRC Team 12394. We are developing our skills, preparing our workspace, and building the support needed for our first competition season.</p>
      <Link href="/sponsors" className="team-link">Support the team ↗</Link>
    </section>
  </main>;
}
