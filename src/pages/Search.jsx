import { useState, useEffect, useRef } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import PaperList from "../components/PaperList";
import CategoryCarousel from "./CategoryCarousel";
import { useLocation } from "react-router-dom";

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);

  const categoriesRef = useRef(null);
  const location = useLocation();

  // 🔎 Buscar solo en el JSON de papers
  const handleSearch = async (term) => {
    setQuery(term);
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get("/data/papers.json");
      const papers = res.data;

      const filtered = papers.filter(
        (p) =>
          p.title.toLowerCase().includes(term.toLowerCase()) ||
          (p.authors || []).some((a) =>
            a.toLowerCase().includes(term.toLowerCase())
          ) ||
          (p.keywords || []).some((k) =>
            k.toLowerCase().includes(term.toLowerCase())
          )
      );
      setResults(filtered);
    } catch (err) {
      console.error("Error cargando papers", err);
    } finally {
      setLoading(false);
    }
  };

  // 👀 Detectar scroll para el botón flotante
  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setIsAtTop(window.scrollY < heroHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (location.hash === "#areas") {
      const timeout = setTimeout(() => {
        categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [location.hash]);

  return (
    <div className="relative">
      {/* 🟣 HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-start text-center px-4 pt-24 md:pt-32">
        <div className="relative z-10 w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-suse">
            Explora el conocimiento de Biología Espacial 🌌
          </h1>
          <p className="text-sm md:text-base text-white mb-8">
            Encuentra papers y recursos escribiendo un tema, autor o palabra clave.
          </p>

          <SearchBar onSearch={handleSearch} />

          {loading && (
            <p className="mt-4 text-indigo-300 animate-pulse">Buscando...</p>
          )}
          {!loading && results.length > 0 && <PaperList papers={results} />}
          {!loading && query && results.length === 0 && (
            <p className="text-white mt-4">
              No se encontraron resultados para "{query}"
            </p>
          )}
        </div>
      </section>

      {/* 🔽 Botón flotante */}
      <motion.button
        onClick={isAtTop ? scrollToCategories : scrollToTop}
        className="fixed right-6 bottom-6 z-50 bg-white/20 hover:bg-white/40 p-4 rounded-full shadow-lg transition-colors"
        whileHover={{ scale: 1.1 }}
      >
        {isAtTop ? (
          <FiChevronDown className="text-white text-2xl" />
        ) : (
          <FiChevronUp className="text-white text-2xl" />
        )}
      </motion.button>

      {/* 🌌 CATEGORÍAS */}
      <section
        id="areas"
        ref={categoriesRef}
        className="relative w-full flex flex-col items-center text-center px-4 pt-12 pb-24"
      >
        <h2 className="text-2xl md:text-3xl text-white font-suse">
          Explora por áreas de conocimiento
        </h2>
        <p className="text-sm md:text-base text-indigo-200 mt-2 max-w-lg">
          Haz clic en una categoría para descubrir papers y recursos relacionados.
        </p>

        <div className="w-full mt-16">
          {/* 🚀 El carrusel solo muestra categorías y navega a la página de detalle */}
          <CategoryCarousel />
        </div>
      </section>
    </div>
  );
}

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import SearchBar from "../components/SearchBar";
// import PaperList from "../components/PaperList";
// import PlanetCarousel from "./CategoryCarousel";

// export default function Search() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState("");
//   const [isAtTop, setIsAtTop] = useState(true);

//   const categoriesRef = useRef(null);

//   const handleSearch = async (term) => {
//     setQuery(term);
//     if (!term.trim()) {
//       setResults([]);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.get("/data/papers.json");
//       const papers = res.data;
//       const filtered = papers.filter(
//         (p) =>
//           p.title.toLowerCase().includes(term.toLowerCase()) ||
//           p.keywords.some((k) => k.toLowerCase().includes(term.toLowerCase()))
//       );
//       setResults(filtered);
//     } catch (err) {
//       console.error("Error cargando papers", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const onScroll = () => {
//       const heroHeight = window.innerHeight * 0.8;
//       setIsAtTop(window.scrollY < heroHeight);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const scrollToCategories = () => {
//     categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="relative">
//       {/* 🟣 HERO */}
//       <section className="relative min-h-screen flex flex-col items-center justify-start text-center px-4 pt-24 md:pt-32">
//         <div className="relative z-10 w-full max-w-2xl">
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-suse">
//             Explora el conocimiento de Biología Espacial 🌌
//           </h1>
//           <p className="text-sm md:text-base text-white mb-8">
//             Encuentra papers y recursos escribiendo un tema, autor o palabra clave.
//           </p>

//           <SearchBar onSearch={handleSearch} />

//           {loading && (
//             <p className="mt-4 text-indigo-300 animate-pulse">Buscando...</p>
//           )}
//           {!loading && results.length > 0 && <PaperList papers={results} />}
//           {!loading && query && results.length === 0 && (
//             <p className="text-white mt-4">
//               No se encontraron resultados para "{query}"
//             </p>
//           )}
//         </div>
//       </section>

//       {/* 🔽 Flecha flotante */}
//       <motion.button
//         onClick={isAtTop ? scrollToCategories : scrollToTop}
//         className="fixed right-6 bottom-6 z-50 bg-white/20 hover:bg-white/40 p-4 rounded-full shadow-lg transition-colors"
//         whileHover={{ scale: 1.1 }}
//       >
//         {isAtTop ? (
//           <FiChevronDown className="text-white text-2xl" />
//         ) : (
//           <FiChevronUp className="text-white text-2xl" />
//         )}
//       </motion.button>

//       {/* 🌌 CATEGORÍAS */}
//       <section
//         ref={categoriesRef}
//         className="relative w-full flex flex-col items-center text-center px-4 pt-20 pb-28"
//       >
//         <h2 className="text-2xl md:text-3xl text-white font-suse">
//           Explora por áreas de conocimiento
//         </h2>
//         <p className="text-sm md:text-base text-indigo-200 mt-2 max-w-lg">
//           Haz clic en una categoría para descubrir papers y recursos relacionados.
//         </p>

//         <div className="w-full mt-16">
//           <PlanetCarousel onSelect={(cat) => handleSearch(cat)} />
//         </div>
//       </section>
//     </div>
//   );
// }

// import { useState } from "react";
// import axios from "axios";
// import SearchBar from "../components/SearchBar";

// export default function Search() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (term) => {
//     setQuery(term);
//     if (!term.trim()) {
//       setResults([]);
//       return;
//     }
//     setLoading(true);
//     try {
//       // ⚡ Carga tu JSON local (después podrás cambiar por tu API real)
//       const res = await axios.get("/data/papers.json");
//       const papers = res.data;

//       // 🔍 Filtra por título o keywords
//       const filtered = papers.filter(
//         (p) =>
//           p.title.toLowerCase().includes(term.toLowerCase()) ||
//           p.keywords.some((k) => k.toLowerCase().includes(term.toLowerCase()))
//       );

//       setResults(filtered);
//     } catch (err) {
//       console.error("Error cargando papers", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative flex-1 flex flex-col items-center justify-start text-center px-4 pt-10">
//       <div className="relative z-10 w-full max-w-2xl">
//         <h2 className="mt-10 text-2xl font-semibold text-white">
//           Explora el conocimiento de Biología Espacial 🌌
//         </h2>

//         {/* 🔍 SearchBar controlado */}
//         <SearchBar onSearch={handleSearch} />

//         {/* 💡 Loader simple */}
//         {loading && (
//           <p className="mt-4 text-indigo-300 animate-pulse">Buscando...</p>
//         )}

//         {/* 📚 Resultados */}
//         <div className="mt-6 text-left">
//           {results.length > 0 ? (
//             <ul className="space-y-2">
//               {results.map((paper) => (
//                 <li
//                   key={paper.id}
//                   className="bg-white/10 text-white px-4 py-2 rounded-lg shadow-md hover:bg-white/20 transition-colors duration-300"
//                 >
//                   {paper.title}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             query &&
//             !loading && (
//               <p className="text-gray-400 mt-4">
//                 No se encontraron resultados para "{query}"
//               </p>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
