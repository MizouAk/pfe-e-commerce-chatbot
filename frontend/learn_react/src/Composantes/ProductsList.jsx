// ProductsList.jsx

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../Composantes/ProductCard";
import { apiFetch } from "../api/apiFetch";
import "./ProductsList.css";

function ProductsList({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);

  const q = urlParams.get("search") || "";
  const urlCategoryId = urlParams.get("category_id") || "";
  const finalCategoryId = categoryId || urlCategoryId;

  // reset page when filter/search changes
  useEffect(() => {
    setPage(1);
  }, [q, finalCategoryId]);

  // fetch products from backend
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      apiFetch(
        `/products?search=${encodeURIComponent(q)}&category_id=${encodeURIComponent(
          finalCategoryId
        )}&page=${page}`
      )
        .then((json) => {
          setProducts(json?.data?.data || []);
          setLastPage(json?.data?.last_page || 1);
        })
        .catch(console.log)
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [q, finalCategoryId, page]);

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <>
      <div className="products-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          Prev
        </button>

        <span className="page-info">
          Page {page} / {lastPage}
        </span>

        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
          disabled={page >= lastPage}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ProductsList;

