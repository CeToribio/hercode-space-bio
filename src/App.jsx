import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-space text-white overflow-x-hidden">
      <Starfield />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
