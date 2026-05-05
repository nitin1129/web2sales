import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animates a number from `from` → `to` over `duration` seconds, triggered the
 * first time the element scrolls into view. Uses requestAnimationFrame with an
 * easeOutCubic curve so the count slows naturally as it approaches the target.
 */
const StatCounter = ({
  to,
  from = 0,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
  decimals = 0
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return undefined;
    let frame;
    const start = performance.now();
    const delta = to - from;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + delta * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, from, to, duration]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default StatCounter;
