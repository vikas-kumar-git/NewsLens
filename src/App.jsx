//App.jsx


import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import About from "./pages/About";
import ForYou from "./pages/ForYou";


export default function App() {

  


  return (

   

    <BrowserRouter>
      <Routes>

        {/* 🔹 Layout Wrapper (Navbar + Footer) */}
        <Route
          path="/"
          element={
            <MainLayout
              
            />
          }
        >

          {/* 🔹 Home Page */}
          <Route
            index
            element={<Home />}
          />

          {/* 🔹 Category Page */}
          <Route
            path="category/:cat"
            element={<Category/>}
          />

          {/* 🔹 Search Page */}
          <Route
            path="search"
            element={<Search  />}
          />

          {/* 🔹 About Page */}
          <Route
            path="about"
            element={<About />}
          />
          {/* 🔹 For You Page */}
          <Route
            path="foryou"
            element={<ForYou />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}