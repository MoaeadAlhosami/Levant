import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/Customer/HomePage';
import CategoriesPage from '../pages/Customer/CategoriesPage';
import SubcategoriesPage from '../pages/Customer/SubcategoriesPage';
import ItemsPage from '../pages/Customer/ItemsPage';
import LoginPage from '../pages/Admin/LoginPage';
import AdminLayout from '../components/Admin/AdminLayout';
import AdsPage from '../pages/Admin/AdsPage';
import OrderPage from '../pages/Admin/OrderPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* legacy aliases */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id/subcategories" element={<SubcategoriesPage />} />
        <Route path="/categories/:id/items" element={<ItemsPage />} />

        {/* landing / choose UI */}
        <Route path="/" element={<LandingPage />} />

        {/* customer-facing under /restaurant */}
        <Route path="/restaurant" element={<HomePage />} />
        <Route path="/restaurant/categories" element={<CategoriesPage />} />
        <Route path="/restaurant/categories/:id/subcategories" element={<SubcategoriesPage />} />
        <Route path="/restaurant/categories/:id/items" element={<ItemsPage />} />

        {/* admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<OrderPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="ads" element={<AdsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}