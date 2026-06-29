import { useRef, useEffect, useCallback } from 'react';

/**
 * ParticleField — Canvas-based floating golden particle animation.
 *
 * Renders ~40 small golden circles that drift gently upward with
 * subtle horizontal oscillation. The canvas fills its parent container
 * (position: absolute, inset: 0) so it can be overlaid on any section.
 *
 * Respects the user's prefers-reduced-motion setting by skipping
 * the animation entirely (renders nothing).
 */

const PARTICLE_COUNT = 40;
const PARTICLE_COLOR = { r: 214, g: 179, b: 112 }; // --color-secondary (Antique Gold)

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1, // 1–3px
    opacity: Math.random() * 0.4 + 0.1, // 0.1–0.5
    speedY: Math.random() * 0.3 + 0.1, // gentle upward drift
    speedX: (Math.random() - 0.5) * 0.2, // subtle horizontal drift
    // Each particle has its own oscillation phase for organic movement
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: Math.random() * 0.005 + 0.002,
    amplitude: Math.random() * 0.5 + 0.2,
  };
}

export default function ParticleField({ className = '' }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  /**
   * Initialise particles array for the given canvas dimensions.
   */
  const initParticles = useCallback((width, height) => {
    dimensionsRef.current = { width, height };
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(width, height)
    );
  }, []);

  useEffect(() => {
    // ---- Reduced-motion guard ----
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ---- Size canvas to parent ----
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      // Re-initialise particles only if we don't have any yet or on
      // significant dimension changes to avoid visual jumps.
      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
      dimensionsRef.current = { width, height };
    };

    resize();
    if (particlesRef.current.length === 0) {
      initParticles(canvas.width, canvas.height);
    }

    window.addEventListener('resize', resize);

    // ---- Animation loop ----
    const animate = () => {
      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // Update phase for horizontal oscillation
        p.phase += p.phaseSpeed;

        // Move particle
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.phase) * p.amplitude * 0.1;

        // Wrap around: if particle drifts off-screen, reset to bottom
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        // Horizontal wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR.r}, ${PARTICLE_COLOR.g}, ${PARTICLE_COLOR.b}, ${p.opacity})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // ---- Cleanup ----
    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
