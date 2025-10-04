// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { slugify } from "../utils/slug";

// 🎨 Paleta 
const palette = [
  "from-[#1b2744] to-[#3557c2]", // antes #010b22 → #033096
  "from-[#3557c2] to-[#d49fda]", // antes #033096 → #bc78c8
  "from-[#d49fda] to-[#e3d7ea]", // antes #bc78c8 → #cdbada
  "from-[#e3d7ea] to-[#9494d4]", // antes #cdbada → #6464b1
  "from-[#9494d4] to-[#1b2744]", // antes #6464b1 → #010b22
];


export default function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  // 🔥 Cargar categorías desde backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/data/categories.json");

        const formatted = res.data.map((cat, i) => ({
          ...cat,
          color: palette[i % palette.length],
        }));
        setCategories(formatted);
      } catch (err) {
        console.error("Error cargando categorías", err);
      }
    };

    fetchCategories();
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % categories.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + categories.length) % categories.length);

  const handleClick = () => {
    if (selected || !categories.length) return;
    setSelected(true);
    const slug = slugify(categories[index].name);
    setTimeout(() => navigate(`/categoria/${slug}`), 600);
  };

  if (!categories.length)
    return <p className="text-white mt-4">Cargando categorías...</p>;

  const current = categories[index];

  return (
    <div className="relative flex items-center justify-center w-full h-[390px]">
      {/* Flecha izquierda */}
      <button
        onClick={prev}
        className="absolute left-[calc(50%-300px)] bg-white/10 p-4 rounded-full backdrop-blur hover:bg-white/30 transition"
      >
        ◀
      </button>

      {/* Planeta central */}
      <motion.div
        key={current.name}
        className={`relative rounded-full bg-gradient-to-br ${current.color} flex flex-col items-center justify-center text-center shadow-2xl cursor-pointer`}
        style={{ width: "280px", height: "280px" }}
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          selected ? { scale: 1.6, opacity: 0.8 } : { opacity: 1, scale: 1.15 }
        }
        transition={{ duration: 0.6 }}
      >
        {/* Halo animado */}
        {/* Halo animado igual al CategoryPage */}
        {!selected && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 0 0 rgba(255,255,255,0.45)" }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255,255,255,0.45)",
                "0 0 0 22px rgba(255,255,255,0.0)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <h4 className="text-lg font-bold text-white drop-shadow-lg px-6 leading-snug">
          {current.name}
        </h4>
      </motion.div>

      {/* Flecha derecha */}
      <button
        onClick={next}
        className="absolute right-[calc(50%-300px)] bg-white/10 p-4 rounded-full backdrop-blur hover:bg-white/30 transition"
      >
        ▶
      </button>
    </div>
  );
}
