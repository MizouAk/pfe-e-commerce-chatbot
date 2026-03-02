// ProductCard.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext"; 
import { useAuthUi } from "../Context/AuthUiContext";
  import { getProductImage } from "../api/imageUrl";

import "./ProductCard.css";

function ProductCard({ product }) {
    const navigate = useNavigate();
     const { addToCart } = useCart();
     const { openAuth } = useAuthUi();
    
      const goToDetails = () => {
    navigate(`/product/${product.id}`);
  };
   const handleAddToCart = (e) => {
    e.stopPropagation();         
      const token = localStorage.getItem("token");
    if (!token) {
      openAuth();       // ✅ يفتح AuthModal
      return;
    }

    if (product.stock <= 0) return;
    addToCart(product.id, 1);
  };

  return (
    <div className="product-card" onClick={goToDetails}>
      <img src={getProductImage(product)} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category.name}</p>
      <span>{product.price} DH</span>
      {product.stock > 0 ? (
        <button onClick={handleAddToCart}>Add to cart</button>
      ) : (
        <span className="out-stock">Out of stock</span>
      )}
    </div>
  );
}

export default ProductCard;
