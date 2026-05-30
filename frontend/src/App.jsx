import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserstore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./store/useCartStore";
import PurchaseSuccessPage from "./pages/PurchahseSuccessPage";
import MyAccountPage from "./pages/MyAccountPage";
import Authenticity from "./components/Authenticity";
import Offer from "./components/Offer";
import Support from "./components/Support";
import SearchPage from "./pages/SearchPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FranchisePage from "./pages/FranchisePage";


function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/secret-dashboard"
          element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />}
        />

        <Route path="/category/:category" element={<CategoryPage />} />

        <Route
          path="/cart"
          element={user ? <CartPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/purchase-success"
          element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/myaccount"
          element={user ? <MyAccountPage /> : <Navigate to="/login" />}
        />

        <Route path="/authenticity" element={<Authenticity />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/support" element={<Support />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/franchise" element={<FranchisePage />} />
      </Routes>
      

      <Toaster />
    </div>
  );
}

export default App;