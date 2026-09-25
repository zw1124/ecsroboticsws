import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Sponsors", description: "Support RobotECS at Evergreen Christian School." };
const impact = [["01","TOOLS","Safe, capable equipment for hands-on fabrication."],["02","PARTS","Mechanical, electrical, and control-system components."],["03","ACCESS","Training, events, transportation, and team operations."]];
const steps = [["01","Choose a level","Select the package that fits your organization and desired recognition."],["02","Start a conversation","We confirm the details, timeline, and school approval requirements."],["03","Build with us","Your support becomes part of the program students experience all season."]];

export default function SponsorsPage(){return <main id="main">
  <section className="editorial-hero"><p className="eyebrow">01 / FRC TEAM 12394</p><Reveal><h1>BUILD THE<br/><span className="text-primary">NEXT TEAM.</span></h1><p>Help RobotECS give Team 12394 the tools, materials, and real engineering experience needed for FIRST Robotics Competition.</p><Button asChild variant="link" className="mt-7 h-auto p-0 text-white underline decoration-primary underline-offset-8"><Link href="/packages">Explore sponsorship packages <ArrowUpRight/></Link></Button></Reveal></section>
  <section className="bg-white px-5 py-28 text-black md:px-[8vw]"><p className="eyebrow">02 / YOUR IMPACT</p><div className="mt-14 grid border-t border-black/25 md:grid-cols-3">{impact.map(([n,t,c])=><Reveal key={n}><article className="min-h-64 border-b border-black/25 py-6 md:border-r md:border-b-0 md:px-10 md:first:pl-0 md:last:border-r-0"><span className="text-xs font-bold text-primary">{n}</span><h2 className="mt-12 text-5xl font-bold tracking-[-.06em]">{t}</h2><p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-600">{c}</p></article></Reveal>)}</div></section>
  <section className="grid gap-16 px-5 py-28 md:grid-cols-[.8fr_1.2fr] md:px-[8vw] md:py-40"><div><p className="eyebrow">03 / HOW IT WORKS</p><h2 className="mt-6 text-5xl font-bold leading-[.92] tracking-[-.07em] md:text-7xl">A PARTNERSHIP,<br/>NOT JUST A LOGO.</h2></div><ol>{steps.map(([n,t,c])=><li key={n} className="grid grid-cols-[42px_1fr] gap-5 border-t border-white/15 py-7"><span className="text-xs font-bold text-primary">{n}</span><div><strong className="text-xl">{t}</strong><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c}</p></div></li>)}</ol></section>
  <section className="bg-primary px-5 py-28 text-white md:px-[8vw] md:py-40"><p className="eyebrow text-white">04 / READY</p><h2 className="mt-6 text-6xl font-bold tracking-[-.075em] md:text-9xl">BE OUR SPONSOR.</h2><Link href="/contact" className="mt-8 inline-block border-b-2 border-white pb-2 font-bold">Contact RobotECS ↗</Link></section>
</main>}
