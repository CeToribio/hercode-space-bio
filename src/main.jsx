import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="/explorar" element={<Search />} />
           <Route path="/categoria/:slug" element={<CategoryPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
