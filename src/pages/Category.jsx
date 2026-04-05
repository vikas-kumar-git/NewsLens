import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import News from "../components/News";
import NewsContext from "../context/createcontext";

export default function Category() {
  const { setCategory, setQuery, setSearch } = useContext(NewsContext);
  const { cat } = useParams();

  useEffect(() => {
    setCategory(cat);
    setQuery("");
    setSearch("");
  }, [cat, setCategory, setQuery, setSearch]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {cat.toUpperCase()} News
      </h2>

      <News key={`category-${cat}`} showHeading={false} />
    </div>
  );
}
