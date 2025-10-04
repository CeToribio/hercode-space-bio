// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
export default function FloatingSun() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouse = (e) => {
      x.set(e.clientX - 50);
      y.set(e.clientY - 50);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [x, y]);

  return (
    console.log('FloatingSun renderiza'),
    <motion.div
      // className="absolute top-0 left-0 w-24 h-24 rounded-full bg-yellow-300 opacity-70 pointer-events-none z-20 shadow-lg"
      className="fixed top-20 left-20 w-32 h-32 rounded-full bg-red-500 opacity-100 z-[9999] border-4 border-black"

      style={{ x: springX, y: springY }}
    />
  );
}
