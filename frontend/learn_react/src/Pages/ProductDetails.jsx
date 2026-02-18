import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  );
}

export default ProductDetails;
