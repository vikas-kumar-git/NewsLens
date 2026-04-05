// contextProvider.jsx

import { useEffect, useState } from "react";
import NewsContext from "./createcontext"; // or "./NewsContext" etc.

function ContextProvider({ children }) {
  // accept `children`
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("in");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("general");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <NewsContext.Provider
      value={{
        query,
        setQuery,
        country,
        setCountry,
        search,
        setSearch,
        menuOpen,
        setMenuOpen,
        setCategory,
        category,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export default ContextProvider;
