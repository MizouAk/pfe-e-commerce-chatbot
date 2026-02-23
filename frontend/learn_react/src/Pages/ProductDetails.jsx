
/*
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Composantes/Footer";

import "./ProductDetails.css";


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then(res => res.json())
      .then(json => setProduct(json.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
    <Link to="/Shop" className="back-btn">⬅ رجع للمنتوجات</Link>
    <div className="product-details">
      <img src={product.image_url} alt={product.name} />

      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>{product.price} DH</h2>

        {product.stock > 0 ? (
          <button>Add to cart</button>
        ) : (
          <span>Out of stock</span>
        )}
      </div>
    </div>
    </>
  );
}

export default ProductDetails;
*/

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { products as dataProducts } from "../Datatest/products";
import Navbar from "../Composantes/Navbar";

import Footer from "../Composantes/Footer";
import { useCart } from "../Context/CartContex";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  useEffect(() => {
    const found = dataProducts.find((p) => String(p.id) === String(id));
    setProduct(found);
    setQty(1);
  }, [id]);

  if (!product) return <p>Product not found</p>;
  const incQty = () => setQty((q) => Math.min(q + 1, product.stock || 99));
  const decQty = () => setQty((q) => Math.max(1, q - 1));
  return (
    <>
      <Navbar />
      <Link to="/shop" className="back-btn">Continuer les achats</Link>

      <div className="pd-box">
        <img className="pd-img" src={product.image_url} alt={product.name} />

        <div className="pd-info">
          <h1 className="pd-title">{product.name}</h1>
          <p className="pd-desc">{product.description}</p>
          <h2 className="pd-price">{product.price} DH</h2>

          <p className={product.stock > 0 ? "pd-stock ok" : "pd-stock no"}>
            {product.stock > 0 ? `En stock (${product.stock})` : "Out of stock"}
          </p>

          <div className="pd-actions">
            <div className="pd-qty">
              <button className="pd-qty-btn" onClick={decQty} disabled={qty <= 1}>-</button>
              <span className="pd-qty-val">{qty}</span>
              <button
                className="pd-qty-btn" onClick={incQty}
                disabled={product.stock > 0 ? qty >= product.stock : true}
              >
                +
              </button>
            </div>

            <button className="pd-add" disabled={product.stock <= 0} onClick={() => addToCart(product, qty)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;