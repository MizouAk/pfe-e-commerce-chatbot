// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Composantes/Navbar";
import Hero from "./Composantes/Hero";
import Features from "./Composantes/Features";
import Collections from "./Composantes/Collections";
import Footer from "./Composantes/Footer";
import Notch from "./Composantes/Notch";
import Home from "./Pages/Home";
import Shop from "./Pages/shop";
import Contact from "./Pages/contact";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import OrdersPage from "./Pages/OrdersPage";
import OrderDetails from "./Pages/OrderDetails";
import AdminRoute from "./Routes/AdminRoute";
import AdminLayout from "./Pages/admin/AdminLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminProducts from "./Pages/admin/AdminProducts";
import AdminProductForm from "./Pages/admin/AdminProductForm";
import AdminCategories from "./Pages/admin/AdminCategories";
import AdminCategoryForm from "./Pages/admin/AdminCategoryForm";
import Profile from "./Pages/Profile";
import AdminOrders from "./Pages/admin/AdminOrders";
import AuthRoute from "./Routes/AuthRoute";
import ClientRoute from "./Routes/ClientRoute";
function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ClientRoute><CartPage /></ClientRoute>} />

        <Route path="/orders" element={<ClientRoute><OrdersPage /></ClientRoute>} />
        <Route path="/orders/:id" element={<ClientRoute><OrderDetails /></ClientRoute>} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm mode="create" />} />
          <Route path="products/:id/edit" element={<AdminProductForm mode="edit" />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/new" element={<AdminCategoryForm mode="create" />} />
          <Route path="categories/:id/edit" element={<AdminCategoryForm mode="edit" />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
      </Routes>

    </>
  );
}

export default App;
