import React, { useState } from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserstore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 bg-clip-text text-transparent tracking-wider"
        >
          MUSCLE-UP
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-cyan-400 transition">
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="relative flex items-center text-gray-300 hover:text-cyan-400 transition"
            >
              <ShoppingCart className="mr-1" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white"
            >
              <Lock size={18} />
              Dashboard
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition text-white"
              >
                <UserPlus size={18} />
                Sign Up
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white"
              >
                <LogIn size={18} />
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 px-6 py-4 space-y-4 animate-fadeIn">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-gray-300 hover:text-cyan-400"
          >
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-gray-300 hover:text-cyan-400"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart size={18} />
                Cart
              </span>
              {cart.length > 0 && (
                <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-white bg-indigo-600 px-3 py-2 rounded-lg"
            >
              <Lock size={18} />
              Dashboard
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block bg-emerald-600 px-4 py-2 rounded-lg text-white text-center"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-gray-700 px-4 py-2 rounded-lg text-white text-center"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;