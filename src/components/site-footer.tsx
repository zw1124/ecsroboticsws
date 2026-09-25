import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-16 md:px-[8vw]">
      <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-3">
        <nav className="grid content-start gap-3 text-sm text-muted-foreground"><h2 className="mb-2 text-xs font-bold tracking-[.15em] text-white">MENU</h2><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/sponsors">Sponsors</Link><Link href="/packages">Packages</Link><Link href="/contact">Contact</Link></nav>
        <div className="flex flex-col items-start md:items-center"><Image src="/assets/robotecs-eagle.png" alt="RobotECS eagle logo" width={132} height={132} /><span className="mt-2 text-xs font-bold tracking-[.16em] text-white">FRC TEAM 12394</span><span className="mt-2 text-xs tracking-wider text-muted-foreground">Evergreen Christian School</span></div>
        <div><h2 className="text-xs font-bold tracking-[.15em]">SUPPORT</h2><p className="mt-5 text-muted-foreground">Help build what comes next.</p><Link className="mt-4 inline-block font-bold text-primary" href="/packages">Be our sponsor ↗</Link></div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1320px] flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-muted-foreground"><span>© 2026 RobotECS</span><span>FRC Team 12394 · Loudoun, VA</span><a href="#">Back to top ↑</a></div>
    </footer>
  );
}
