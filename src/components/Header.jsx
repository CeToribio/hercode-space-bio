import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const handleAreasClick = (event) => {
    if (location.pathname === "/explorar") {
      event.preventDefault();
      window.history.replaceState(null, "", "#areas");
      document
        .getElementById("areas")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between absolute top-0 left-0 z-20 bg-transparent">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-[#033096]">
        HerCode Space Bio
      </h1>

      {/* Navlinks */}
      <nav className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-[#033096] hover:underline transition ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Inicio
        </NavLink>
        <NavLink
          to="/explorar"
          className={({ isActive }) =>
            `text-[#033096] hover:underline transition ${
              isActive ? "underline" : ""
            }`
          }
        >
          Explora
        </NavLink>
        <NavLink
          to="/explorar#areas"
          onClick={handleAreasClick}
          className={({ isActive }) =>
            `text-[#033096] hover:underline transition ${
              isActive ? "underline" : ""
            }`
          }
        >
          Áreas De Estudio
        </NavLink>
      </nav>
    </header>
  );
}
