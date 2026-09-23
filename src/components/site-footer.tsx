import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-16 md:px-[8vw]">
      <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-3">
        <nav className="grid content-start gap-3 text-sm text-muted-foreground"><h2 className="mb-2 text-xs font-bold tracking-[.15em] text-white">MENU</h2><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/sponsors">Sponsors</Link><Link href="/packages">Packages</Link><Link href="/contact">Contact</Link></nav>
        <div className="flex flex-col items-start md:items-center"><Image src="/assets/frc-logo-reverse.png" alt="FIRST Robotics Competition" width={190} height={75} /><span className="mt-4 text-xs tracking-wider text-muted-foreground">Evergreen Christian School</span></div>
        <div><h2 className="text-xs font-bold tracking-[.15em]">SUPPORT</h2><p className="mt-5 text-muted-foreground">Help build what comes next.</p><Link className="mt-4 inline-block font-bold text-primary" href="/packages">Be our sponsor ↗</Link></div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1320px] flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-muted-foreground"><span>© 2026 RobotECS</span><span>Loudoun, VA · Building toward FRC</span><a href="#">Back to top ↑</a></div>
    </footer>
  );
}
