//Home.jsx

import { useContext, useEffect } from 'react';
import News from "../components/News";
import NewsContext from '../context/createcontext';

export default function Home({ query, country }) {
  const { setCategory, setQuery } = useContext(NewsContext);

  useEffect(() => {
    setCategory("general");
    setQuery("");
  }, [setCategory, setQuery]);

  return (
    <div>
      {/* 🔹 News Component */}
      <News key="home-feed" query={query} country={country} />
    </div>
  );
}
