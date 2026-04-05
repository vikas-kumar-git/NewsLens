import News from "../components/News";
import { useContext } from "react";
import NewsContext from "../context/createcontext";

function ForYou() {
  const { country } = useContext(NewsContext);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Recommended For You
      </h2>

      <News
        key={`for-you-${country}`}
        query=""
        country={country}
        category="top"
        showHeading={false}
      />
    </div>
  );
}

export default ForYou;
