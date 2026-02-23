// ProductsList.jsx

import { useState, useEffect } from "react";
import ProductCard from "../Composantes/ProductCard";
import { products as dataProducts } from "../Datatest/products";
import "./ProductsList.css";

function ProductsList() {
  const [products, setProducts] = useState([]);



  useEffect(() => {
    /*fetch("http://127.0.0.1:8000/api/products")
       .then(res => res.json())
       .then(json => setProducts(json.data.data))
       .catch(err => console.log(err));
       */
    setProducts(dataProducts);

  }, []);

  return (
    <div className="products-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;


/*











//ProductList.jsx test


import "./ProductsList.css";
import products from "../Datatest/products";
import ProductCard from "./ProductCard";

function ProductsList() {
  return (
    <div className="products-list">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductsList;
*/