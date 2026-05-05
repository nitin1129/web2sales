import React from 'react';
import { motion } from 'framer-motion';

/**
 * Rising starfield for dark hero sections. Drops absolutely positioned dots
 * that drift bottom → top with a twinkle. Drop it as a direct child of any
 * `.page-hero` section; pointer-events are off so it never blocks clicks.
 *
 * Inline `position: absolute` overrides the `.page-hero > * { position: relative }`
 * rule in index.css so the layer covers the full hero.
 */
const STAR_PRESET = [
  { left: '4%', size: 2, duration: 18, delay: 0, color: 'bg-white' },
  { left: '11%', size: 3, duration: 14, delay: 3, color: 'bg-accent' },
  { left: '17%', size: 1.5, duration: 22, delay: 6, color: 'bg-white' },
  { left: '24%', size: 2.5, duration: 16, delay: 1, color: 'bg-white' },
  { left: '31%', size: 4, duration: 20, delay: 4, color: 'bg-accent' },
  { left: '38%', size: 1.5, duration: 13, delay: 8, color: 'bg-white' },
  { left: '46%', size: 3, duration: 17, delay: 2, color: 'bg-white' },
  { left: '53%', size: 2, duration: 19, delay: 5, color: 'bg-accent' },
  { left: '61%', size: 1.5, duration: 15, delay: 9, color: 'bg-white' },
  { left: '68%', size: 3.5, duration: 21, delay: 0.5, color: 'bg-white' },
  { left: '75%', size: 2, duration: 14, delay: 3.5, color: 'bg-accent' },
  { left: '82%', size: 1.5, duration: 18, delay: 7, color: 'bg-white' },
  { left: '89%', size: 3, duration: 16, delay: 2.5, color: 'bg-white' },
  { left: '95%', size: 2, duration: 20, delay: 5.5, color: 'bg-accent' }
];

const Starfield = ({ density = 1 }) => {
  // density: 0.6–1.5 lets callers thin out the field on smaller heroes.
  const stars =
    density === 1
      ? STAR_PRESET
      : STAR_PRESET.filter((_, i) => i % Math.max(1, Math.round(1 / density)) === 0);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {stars.map((star, i) => (
        <motion.span
          key={i}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: '-110vh',
            opacity: [0, 0.9, 0.4, 1, 0.5, 0.9, 0]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            left: star.left,
            bottom: -8,
            height: star.size,
            width: star.size,
            boxShadow:
              star.color === 'bg-accent'
                ? '0 0 6px 1px rgba(217, 204, 229, 0.8)'
                : '0 0 6px 1px rgba(255, 255, 255, 0.7)'
          }}
          className={`rounded-full ${star.color}`}
        />
      ))}
    </div>
  );
};

export default Starfield;
