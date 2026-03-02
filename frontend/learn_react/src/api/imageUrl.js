const API_ROOT = (process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api")
  .replace(/\/api$/, "");

export function getProductImage(product) {
  if (!product) return "";
  if (product.image_url) return product.image_url;
  if (product.image) return `${API_ROOT}/storage/${product.image}`;
  return "";
}