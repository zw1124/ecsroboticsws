"use client";

import { useEffect } from "react";

export function HomeScrollSnap() {
  useEffect(() => {
    const hero = document.getElementById("home-hero");
    const sponsors = document.getElementById("home-sponsors");
    if (!hero || !sponsors) return;

    let locked = false;
    let touchStartY = 0;
    let touchStartScrollY = 0;
    let unlockTimer: ReturnType<typeof setTimeout> | undefined;

    const canSnap = () => {
      const header = document.querySelector("header");
      const stickyHeaderHeight = header && window.getComputedStyle(header).position === "sticky"
        ? header.getBoundingClientRect().height
        : 0;
      return hero.getBoundingClientRect().height + stickyHeaderHeight <= window.innerHeight + 4;
    };
    const sponsorTop = () => sponsors.getBoundingClientRect().top + window.scrollY;
    const goTo = (target: HTMLElement) => {
      locked = true;
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      clearTimeout(unlockTimer);
      unlockTimer = setTimeout(() => { locked = false; }, 850);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !canSnap()) return;
      if (locked) {
        event.preventDefault();
        return;
      }
      if (event.deltaY > 3 && window.scrollY < 24) {
        event.preventDefault();
        goTo(sponsors);
      } else if (event.deltaY < -3 && Math.abs(window.scrollY - sponsorTop()) < 24) {
        event.preventDefault();
        goTo(hero);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchStartScrollY = window.scrollY;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (locked || !canSnap()) return;
      const distance = touchStartY - (event.changedTouches[0]?.clientY ?? touchStartY);
      if (distance > 35 && touchStartScrollY < 80) goTo(sponsors);
      else if (distance < -35 && Math.abs(touchStartScrollY - sponsorTop()) < 80) goTo(hero);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      clearTimeout(unlockTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
