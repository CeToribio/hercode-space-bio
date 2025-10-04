// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4">
      {/* 🪐 Contenido principal */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Hola,
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90">
          Explora el universo de la Biología Espacial <br />
          Descubre investigaciones sobre cómo la vida prospera y se adapta en el espacio.
        </p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.1, 1], opacity: [0, 1, 1] }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/explorar"
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            Explora ahora
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
