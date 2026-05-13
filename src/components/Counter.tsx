import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function Counter({ value, duration = 2, prefix = "", suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = prefix + Math.round(value).toLocaleString() + suffix;
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, duration, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
