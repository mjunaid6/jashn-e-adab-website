import { motion } from 'motion/react';

/**
 * ScrollReveal — Reusable scroll-triggered animation wrapper.
 *
 * Wraps children in a motion.div that fades in and slides from the
 * specified direction when scrolled into view.
 *
 * @param {Object} props
 * @param {'up'|'down'|'left'|'right'} [props.direction='up'] — Slide-in direction
 * @param {number} [props.delay=0]       — Animation delay in seconds
 * @param {number} [props.duration=0.7]  — Animation duration in seconds
 * @param {string} [props.className]     — Additional CSS classes
 * @param {React.ReactNode} props.children
 */

// Map direction → initial transform offsets
const directionOffsets = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  ...rest
}) {
  const offset = directionOffsets[direction] || directionOffsets.up;

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // expo-out — smooth deceleration
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
