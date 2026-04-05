import { useContext, useEffect } from "react";
import News from "../components/News";
import NewsContext from "../context/createcontext";
export default function Search() {
  const { query, setCategory } = useContext(NewsContext);

  useEffect(() => {
    setCategory("general");
  }, [setCategory]);

  return (
    <div>
      {/* 🔹 Heading */}
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {query ? `Search Results for "${query}"` : "Search News"}
      </h2>

      {/* 🔹 Empty State */}
      {!query ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please enter something to search.
        </p>
      ) : (
        <News key={`search-${query}`} showHeading={false} />
      )}
    </div>
  );
}
