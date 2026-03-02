//shop.jsx
import { useState } from "react";
import Navbar from "../Composantes/Navbar";
import Footer from "../Composantes/Footer";
import HeroShop from "../Composantes/HeroShop";
import ProductsList from "../Composantes/ProductsList";
import CategoriesButtons from "../Composantes/CategoriesButtons";
import Notch from "../Composantes/Notch";

function Shop() {
  const [categoryId, setCategoryId] = useState("");

  return (
    <>
      <Navbar />
      <HeroShop />

      <CategoriesButtons
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />

      <ProductsList categoryId={categoryId} />

      <Notch />
      <Footer />
    </>
  );
}

export default Shop;
