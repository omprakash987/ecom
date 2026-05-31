import React, { useState } from "react";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
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
        className="w-full bg-[#0a1628] fixed top-0 left-0 z-50 mb-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >

        {/* ════════════════════════════════════
            MOBILE TOP BAR
            Left: Hamburger | Center: Logo | Right: User + Cart
        ════════════════════════════════════ */}
        <div className="md:hidden flex items-center justify-between px-4 h-16">

          {/* Left — Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-white/80 hover:text-white transition w-8"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>

          {/* Center — Logo (full wide version) */}
          <Link to="/" className="flex-1 flex justify-center">
            <img  
              src="logo.png"
              alt="MUSCLEUP24X7"
              className="h-16 object-contain bg-[#0a1628]"
              style={{ maxWidth: "900px" }}
            />
          </Link>

          {/* Right — User + Cart */}
         <div className="flex items-center space-x-5">
            {user ? (
              <button
                onClick={logout}
                className="text-white/70 hover:text-[#f5a623] transition"
                aria-label="Logout"
              >
                <User size={22} />
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white/70 hover:text-[#f5a623] transition"
                aria-label="Login"
              >
                <User size={22} />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative text-white/70 hover:text-[#f5a623] transition"
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#f5a623] text-black text-[9px] font-black min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 leading-none">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* MOBILE SEARCH ROW */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Products..."
              className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a1628] transition"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════
            DESKTOP NAV BAR
            Left: Hamburger + Logo | Center: Search | Right: Account + Cart
        ════════════════════════════════════ */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 h-14 items-center gap-5">

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-white/80 hover:text-white transition flex-shrink-0"
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Logo — small square version */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="logo.jpeg"
              alt="MUSCLEUP24X7"
              className="h-12 w-auto object-contain rounded-lg "
              style={{ maxWidth: "140px" }}
            />
          </Link>

          {/* Search */}
          <div className="flex flex-1 relative mx-4">
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
          <div className="flex items-center gap-5 flex-shrink-0">
            {user ? (
              <button
                onClick={logout}
                className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#f5a623] transition"
              >
                <User size={18} />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#f5a623] transition"
              >
                <User size={18} />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Login</span>
              </Link>
            )}

            {user && (
              <Link
                to="/myaccount"
                className="flex flex-col items-center gap-0.5 text-white/70 hover:text-[#f5a623] transition"
              >
                <User size={18} />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Account</span>
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex flex-col items-center gap-0.5 text-white/70 hover:text-[#f5a623] transition"
            >
              <ShoppingCart size={18} />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#f5a623] text-black text-[9px] font-black min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 leading-none">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* SPACER
          Mobile:  h-16 (top bar) + ~48px (search row) = ~112px
          Desktop: h-14 = 56px
      */}
      

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;