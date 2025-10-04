import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(term);
  };

  const handleClear = () => {
    setTerm("");
    if (onSearch) onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mt-12">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex bg-white rounded-full shadow-md overflow-hidden relative"
      >
        {/* Botón limpiar (X) a la izquierda */}
        {term && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 
                       flex items-center justify-center 
                       w-7 h-7 rounded-full 
                       bg-[#033096] text-white 
                       hover:bg-[#010b22] transition-colors z-10"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}

        {/* Input con más espacio lateral */}
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="¿Sobre qué tema quieres indagar?"
          className="flex-grow px-12 py-3 pr-20 text-gray-800 focus:outline-none rounded-l-full"
        />

        {/* Botón Buscar */}
        <button
          type="submit"
          className="px-6 bg-[#033096] text-white font-semibold hover:bg-[#010b22] transition-colors rounded-r-full"
        >
          Buscar
        </button>
      </motion.div>
    </form>
  );
}
