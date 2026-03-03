import React, { useState } from "react";
import { useUserStore } from "../store/useUserstore";

import {
  X,
  User,
  Package,
  ShieldCheck,
  Tag,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const {user} = useUserStore(); 
  const [activeTab, setActiveTab] = useState("categories");
  const [openCategory, setOpenCategory] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const categories = [
    "Performance Nutrition",
    "Vitamins And Supplements",
    "Health Food And Drinks",
    "Workout Gear",
    "Nutrabay Top 10",
    "Bestseller",
    "Magazine",
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
      {!user && (
  <h2
    onClick={() => handleNavigate("/login")}
    className="text-lg font-bold text-black cursor-pointer"
  >
    Login / Register
  </h2>
)}

{user && (
  <h2 className="text-lg font-bold text-black">
    Hello, {user.name}
  </h2>
)}

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

        {/* Category List */}
        <div className="p-4 space-y-4 overflow-y-auto h-[60vh]">
          {activeTab === "categories" &&
            categories.map((cat, index) => (
              <div key={index}>
                <div
                  onClick={() =>
                    setOpenCategory(openCategory === index ? null : index)
                  }
                  className="flex justify-between items-center cursor-pointer text-black font-medium"
                >
                  {cat}
                  <ChevronDown size={16} />
                </div>

                {openCategory === index && (
                  <div className="ml-4 mt-2 text-sm text-black space-y-1">
                    <p>Subcategory 1</p>
                    <p>Subcategory 2</p>
                    <p>Subcategory 3</p>
                  </div>
                )}
              </div>
            ))}

          {activeTab === "brands" && (
            <div className="space-y-2 text-black font-medium">
              <p>Optimum Nutrition</p>
              <p>MuscleBlaze</p>
              <p>MyProtein</p>
              <p>GNC</p>
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