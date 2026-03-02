// CategoriesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/apiFetch";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingCategories(true);
    apiFetch("/categories")
      .then((json) => {
        const list = json?.data || [];
        setCategories(Array.isArray(list) ? list : []);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoadingCategories(false));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loadingCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}