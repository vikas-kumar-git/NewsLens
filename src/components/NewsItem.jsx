import React from "react";


export default function NewsItem({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source
}) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition duration-300 overflow-hidden">

      {/* 🔹 Image */}
      <img
        src={
          imageUrl && imageUrl !== "null"
            ? imageUrl
            : "/E404.png"
        }
        alt="news"
        className="w-full h-44 object-cover"
      />

      <div className="p-4">

        {/* 🔹 Source Badge */}
        <span className="inline-block mb-2 text-xs font-semibold bg-red-500 text-white px-2 py-1 rounded">
          {source || "Unknown Source"}
        </span>

        {/* 🔹 Title */}
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">
          {title || "No Title Available"}
        </h2>

        {/* 🔹 Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
          {description || "No Description Available"}
        </p>

        {/* 🔹 Author + Date */}
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          By {author || "Unknown"} •{" "}
          {date
            ? new Date(date).toLocaleString()
            : "No Date"}
        </p>

        {/* 🔹 Read More */}
        <a
          href={newsUrl || "#"}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition"
        >
          Read More →
        </a>

      </div>
    </div>
  );
}