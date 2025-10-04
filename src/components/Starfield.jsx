import { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const DEFAULT_COUNT = 60;

export default function Starfield({ count = DEFAULT_COUNT }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        id: index,
        size: Math.random() * 3 + 1.5,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white/90"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
