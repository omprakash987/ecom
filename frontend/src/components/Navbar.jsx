import React from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserstore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/60 border-b border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 bg-clip-text text-transparent tracking-wider hover:scale-110 transition duration-300"
        >
          MUSCLE-UP
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-300 hover:text-cyan-400 transition duration-300"
          >
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="relative group flex items-center text-gray-300 hover:text-cyan-400 transition duration-300"
            >
              <ShoppingCart className="mr-1 group-hover:rotate-12 transition duration-300" />
              <span className="hidden sm:inline">Cart</span>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full animate-bounce shadow-lg">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex items-center gap-1 px-3 py-1 rounded-lg 
              bg-gradient-to-r from-indigo-500 to-purple-600 
              hover:scale-105 hover:shadow-[0_0_15px_rgb(147,51,234)] 
              transition duration-300 text-white"
            >
              <Lock size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-red-500 to-pink-600
              hover:scale-105 hover:shadow-[0_0_20px_rgb(255,0,128)]
              transition duration-300 text-white"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-lg
                bg-gradient-to-r from-emerald-500 to-cyan-500
                hover:scale-105 hover:shadow-[0_0_20px_rgb(16,185,129)]
                transition duration-300 text-white"
              >
                <UserPlus size={18} />
                Sign Up
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg
                bg-gradient-to-r from-gray-700 to-gray-900
                hover:scale-105 hover:shadow-[0_0_15px_rgb(0,255,255)]
                transition duration-300 text-white"
              >
                <LogIn size={18} />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;