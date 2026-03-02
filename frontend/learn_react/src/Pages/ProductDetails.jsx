



//ProductDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../api/apiFetch";
import Navbar from "../Composantes/Navbar";
import Footer from "../Composantes/Footer";
import { useCart } from "../Context/CartContext";
import { useAuthUi } from "../Context/AuthUiContext";
import { getProductImage } from "../api/imageUrl";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { openAuth } = useAuthUi();
  const { addToCart } = useCart();
  useEffect(() => {
    apiFetch(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setQty(1);
      })
      .catch(() => setProduct(null));
  }, [id]);
  if (!product) return <p>Product not found</p>;
  const incQty = () => setQty((q) => Math.min(q + 1, product.stock || 99));
  const decQty = () => setQty((q) => Math.max(1, q - 1));
  return (
    <>
      <Navbar />
      <Link to="/shop" className="back-btn">Continuer les achats</Link>

      <div className="pd-box">
        <img  className="pd-img" src={getProductImage(product)} alt={product?.name} />

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

            <button className="pd-add" disabled={product.stock <= 0} onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) return openAuth();
              addToCart(product.id, qty);
            }}>
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