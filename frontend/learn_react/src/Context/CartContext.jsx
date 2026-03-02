// CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/apiFetch";

export const CartContext = createContext();

function normalizeCartResponse(res) {
  // backend: { success:true, data:{ items:[], total:"" } }
  const payload = res?.data ?? res;        // ✅ خذ res.data إذا موجودة

  const items =
    payload?.items ||
    payload?.cart_items ||
    payload?.cartItems ||
    payload?.data?.items ||               // ✅ احتياط
    res?.items ||
    [];

  return Array.isArray(items) ? items : [];
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [cartError, setCartError] = useState("");

  // ✅ state باش React يحس بتبديل token
  const [tokenVersion, setTokenVersion] = useState(0);

  const refreshAuth = () => setTokenVersion((v) => v + 1);

  const loadCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setItems([]);
      return;
    }

    setLoadingCart(true);
    setCartError("");

    try {
      const data = await apiFetch("/cart", { method: "GET" });
      setItems(normalizeCartResponse(data));
    } catch (e) {
      setCartError(e.message || "Erreur lors du chargement du panier");
    } finally {
      setLoadingCart(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartError("خاصك دير login باش تزّيد للبانير");
      return;
    }

    setCartError("");
    try {
      await apiFetch("/cart/add", {
        method: "POST",
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      await loadCart();
    } catch (e) {
      setCartError(e.message || "Erreur lors de l'ajout au panier");
    }
  };

  const updateQty = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartError("خاصك دير login");
      return;
    }

    setCartError("");
    try {
      await apiFetch("/cart/update", {
        method: "PUT",
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      await loadCart();
    } catch (e) {
      setCartError(e.message || "Erreur lors de la mise à jour");
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartError("خاصك دير login");
      return;
    }

    setCartError("");
    try {
      await apiFetch(`/cart/remove/${productId}`, { method: "DELETE" });
      await loadCart();
    } catch (e) {
      setCartError(e.message || "Erreur lors de la suppression");
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartError("خاصك دير login");
      return;
    }

    setCartError("");
    try {
      await apiFetch("/cart/clear", { method: "DELETE" });
      await loadCart();
    } catch (e) {
      setCartError(e.message || "Erreur lors du vidage du panier");
    }
  };

  // ✅ كل مرة token يتبدل (login/logout) نعاودو نجيبو cart
  useEffect(() => {
    loadCart();
  }, [tokenVersion]);

  // ✅ Event باش AuthModal يقدر يعيط: window.dispatchEvent(new Event("auth-changed"))
  useEffect(() => {
    const onAuthChanged = () => refreshAuth();
    window.addEventListener("auth-changed", onAuthChanged);
    return () => window.removeEventListener("auth-changed", onAuthChanged);
  }, []);

  const cartCount = useMemo(() => {
    return items.reduce((sum, it) => {
      const q = Number(it.quantity ?? it.qty ?? 1);
      return sum + (isNaN(q) ? 0 : q);
    }, 0);
  }, [items]);

  const value = {
    cart: items,
    cartCount,
    loadingCart,
    cartError,

    loadCart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,

    // ✅ نقدروا نستعملوها منين user يدير logout
    refreshAuth,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}