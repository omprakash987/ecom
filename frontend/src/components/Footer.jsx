import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">
              MUSCLE-UP
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium supplements crafted to fuel your performance and help you achieve your fitness goals.
            </p>

            {/* Social */}
            <div className="flex space-x-4 mt-6">
              <Facebook className="w-5 h-5 text-black hover:text-gray-600 cursor-pointer" />
              <Link to="https://instagram.com/muscleup24x7?igsh=MWsxb3Vjankwdmo1Mg==">
              <Instagram className="w-5 h-5 text-black hover:text-gray-600 cursor-pointer" />
              </Link>
              <Twitter className="w-5 h-5 text-black hover:text-gray-600 cursor-pointer" />
              <Youtube className="w-5 h-5 text-black hover:text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link to="/" className="hover:text-black">Home</Link></li>
              <li><Link to="/offer" className="hover:text-black">Offers</Link></li>
              <li><Link to="/support" className="hover:text-black">Support</Link></li>
              <li><Link to="/authenticity" className="hover:text-black">Authenticity</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">
              My Account
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link to="/myaccount" className="hover:text-black">My Profile</Link></li>
              <li><Link to="/myaccount" className="hover:text-black">My Orders</Link></li>
              <li><Link to="/cart" className="hover:text-black">Cart</Link></li>
              <li><Link to="/login" className="hover:text-black">Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">
              Categories
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link to="/category/whey" className="hover:text-black">Whey Protein</Link></li>
              <li><Link to="/category/protein" className="hover:text-black">Mass Gainer</Link></li>
              <li><Link to="/category/creatine" className="hover:text-black">Creatine</Link></li>
              <li><Link to="/category/preworkout" className="hover:text-black">Pre Workout</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>Email: muscleup24x7@gmail.com</li>
              <li>Phone: +91 8595742156</li>
              <li>Mon - Sat: 9:00 AM - 6:00 PM</li>
              <li>New Delhi, India</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MUSCLE-UP. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;