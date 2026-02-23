import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };
/*
    const updateQty = (id, qty) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: Math.max(1, qty) } : item
            )
        );
    };
    const addToCart = (product, qty) => {
        setCart(prev => {
            const found = prev.find(item => item.id === product.id);

            if (found) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + qty }
                        : item
                );
            }

            return [...prev, { id: product.id, qty, product }];
        });
    };
*/
const clearCart = () => setCart([]);

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const getStock = (product) => Number(product.stock ?? 0); 

const addToCart = (product, qty) => {
  const stock = getStock(product);
  if (stock <= 0) return; // out of stock

  setCart((prev) => {
    const found = prev.find((item) => item.id === product.id);

    if (found) {
      return prev.map((item) => {
        if (item.id !== product.id) return item;

        const nextQty = clamp(item.qty + qty, 1, stock);
        return { ...item, qty: nextQty };
      });
    }

    const safeQty = clamp(qty, 1, stock);
    return [...prev, { id: product.id, qty: safeQty, product }];
  });
};

const updateQty = (id, qty) => {
  setCart((prev) =>
    prev.map((item) => {
      if (item.id !== id) return item;

      const stock = getStock(item.product);
      const safeQty = clamp(qty, 1, stock || 1);
      return { ...item, qty: safeQty };
    })
  );
};
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, cartCount, removeFromCart, updateQty, clearCart   }}>
            {children}
        </CartContext.Provider>
    );
};

export function useCart() {
    return useContext(CartContext);
}