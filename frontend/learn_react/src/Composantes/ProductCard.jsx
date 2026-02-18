// ProductCard.jsx
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
    const navigate = useNavigate();
  return (
    <div className="product-card"   onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category.name}</p>
      <span>{product.price} DH</span>
      {product.stock > 0 ? (
        <button>Add to cart</button>
      ) : (
        <span className="out-stock">Out of stock</span>
      )}
    </div>
  );
}

export default ProductCard;
