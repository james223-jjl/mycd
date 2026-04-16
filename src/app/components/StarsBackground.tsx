import { useRef, useEffect, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  twinkleSpeed: number | null;
  color: [number, number, number];
  glow: boolean;
}

interface StarsBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  minSpeed?: number;
  maxSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StarsBackground({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  minSpeed = 0.01,
  maxSpeed = 0.2,
  className = '',
  style,
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);

  const generateStars = useCallback(
    (width: number, height: number): Star[] => {
      const count = Math.floor(width * height * starDensity);
      return Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        const isGlow = Math.random() < 0.08;
        const colorRand = Math.random();
        const color: [number, number, number] = colorRand < 0.3
          ? [200, 160, 255] // soft purple
          : colorRand < 0.5
            ? [170, 200, 255] // soft blue
            : [255, 255, 255]; // white
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isGlow ? Math.random() * 1.2 + 1.2 : Math.random() * 0.5 + 0.4,
          opacity: isGlow ? Math.random() * 0.3 + 0.4 : Math.random() * 0.2 + 0.2,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          twinkleSpeed: shouldTwinkle
            ? Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) + minTwinkleSpeed
            : null,
          color,
          glow: isGlow,
        };
      });
    },
    [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed, minSpeed, maxSpeed],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        starsRef.current = generateStars(width, height);
      }
    });
    observer.observe(canvas);

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (const star of starsRef.current) {
        star.x += star.velocityX;
        star.y += star.velocityY;

        if (star.x < 0) star.x += width;
        if (star.x > width) star.x -= width;
        if (star.y < 0) star.y += height;
        if (star.y > height) star.y -= height;

        const opacity =
          star.twinkleSpeed !== null
            ? 0.5 + Math.abs(0.5 * Math.sin((Date.now() * 0.001) / star.twinkleSpeed))
            : star.opacity;

        const [r, g, b] = star.color;
        if (star.glow) {
          // Soft glow halo
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`);
          gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${opacity * 0.2})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [generateStars]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={style}
    />
  );
}
