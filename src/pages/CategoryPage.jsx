import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PaperList from "../components/PaperList";
import { unslugify } from "../utils/slug";
import { normalizeText } from "../utils/normalize";

// 🎨 Paleta 
const palette = [
  "from-[#1b2744] to-[#3557c2]", // antes #010b22 → #033096
  "from-[#3557c2] to-[#d49fda]", // antes #033096 → #bc78c8
  "from-[#d49fda] to-[#e3d7ea]", // antes #bc78c8 → #cdbada
  "from-[#e3d7ea] to-[#9494d4]", // antes #cdbada → #6464b1
  "from-[#9494d4] to-[#1b2744]", // antes #6464b1 → #010b22
];


export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const categoryName = useMemo(() => unslugify(decodeURIComponent(slug)), [slug]);

  const [papers, setPapers] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [color, setColor] = useState(palette[0]); // Color por defecto

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/data/categories.json");
        // Buscar categoría en el JSON para asignar su color
        const cats = res.data;
        const foundIndex = cats.findIndex(
          (c) => normalizeText(c.name) === normalizeText(categoryName)
        );
        if (foundIndex !== -1) {
          setColor(palette[foundIndex % palette.length]);
          setPapers(cats[foundIndex].papers);
          const uniq = [
            ...new Set((cats[foundIndex].papers || []).flatMap((p) => p.keywords || [])),
          ];
          setKeywords(uniq.slice(0, 20));
        }
      } catch (err) {
        console.error("Error cargando categorías", err);
      }
    };
    load();
  }, [categoryName]);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-16">
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="group relative inline-flex items-center justify-center mb-10"
      >
        <span className="absolute w-10 h-10 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-400 ease-out"></span>
        <span className="relative text-4xl text-white transition-colors duration-300 z-10 group-hover:text-white">
          ←
        </span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start">
        {/* Lado izquierdo */}
        <div className="md:col-span-1 flex flex-col items-center md:items-start">
          <div className="relative">
            {/* Halo pulsante */}
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
            {/* Planeta */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`relative w-56 h-56 rounded-full bg-gradient-to-br ${color} shadow-2xl flex items-center justify-center`}
            >
              <span className="text-5xl drop-shadow">🪐</span>
            </motion.div>
          </div>

          <h1 className="text-2xl font-bold text-white mt-6 text-center md:text-left">
            {categoryName}
          </h1>

          {keywords.length > 0 && (
            <div className="mt-6 w-full bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <h3 className="text-white font-semibold mb-2">🔑 Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k) => (
                  <span
                    key={k}
                    className="px-3 py-1 rounded-full text-xs md:text-sm bg-white/15 text-white"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lado derecho */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-3">Artículos relacionados</h2>
          <PaperList papers={papers} />
        </div>
      </div>
    </section>
  );
}
