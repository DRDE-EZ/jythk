"use client";

import { useEffect, useState } from "react";

export default function AutoHideNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(true);
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseY = e.clientY;
      const threshold = 100; // Show navbar when mouse is within 100px of top

      if (mouseY <= threshold) {
        setIsMouseNearTop(true);
        setShow(true);
        
        // Clear any existing timeout
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
      } else {
        setIsMouseNearTop(false);
        
        // Hide navbar after 2 seconds when mouse moves away from top
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
        hideTimeout = setTimeout(() => {
          setShow(false);
        }, 2000);
      }
    };

    // Always show on page load for 3 seconds
    const initialTimeout = setTimeout(() => {
      if (!isMouseNearTop) {
        setShow(false);
      }
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeout) clearTimeout(hideTimeout);
      clearTimeout(initialTimeout);
    };
  }, [isMouseNearTop]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => {
        if (!isMouseNearTop) {
          const timeout = setTimeout(() => setShow(false), 1000);
          return () => clearTimeout(timeout);
        }
      }}
    >
      {children}
    </div>
  );
}
