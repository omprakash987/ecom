import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="bg-[#0a1628] text-white mt-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="logo.jpeg" alt="muscleup" className="h-10 w-10 rounded-lg object-cover border-2 border-[#f5a623]/50" />
              <span
                className="text-xl font-black text-white uppercase tracking-widest"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                Muscle-Up
              </span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-5">
              Premium supplements crafted to fuel your performance and help you achieve your fitness goals.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={15} />, href: "#" },
                { icon: <Instagram size={15} />, href: "https://instagram.com/muscleup24x7?igsh=MWsxb3Vjankwdmo1Mg==" },
                { icon: <Twitter size={15} />, href: "#" },
                { icon: <Youtube size={15} />, href: "#" },
              ].map((s, i) => (
                <Link
                  key={i}
                  to={s.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#f5a623] hover:text-black transition-all duration-200"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f5a623] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Offers", to: "/offer" },
                { label: "Support", to: "/support" },
                { label: "Authenticity", to: "/authenticity" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-white/50 text-xs hover:text-[#f5a623] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#f5a623] transition-all duration-200 inline-block" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f5a623] mb-4">
              My Account
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "My Profile", to: "/myaccount" },
                { label: "My Orders", to: "/myaccount" },
                { label: "My Cart", to: "/cart" },
                { label: "Login / Sign Up", to: "/login" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-white/50 text-xs hover:text-[#f5a623] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#f5a623] transition-all duration-200 inline-block" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f5a623] mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Whey Protein", to: "/category/whey" },
                { label: "Creatine", to: "/category/creatine" },
                { label: "Pre Workout", to: "/category/preworkout" },
                { label: "Fish Oil", to: "/category/FishOil" },
                { label: "BCAA", to: "/category/BCAA" },
                { label: "Multivitamin", to: "/category/Multivitamin" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-white/50 text-xs hover:text-[#f5a623] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#f5a623] transition-all duration-200 inline-block" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f5a623] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              {[
                { icon: <Mail size={12} />, text: "muscleup24x7@gmail.com" },
                { icon: <Phone size={12} />, text: "+91 8595742156" },
                { icon: <Clock size={12} />, text: "Mon–Sat: 9 AM – 6 PM" },
                { icon: <MapPin size={12} />, text: "New Delhi, India" },
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-white/50 text-xs">
                  <span className="text-[#f5a623] mt-0.5 flex-shrink-0">{c.icon}</span>
                  {c.text}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {["✅ 100% Authentic", "🚚 Fast Delivery", "📦 Secure Packaging", "💳 Safe Payments"].map((t) => (
            <span key={t} className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">{t}</span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-[10px]">
            © {new Date().getFullYear()} MUSCLEUP24x7. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Use", "Refund Policy"].map((p) => (
              <Link key={p} to="#" className="text-white/30 text-[10px] hover:text-white/60 transition">
                {p}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;