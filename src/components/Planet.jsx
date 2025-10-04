// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Planet({ size = 40, color = "#bc78c8", top = "20%", left = "30%", delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 4,
        delay,
      }}
      style={{ top, left }}
      className="absolute pointer-events-none"
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          opacity: 0.6,
        }}
      />
    </motion.div>
  );
}
