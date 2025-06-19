"use client";

import { useEffect, useState } from "react";

export default function StickyScrollReveal({
  children,
  scrollThreshold = 100, // 👈 Customize this value
}: {
  children: React.ReactNode;
  scrollThreshold?: number;
}) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const scrolledDown = currentScrollY > lastScrollY + scrollThreshold;
      const scrolledUp = currentScrollY < lastScrollY - scrollThreshold;

      if (currentScrollY < 10) {
        setShow(true); // always show near top
      } else if (scrolledDown) {
        setShow(false); // hiding on downward scroll
        setLastScrollY(currentScrollY);
      } else if (scrolledUp) {
        setShow(true); // showing on upward scroll
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollThreshold]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </div>
  );
}
