// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slug";

const palette = [
  "from-[#1b2744] to-[#3557c2]",
  "from-[#3557c2] to-[#d49fda]",
  "from-[#d49fda] to-[#e3d7ea]",
  "from-[#e3d7ea] to-[#9494d4]",
  "from-[#9494d4] to-[#1b2744]",
];

export default function CategoryCards({ categories = [], loading = false  }) {
  const navigate = useNavigate();

  const handleClick = (catName) => {
    const slug = slugify(catName);
    navigate(`/categoria/${slug}`);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <p className="text-indigo-300 animate-pulse text-lg font-medium">
          Cargando categorías...
        </p>
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
      {categories.map((cat, i) => (
        <motion.div
          key={i}
          className={`relative w-72 h-80 rounded-2xl p-6 flex flex-col items-center space-y-7 cursor-pointer
                     bg-white/10 backdrop-blur-md text-white text-center shadow-md transition-all`}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 15px 35px rgba(200,220,255,0.3)",
          }}
          onClick={() => handleClick(cat.name)}
        >
          {/* ── Bloque superior (puede ser icono si luego decides usarlo) ── */}
          <div
             className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${palette[i % palette.length]} opacity-60`}
          ></div>

          {/* ── Nombre ── */}
          <h3 className="text-lg font-bold mb-1 leading-snug">{cat.name}</h3>

          {/* ── Mini descripción ── */}
          {cat.description && (
            <p className="mt-1 text-sm text-indigo-100 line-clamp-3 opacity-80 leading-snug">
              {cat.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
