import type { Metadata } from "next";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Packages", description: "Sponsorship packages for RobotECS." };
const levels = [
  ["COMMUNITY","≤ $999","Partners page recognition, annual thank-you"],
  ["BRONZE","$1,000–$1,999","Website logo, Partners page, social media recognition"],
  ["SILVER","$2,000–$4,999","Bronze benefits + team T-shirt logo + pit/event signage"],
  ["GOLD","$5,000–$9,999","Silver benefits + robot logo + larger apparel placement + homepage recognition"],
  ["PREMIER","$10,000–$49,999","Gold benefits + prominent robot placement + prominent apparel placement + featured partner profile + major season-material recognition"],
  ["ANCHOR","$50,000+","Premier benefits + highest-level brand placement + major website placement + customized recognition"],
];

export default function PackagesPage(){return <main id="main" className="px-5 py-24 md:px-[7vw] md:py-32">
  <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[220px_1fr] lg:gap-24">
    <div className="lg:sticky lg:top-10 lg:self-start"><p className="eyebrow">SUPPORT THE PROGRAM</p><h1 className="mt-7 text-6xl font-bold tracking-[-.07em] lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-8xl">PACKAGES</h1></div>
    <div>
      <Table className="min-w-[720px]"><TableHeader><TableRow className="border-white/10"><TableHead>Level</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="pl-8">Benefits</TableHead></TableRow></TableHeader><TableBody>{levels.map(([level,amount,benefits])=><TableRow key={level} className="border-white/10"><TableCell className="py-6 font-bold">{level}</TableCell><TableCell className="whitespace-nowrap py-6 text-right font-semibold">{amount}</TableCell><TableCell className="py-6 pl-8 leading-relaxed text-muted-foreground">{benefits}</TableCell></TableRow>)}</TableBody></Table>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Robot, team T-shirt, apparel, and pit/event signage placements are subject to team, school, and competition rules and approval.</p>
      <Reveal className="mt-16 bg-primary p-8 text-white md:p-16"><p className="text-[10px] font-bold tracking-[.16em]">READY TO BUILD WITH US?</p><h2 className="mt-6 text-5xl font-bold leading-[.9] tracking-[-.07em] md:text-7xl">TURN SUPPORT<br/>INTO A SEASON.</h2><Button asChild variant="link" className="mt-8 h-auto p-0 text-white underline underline-offset-8"><Link href="/contact">Be our sponsor <ArrowUpRight/></Link></Button></Reveal>
    </div>
  </div>
</main>}
