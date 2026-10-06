import type { Metadata } from "next";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Packages", description: "Sponsorship packages for RobotECS." };
const levels = [
  ["COMMUNITY","Up to $999","Logo on Sponsors page"],
  ["BRONZE","$1,000–$1,999","Larger logo placement on Sponsors page + social media thank-you"],
  ["SILVER","$2,000–$4,999","Bronze benefits + team T-shirt logo + pit signage"],
  ["GOLD","$5,000–$9,999","Silver benefits + robot logo"],
  ["PREMIER","$10,000+","Gold benefits + most prominent logo placement"],
];

export default function PackagesPage(){return <main id="main" className="px-5 py-24 md:px-[7vw] md:py-32">
  <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[220px_1fr] lg:gap-24">
    <div className="lg:sticky lg:top-10 lg:self-start"><p className="eyebrow">SUPPORT THE PROGRAM</p><h1 className="mt-7 text-6xl font-bold tracking-[-.07em] lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-8xl">PACKAGES</h1></div>
    <div>
      <Table className="min-w-[720px]"><TableHeader><TableRow className="border-white/10"><TableHead>Level</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="pl-8">Benefits</TableHead></TableRow></TableHeader><TableBody>{levels.map(([level,amount,benefits])=><TableRow key={level} className="border-white/10"><TableCell className="py-6 font-bold">{level}</TableCell><TableCell className="whitespace-nowrap py-6 text-right font-semibold">{amount}</TableCell><TableCell className="py-6 pl-8 leading-relaxed text-muted-foreground">{benefits}</TableCell></TableRow>)}</TableBody></Table>
      <p className="mt-8 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-relaxed text-foreground">In-kind donations of tools, materials, electronics, fabrication services, and other team needs are also welcome. Recognition will be based on the estimated value of the contribution.</p>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Logo, team T-shirt, robot, and pit signage placements are subject to team, school, and competition rules and approval.</p>
      <section className="mt-8" aria-labelledby="packages-support-heading"><h2 id="packages-support-heading" className="text-xl font-bold">Build with us</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Help our students prepare for their first competition season.</p><Button asChild variant="link" className="mt-3 h-auto p-0 text-primary"><Link href="/contact">Be our sponsor <ArrowUpRight/></Link></Button></section>
    </div>
  </div>
</main>}
