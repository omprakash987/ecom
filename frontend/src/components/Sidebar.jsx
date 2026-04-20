import React, { useState } from "react";
import { useUserStore } from "../store/useUserstore";
import {
  User,
  Package,
  ShieldCheck,
  Tag,
  HeartHandshake,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState("categories");
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const categories = [
    { name: "Protein", slug: "whey" },
    { name: "Creatine", slug: "creatine" },
    { name: "Fish Oil", slug: "FishOil" },
    { name: "Pre Workout", slug: "preworkout" },
    { name: "EAA", slug: "EAA" },
    { name: "BCAA", slug: "BCAA" },
    { name: "Multivitamin", slug: "Multivitamin" },
  ];

  const brands = [
    "Optimum Nutrition",
    "MuscleBlaze",
    "MyProtein",
    "GNC",
    "BigMuscles",
    "HealthKart",
    "Dymatize",
    "BSN",
    "Ultimate Nutrition",
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top */}
        <div className="p-4 border-b">
          {!user ? (
            <h2
              onClick={() => handleNavigate("/login")}
              className="text-lg font-bold text-black cursor-pointer"
            >
              Login / Register
            </h2>
          ) : (
            <h2 className="text-lg font-bold text-black">
              Hello, {user.name}
            </h2>
          )}
        </div>

        {/* Grid Menu */}
        <div className="grid grid-cols-3 text-center border-b">
          <MenuItem
            icon={<User />}
            label="My Account"
            onClick={() => handleNavigate("/myaccount")}
          />
          <MenuItem
            icon={<Package />}
            label="My Orders"
            onClick={() => handleNavigate("/myaccount")}
          />
          <MenuItem
            icon={<ShieldCheck />}
            label="Authenticity"
            onClick={() => handleNavigate("/authenticity")}
          />
          <MenuItem
            icon={<Tag />}
            label="Offers"
            onClick={() => handleNavigate("/offer")}
          />
          <MenuItem
            icon={<HeartHandshake />}
            label="Support"
            onClick={() => handleNavigate("/support")}
          />
          <MenuItem
            icon={<Package />}
            label="Products"
            onClick={() => handleNavigate("/")}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex-1 py-3 font-bold text-black ${
              activeTab === "categories"
                ? "border-b-2 border-orange-500"
                : ""
            }`}
          >
            CATEGORIES
          </button>
          <button
            onClick={() => setActiveTab("brands")}
            className={`flex-1 py-3 font-bold text-black ${
              activeTab === "brands"
                ? "border-b-2 border-orange-500"
                : ""
            }`}
          >
            BRANDS
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto h-[65vh]">

          {/* Categories */}
          {activeTab === "categories" && (
            <div className="space-y-3">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigate(`/category/${cat.slug}`)}
                  className="cursor-pointer text-black font-medium hover:text-orange-500 hover:translate-x-1 transition"
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}

          {/* Brands (NO CLICK) */}
          {activeTab === "brands" && (
            <div className="space-y-3">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="text-black font-medium opacity-80 cursor-default"
                >
                  {brand}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="border p-4 flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer text-black font-medium"
  >
    <div className="mb-2">{icon}</div>
    <span className="text-sm">{label}</span>
  </div>
);

export default Sidebar;