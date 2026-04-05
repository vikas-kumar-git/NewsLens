import { useEffect, useState, useContext } from "react";
import NewsItem from "./NewsItem";
import NewsContext from "../context/createcontext";
import SkeletonCard from "./SkeletonCard";

export default function News({
  query: queryOverride,
  category: categoryOverride,
  country: countryOverride,
  showHeading = true,
}) {
  const {
    query: contextQuery,
    category: contextCategory,
    country: contextCountry,
  } = useContext(NewsContext);

  const query = queryOverride ?? contextQuery;
  const category = categoryOverride ?? contextCategory;
  const country = countryOverride ?? contextCountry;

  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedRequestKey, setCompletedRequestKey] = useState("");

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const requestKey = `${query ?? ""}|${category ?? ""}|${country ?? ""}`;
  const waitingForCurrentRequest = loading || completedRequestKey !== requestKey;

  function buildNewsURL({ query, category, country }) {
    const base = "https://newsdata.io/api/1/news";

    let params = `apikey=${API_KEY}&country=${country}&language=en`;

    if (query) {
      params += `&q=${query}`;
    } else if (category && category !== "general") {
      params += `&category=${category}`;
    }

    return `${base}?${params}`;
  }

  useEffect(() => {
    const controller = new AbortController();
    let isCurrentRequest = true;

    setLoading(true);
    setError(null);
    setArticles([]);

    const fetchNews = async () => {
      try {
        const url = buildNewsURL({ query, category, country });

        const res = await fetch(url, {
          signal: controller.signal,
        });

        const data = await res.json();
        if (!isCurrentRequest) return;

        setArticles(data.results || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          if (!isCurrentRequest) return;

          setArticles([]);
          setError("Failed to load articles.");
          console.error("Error fetching news:", error);
        }
      } finally {
        if (!isCurrentRequest) return;

        setLoading(false);
        setCompletedRequestKey(requestKey);
      }
    };

    fetchNews();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [query, category, country, requestKey]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {showHeading && (
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {query
            ? `Search Results for "${query}"`
            : `Top Headlines - ${(category || "general").toUpperCase()}`}
        </h2>
      )}

      {/* 🔄 Loading */}
      {/* {loading && <h3 className="text-center">Loading...</h3>} */}
      {/* 🔄 Loading */}
      {waitingForCurrentRequest && (
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!waitingForCurrentRequest && error && (
        <p className="text-center text-red-500 mt-4">{error}</p>
      )}

      {/* ❌ No Results */}
      {!waitingForCurrentRequest && !error && articles.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No Articles found ...
        </p>
      )}

      {/* 📰 News Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {!waitingForCurrentRequest &&
          articles.map((item, index) => {
            return (
              <NewsItem
                key={index}
                title={item.title}
                description={item.description}
                imageUrl={item.image_url}
                newsUrl={item.link}
                author={item.creator?.[0]} // 🔥 array → string
                date={item.pubDate}
                source={item.source_name} // 🔥 use name, not id
              />
            );
          })}
      </div>
    </div>
  );
}
