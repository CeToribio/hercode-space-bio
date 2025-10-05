import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import PaperList from "../components/PaperList";
import { useLocation } from "react-router-dom";
import { fetchCategories } from "../services/dataService";
import CategoryCards from "../components/CategoryGrid";

const SEARCH_DELAY_MS = 3500;

export default function Search() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);
  const [categories, setCategories] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [pendingTerm, setPendingTerm] = useState(null);

  const categoriesRef = useRef(null);
  const location = useLocation();

  const papers = useMemo(
    () =>
      categories.flatMap((category) =>
        (category.papers || []).map((paper) => ({
          ...paper,
          category: category.name,
        }))
      ),
    [categories]
  );

  // 🔎 Buscar solo en el JSON principal
  const handleSearch = useCallback(
    async (term) => {
      setQuery(term);
    const normalized = term.trim().toLowerCase();

    if (!normalized) {
      setResults([]);
      setPendingTerm(null);
      return;
    }

    if (initialLoading) {
      setPendingTerm(term);
      setLoading(true);
      setResults(null);
      return;
    }

    setLoading(true);
    setResults(null);

    await new Promise((resolve) => setTimeout(resolve, SEARCH_DELAY_MS));

      const filtered = papers.filter((paper) => {
        const haystack = [
          paper.title,
          ...(paper.authors || []),
          ...(paper.keywords || []),
          paper.summary || "",
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalized);
      });

      setResults(filtered);
      setLoading(false);
      setPendingTerm(null);
    },
    [initialLoading, papers]
  );

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
    const loadData = async () => {
      setInitialLoading(true);
      setDataError(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error cargando categorías", err);
        setDataError("No pudimos cargar la información. Intenta nuevamente más tarde.");
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!initialLoading && pendingTerm) {
      handleSearch(pendingTerm);
    } 
  }, [initialLoading, pendingTerm, loading, handleSearch]);

  useEffect(() => {
    if (!initialLoading && location.hash === "#areas") {
      categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialLoading, location.hash]);

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
            <p className="mt-4 text-white animate-pulse">Buscando…</p>
          )}
          {!loading && !initialLoading && Array.isArray(results) && results.length > 0 && (
            <PaperList papers={results} />
          )}
          {!loading && !initialLoading && query && Array.isArray(results) && results.length === 0 && (
            <p className="text-white mt-4">
              No se encontraron resultados para "{query}"
            </p>
          )}
          {dataError && (
            <p className="text-red-200 mt-4">{dataError}</p>
          )}
        </div>
      </section>

      {/* 🔽 Botón flotante */}
      
      <motion.button
        onClick={isAtTop ? scrollToCategories : scrollToTop}
        className="fixed right-20 bottom-20 z-50 bg-white/20 hover:bg-white/40 p-4 rounded-full shadow-lg transition-colors"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 0 0 rgba(255,255,255,0.35)" }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255,255,255,0.35)",
              "0 0 0 28px rgba(255,255,255,0)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
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
        className="relative w-full flex flex-col items-center text-center px-8 pt-4 pb-24"
      >
        <h2 className="text-2xl md:text-3xl text-white font-suse">
          Explora por áreas de conocimiento
        </h2>
        <p className="text-sm md:text-base text-indigo-200 mt-2 max-w-lg">
          Haz clic en una categoría para descubrir papers y recursos relacionados.
        </p>

        <div className="w-full mt-16 min-h-[460px] flex items-center justify-center">
          <CategoryCards categories={categories} loading={initialLoading} />

        </div>
      </section>
    </div>
  );
}
