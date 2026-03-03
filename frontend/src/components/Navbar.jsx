import React, { useState } from "react";
import { Menu, ShoppingCart, User } from "lucide-react";
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

  return (
    <>
      <header className="w-full bg-white border-b border-gray-300 fixed top-0 left-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-4">
            <Menu
              size={28}
              className="cursor-pointer text-black"
              onClick={() => setIsOpen(true)}
            />

            <Link to="/" className="text-2xl font-extrabold text-black tracking-wide">
              MUSCLEUP24x7
            </Link>
          </div>

          {/* Search Desktop */}
          <div className="hidden md:flex flex-1 mx-10">
           <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={handleSearch}
  placeholder="Search Products, Categories, Brands and More"
  className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">

            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-black font-semibold hover:text-orange-500 transition"
              >
                <User size={20} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-black font-semibold hover:text-orange-500 transition"
              >
                <User size={20} />
                Login
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-black font-semibold hover:text-orange-500 transition"
            >
              <ShoppingCart size={22} />
              <span className="hidden sm:block">Cart</span>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={handleSearch}
  placeholder="Search Products..."
  className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>
        </div>
      </header>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;