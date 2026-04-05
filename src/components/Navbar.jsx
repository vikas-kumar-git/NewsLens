import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NewsContext from "../context/createcontext";

export default function Navbar() {
  const navigate = useNavigate();
  const {
    search,
    setSearch,
    menuOpen,
    setMenuOpen,
    setQuery,
    setCategory,
    darkMode,
    setDarkMode,
  } = useContext(NewsContext);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();
    if (trimmedSearch.length < 3) return;

    setQuery(trimmedSearch);
    setCategory("general");
    setMenuOpen(false);
    navigate("/search");
  };


  const categories = [
    "breaking",
    "business",
    "crime",
    "domestic",
    "education",
    "entertainment",
    "environment",
    "food",
    "health",
    "lifestyle",
    "other",
    "politics",
    "science",
    "sports",
    "technology",
    "top",
    "tourism",
    "world",
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white sticky top-0 z-50 shadow-md">
      {/* 🔷 TOP ROW */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 🔹 Left: Logo */}
        <NavLink to="/" className="text-xl font-bold">
        <img width={'200px'} src="/NewsLensLogo.png" alt="NewsLens" />
      
        </NavLink>

        {/* 🔹 Center: Navigation (desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          {/* 🔍 Search Input */}
          <form className="flex gap-2" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search news..."
              className="px-2 py-1 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={search.trim().length < 3}
            >
              Search
            </button>
          </form>
        </div>

        {/* 🔹 Right: Theme Toggle + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-lg"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* 🔷 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-50 dark:bg-gray-800">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            About
          </NavLink>

          <NavLink
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Search
          </NavLink>

          {/* Search Input (Mobile) */}
          <form className="flex mt-2 gap-2" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search news..."
              className="w-full px-2 py-1 rounded-l text-gray-900 bg-white dark:text-white dark:bg-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={search.trim().length < 3}
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* 🔷 BOTTOM ROW (Categories) */}
      <div className="bg-gray-200 dark:bg-gray-800 scrollbar-hidden overflow-x-auto whitespace-nowrap px-4 md:px-40 py-2 flex justify-evenly">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `inline-block mr-4 capitalize ${
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `inline-block mr-4 capitalize ${
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/foryou"
          className={({ isActive }) =>
            `inline-block mr-4 capitalize ${
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }`
          }
        >
          For You
        </NavLink>
        <span className="border border-gray-500 mx-5"></span>
        {categories.map((cat) => (
          <NavLink
            key={cat}
            to={`/category/${cat}`}
            className={({ isActive }) =>
              `inline-block mr-4 capitalize ${
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
              }`
            }
          >
            {cat}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
