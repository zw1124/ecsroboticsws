import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SchoolMap } from "@/components/school-map";

const goals = [
  ["LEARN", "Through hands-on engineering.", "/assets/goals/learn.jpg", "Close-up of electronic components"],
  ["BUILD", "Ideas into real systems.", "/assets/goals/build.jpg", "3D printer working in a workshop"],
  ["LEAD", "With integrity and responsibility.", "/assets/goals/lead.jpg", "Industrial robotic arm"],
  ["SERVE", "Our school and community.", "/assets/goals/serve.jpg", "Classroom with computers"],
] as const;

const skills = ["Mechanical and Electrical Engineering", "Computer Programming", "Machining and Tool Usage", "Computer Aided Design", "Entrepreneurship, Graphic Design, and Marketing", "Teamwork and Sportsmanship"];

export const metadata: Metadata = {
  alternates: { canonical: "https://robotecs.tech/" },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RobotECS",
  alternateName: ["FRC Team 12394", "RobotECS FRC Team 12394"],
  url: "https://robotecs.tech/",
};

export default function Home() {
  return <main id="main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }} />
    <section id="home-hero" className="grid items-center gap-8 px-5 py-10 md:px-[10vw] lg:grid-cols-[1.1fr_.9fr]">
      <div className="max-w-2xl p-0 md:p-7">
        <p className="eyebrow">EVERGREEN CHRISTIAN SCHOOL / LOUDOUN, VA</p>
        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">WE ARE ROBOTECS.</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed">We are FIRST Robotics Competition Team 12394 at Evergreen Christian School. Our student-led team learns engineering through designing, building, and working together.</p>
        <Button asChild variant="link" className="mt-5 h-auto p-0 text-white underline decoration-primary underline-offset-8"><Link href="/packages">Be our sponsor <ArrowUpRight /></Link></Button>
      </div>
      <div className="flex flex-col items-center text-center">
        <Image src="/assets/robotecs-eagle-cutout.png" alt="RobotECS eagle logo" width={600} height={600} priority className="w-full max-w-[460px]" />
        <Image src="/assets/frc-team-12394-generated.png" alt="FRC Team 12394" width={2172} height={724} className="-mt-12 w-full max-w-[460px] md:-mt-14" />
      </div>
    </section>
    <section id="home-sponsors" className="home-sponsors">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8"><h2 className="text-3xl font-bold tracking-tight md:text-5xl">SPONSORS</h2><span className="text-3xl text-primary md:text-4xl">/</span><Button asChild variant="link" className="h-auto p-0 text-xl font-bold text-primary md:text-2xl"><Link href="/packages">BE OUR SPONSOR</Link></Button></div>
    </section>
    <section id="home-goals" className="home-goals" aria-labelledby="goals-heading">
      <div className="goals-heading">
        <h2 id="goals-heading">OUR GOALS</h2>
      </div>
      <div className="goals-grid">{goals.map(([title, copy, src, alt]) => <article className="goal-story" key={title}>
        <div className="goal-photo"><Image src={src} alt={alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw" className="object-cover" /></div>
        <div className="goal-caption"><h3>{title}</h3><p>{copy}</p></div>
      </article>)}</div>
    </section>
    <section className="grid gap-12 bg-[#0b0b0b] px-5 py-24 md:grid-cols-[.8fr_1.2fr] md:px-[8vw] md:py-32"><div><h2 className="text-5xl font-bold tracking-[-.06em]">Skills Students Learn</h2></div><ul className="grid gap-x-8 md:grid-cols-2">{skills.map((skill) => <div key={skill}><li className="flex min-h-16 items-center border-t border-white/10 text-sm font-semibold before:mr-4 before:size-2 before:rounded-full before:bg-primary">{skill}</li></div>)}</ul></section>
    <section className="location-section">
      <SchoolMap />
      <div className="location-info">
        <p className="eyebrow">FIND US / LOUDOUN, VA</p>
        <h2>Evergreen Christian School</h2>
        <address>21336 Evergreen Mills Road<br/>Leesburg, VA 20175</address>
        <a href="https://www.google.com/maps/dir/?api=1&destination=21336+Evergreen+Mills+Road,+Leesburg,+VA+20175" target="_blank" rel="noreferrer">Get directions <ArrowUpRight className="size-4"/></a>
      </div>
    </section>
  </main>;
}
