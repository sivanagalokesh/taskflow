import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from its previous value up (or down) to `target`
 * using a short eased tween. Used for dashboard stat counters so they
 * feel alive instead of just snapping to a new digit.
 */
export default function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(target ?? 0);
  const fromRef = useRef(target ?? 0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target === undefined || target === null) return undefined;

    const from = fromRef.current;
    const to = target;
    if (from === to) return undefined;

    const start = performance.now();
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuint(progress);
      const current = Math.round(from + (to - from) * eased);
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}
