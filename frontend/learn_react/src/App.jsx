import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Composantes/Navbar";
import Hero from "./Composantes/Hero";
import Features from "./Composantes/Features";
import Collections from "./Composantes/Collections";
import Footer from "./Composantes/Footer";
import Notch from "./Composantes/Notch";
import Home from "./Pages/Home";
import Shop from "./Pages/shop";
import Contact from "./Pages/contact";
import ProductDetails from "./Pages/ProductDetails";

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      
    </>
  );
}

export default App;
