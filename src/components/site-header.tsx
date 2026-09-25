"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  ["Home", "/"], ["About", "/about"], ["Sponsors", "/sponsors"], ["Packages", "/packages"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 h-24 border-b border-white/5 bg-black/95 backdrop-blur md:relative">
      <div className="mx-auto flex h-full max-w-[1536px] items-center justify-between px-5 md:px-12">
        <Link href="/" aria-label="RobotECS home" className="flex items-center gap-3">
          <Image src="/assets/robotecs-eagle.png" alt="" width={52} height={52} priority />
          <span className="grid leading-none"><strong className="text-[17px] tracking-[-.04em]">RobotECS</strong><span className="mt-1 text-[7px] tracking-[.18em] text-muted-foreground">FRC TEAM 12394</span></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href} className={cn("nav-link", pathname === href && "nav-active")}>{label}</Link>)}
        </nav>
        <Sheet>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu"><Menu className="size-5" /></Button></SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-black p-7 sm:max-w-md">
            <SheetHeader><SheetTitle className="sr-only">Navigation</SheetTitle></SheetHeader>
            <nav className="mt-16 grid" aria-label="Mobile navigation">
              {nav.map(([label, href], index) => <SheetClose asChild key={href}><Link href={href} className="grid grid-cols-[42px_1fr] border-t border-white/10 py-4 text-4xl font-semibold tracking-tight"><span className="pt-2 text-[9px] text-primary">0{index + 1}</span>{label}</Link></SheetClose>)}
            </nav>
            <p className="absolute bottom-8 left-7 text-[9px] tracking-[.15em] text-muted-foreground">EVERGREEN CHRISTIAN SCHOOL</p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
