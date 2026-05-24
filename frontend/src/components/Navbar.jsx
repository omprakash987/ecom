import React, { useState } from "react";
import { Menu, ShoppingCart, User, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserstore";
import { useCartStore } from "../store/useCartStore";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <>
      <header
        className="w-full bg-[#0a1628] fixed top-0 left-0 z-50"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── MAIN NAV ROW ── */}
        <div className="max-w-7xl mx-auto px-3 md:px-6 h-14 flex items-center gap-3 md:gap-5">

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-white/80 hover:text-white transition flex-shrink-0"
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="logo.jpeg"
              alt="muscleup"
              className="h-9 w-9 rounded-lg object-cover border-2 border-[#f5a623]/40"
            />
          </Link>

          {/* Search Bar — desktop */}
          <div className="hidden md:flex flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Products, Categories, Brands and More..."
              className="w-full pl-4 pr-10 py-2 rounded-md bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a1628] transition"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 md:gap-4 ml-auto md:ml-0">
            {/* Login / Logout */}
            {user ? (
              <button
                onClick={logout}
                className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#f5a623] transition group"
              >
                <User size={18} />
                <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wide hidden sm:block">
                  Logout
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#f5a623] transition group"
              >
                <User size={18} />
                <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wide hidden sm:block">
                  Login
                </span>
              </Link>
            )}

            {/* My Account */}
            {user && (
              <Link
                to="/myaccount"
                className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#f5a623] transition hidden sm:flex"
              >
                <User size={18} />
                <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wide">
                  Account
                </span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex flex-col items-center gap-0.5 text-white/70 hover:text-[#f5a623] transition"
            >
              <ShoppingCart size={18} />
              <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wide hidden sm:block">
                Cart
              </span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#f5a623] text-black text-[9px] font-black min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 leading-none">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ── MOBILE SEARCH ROW ── */}
        <div className="md:hidden px-3 pb-2.5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Products..."
              className="w-full pl-4 pr-10 py-2 rounded-md bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <Search size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ── SPACER — pushes page content below fixed navbar ── */}
      {/* Desktop: 56px (h-14), Mobile: 56px top-bar + ~44px search row = 100px */}
      <div className="h-[100px] md:h-14" />

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;