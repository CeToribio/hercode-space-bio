import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function PaperList({ papers }) {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <ul className="mt-6 w-full max-w-2xl space-y-3 text-left">
      {papers.map((paper) => (
        <li
          key={paper.id}
          className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
          <button
            onClick={() => toggleOpen(paper.id)}
            className="w-full flex justify-between items-center px-5 py-4 text-white text-left"
          >
            <div>
              <h3 className="font-semibold text-lg">{paper.title}</h3>
              <p className="text-sm opacity-80">
                {paper.authors.join(", ")} • {paper.year}
              </p>
            </div>
            <span className="text-xl transition-transform duration-300">
              {openId === paper.id ? "▲" : "▼"}
            </span>
          </button>

          <AnimatePresence>
            {openId === paper.id && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="px-5 pb-4 text-white/90"
              >
                <p className="mb-3">{paper.summary}</p>
                {paper.link && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 mt-2 rounded-full bg-[#033096] hover:bg-[#010b22] text-white text-sm font-medium transition-colors"
                  >
                    🔗 Ver paper completo
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}
