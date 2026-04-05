import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";



export default function MainLayout() {

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col">

      {/* 🔹 Navbar */}
      <Navbar  />

      {/* 🔹 Main Content (Dynamic via routing) */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-4">
        <Outlet />
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white text-center py-4 mt-4 border-t border-gray-300 dark:border-gray-700">
        <p>© 2026 NewsLens. All rights reserved.</p>
      </footer>

    </div>
  );
}