// ProductCard.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContex"; 
import "./ProductCard.css";

function ProductCard({ product }) {
    const navigate = useNavigate();
     const { addToCart } = useCart();

      const goToDetails = () => {
    navigate(`/product/${product.id}`);
  };
   const handleAddToCart = (e) => {
    e.stopPropagation();         
    if (product.stock <= 0) return;
    addToCart(product, 1);        
  };
  return (
    <div className="product-card"    onClick={goToDetails}>
      <img src={product.image_url} alt={product.name} />
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
