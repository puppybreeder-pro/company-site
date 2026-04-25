import { useEffect, useRef, useState } from 'react';

export const CountUp = ({ end, duration = 1500, suffix = '', className = '' }) => {
  const [value, setValue] = useState(0);
  const nodeRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(end * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={nodeRef} className={className} data-testid="count-up-value">
      {value}
      {suffix}
    </span>
  );
};