import React from 'react';
import { motion } from 'framer-motion';

/**
 * Subtle scroll-reveal wrapper. Fades up once when the element enters the
 * viewport, then stays visible. Uses `once: true` so re-scrolling doesn't
 * re-trigger the animation.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 20,
  duration = 0.55,
  className,
  as: Tag = 'div'
}) => {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
