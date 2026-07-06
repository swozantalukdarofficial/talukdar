import React, { useState, useEffect, useRef } from "react";

interface DeferredSectionProps {
  children: React.ReactNode;
  /** Estimated min-height to reserve layout space and prevent Cumulative Layout Shift (CLS) */
  minHeight?: string;
}

export default function DeferredSection({ children, minHeight = "200px" }: DeferredSectionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    // Use requestIdleCallback or setTimeout to defer checking
    const idleCheck = () => {
      if (!containerRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldRender(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: "300px 0px", // Trigger rendering 300px before the element enters the viewport
        }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    };

    const hasIdle = typeof window !== "undefined" && "requestIdleCallback" in window;
    const handle = hasIdle 
      ? (window as any).requestIdleCallback(idleCheck) 
      : setTimeout(idleCheck, 200);

    return () => {
      if (hasIdle) {
        (window as any).cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, [shouldRender]);

  return (
    <div ref={containerRef} style={{ minHeight: shouldRender ? "auto" : minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
}
