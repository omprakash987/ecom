import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SendFranchiseEmail from "../components/SendFranchiseEmail";

/* ─── DATA ─────────────────────────────────────────── */

const whyCards = [
  {
    icon: "🏆",
    title: "Established Brand",
    desc: "MUSCLEUP24X7 is a trusted name with 50,000+ happy customers, strong social presence, and a reputation built on authenticity.",
  },
  {
    icon: "📦",
    title: "Ready Inventory System",
    desc: "Get access to our pre-negotiated supplier network. No minimum order headaches — we handle bulk procurement so you get margins.",
  },
  {
    icon: "📱",
    title: "Full Tech Support",
    desc: "Your own branded storefront, inventory dashboard, and order management system — all set up within 7 days of onboarding.",
  },
  {
    icon: "🎯",
    title: "Marketing Arsenal",
    desc: "Creatives, reels, ad copies, influencer tie-ups — our marketing team keeps the brand top-of-mind so your store stays busy.",
  },
  {
    icon: "📊",
    title: "Training & Onboarding",
    desc: "3-day intensive training covering product knowledge, upselling, customer handling, and digital tools. We don't leave you guessing.",
  },
  {
    icon: "🔒",
    title: "Exclusive Territory",
    desc: "Each franchise gets a protected geographic zone. No internal competition — your area is yours, guaranteed in the agreement.",
  },
];

const plans = [
  {
    name: "Starter",
    tag: "Perfect for beginners",
    investment: "₹5L – ₹6L",
    roi: "6–7 months",
    margin: "20–25%",
    monthlyRevenue: "₹4.5L+",
    color: "#10b981",
    features: [
      "Starter inventory worth ₹3,00,000",
      "Branded shop signage & display",
      "Basic POS billing system",
      "3-day product training",
      "WhatsApp support (6 days/week)",
      "Social media starter kit",
      "5km radius of your area pin code",
    ],
    popular: false,
  },
  {
    name: "Growth",
    tag: "Most popular choice",
    investment: "₹8L – ₹10L",
    roi: "8–10 months",
    margin: "25–30%",
    monthlyRevenue: "₹7.5L+",
    color: "#f5a623",
    features: [
      "Inventory worth ₹6,00,000",
      "Premium store setup & interiors",
      "Full POS + online order system",
      "5-day advanced training",
      "Dedicated relationship manager",
      "Full digital marketing support",
      "Quarterly business review",
      "Access to new launches first",
      "10Km radius of your area pin code",
    ],
    popular: true,
  },
  {
    name: "Elite",
    tag: "Maximum returns",
    investment: "₹12L – ₹15L",
    roi: "9–12 months",
    margin: "30–35%",
    monthlyRevenue: "₹11.5L+",
    color: "#6366f1",
    features: [
      "Inventory worth ₹5,00,000",
      "Premium flagship store setup",
      "Website + app integration",
      "10-day elite training program",
      "Priority support (7 days/week)",
      "Co-branded marketing campaigns",
      "Monthly profit analytics report",
      "Influencer tie-up support",
      "Annual franchise summit invite",
      "15km radius of your area pin code"
    ],
    popular: false,
  },
];

const steps = [
  { num: "01", title: "Submit Inquiry", desc: "Fill the franchise inquiry form with your basic details and preferred city." },
  { num: "02", title: "Discovery Call", desc: "Our franchise team will schedule a 30-minute call to walk you through the opportunity." },
  { num: "03", title: "Site Evaluation", desc: "We visit and evaluate your proposed location for footfall, demographics, and viability." },
  { num: "04", title: "Agreement & Payment", desc: "Sign the franchise agreement and make the initial investment to lock your territory." },
  { num: "05", title: "Setup & Training", desc: "Store setup, inventory delivery, billing system installation, and staff training." },
  { num: "06", title: "Grand Opening", desc: "We support your launch day with marketing, promotions, and social media coverage." },
];

const profits = [
  { label: "Avg. Monthly Revenue", value: "₹4.5L", sub: "Growth plan average" },
  { label: "Gross Margin", value: "30%", sub: "After all costs" },
  { label: "Break-even Period", value: "6-8 Months", sub: "Typical timeline" },
  { label: "Net Monthly Profit", value: "₹1L+", sub: "Post expenses" },
];

const faqs = [
  {
    q: "Do I need prior supplement industry experience?",
    a: "Not at all. Our training program covers everything — from product knowledge to customer handling. Many of our top-performing franchisees came from completely unrelated fields.",
  },
  {
    q: "Is there a royalty or monthly fee?",
    a: "We charge a minimal monthly platform fee of ₹2,000–₹5,000 depending on your plan. No hidden royalty cuts on your sales — your margins are yours to keep.",
  },
  {
    q: "How is territory exclusivity enforced?",
    a: "Each franchise agreement explicitly defines your geographic boundary. We legally cannot open another MUSCLEUP24X7 outlet or appoint another franchisee within your territory.",
  },
  {
    q: "Can I run it alongside my existing business?",
    a: "Absolutely. Many franchisees run supplement stores alongside gyms, pharmacies, or general stores. The model is designed to be manageable with 1–2 staff members.",
  },
  {
    q: "What happens if products don't sell?",
    a: "We offer a partial buy-back on unsold slow-moving inventory within the first 6 months. Our product selection is curated to ensure fast turnover.",
  },
  {
    q: "How soon can I open after signing?",
    a: "Typically 15–25 days. This includes store setup, inventory delivery, POS installation, and the training program completion.",
  },
];

/* ─── SUB-COMPONENTS ────────────────────────────────── */

const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const steps = 60;
    const stepVal = numeric / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepVal;
      if (current >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [start]);
  return count;
};

const ProfitCard = ({ label, value, sub, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-2xl border border-[#f5a623]/20 bg-white/5 backdrop-blur-sm"
      style={{
        animation: visible ? `fadeSlideUp 0.6s ease forwards ${index * 0.15}s` : "none",
        opacity: 0,
      }}
    >
      <p className="text-4xl md:text-5xl font-black text-[#f5a623]"
        style={{ fontFamily: "'Bebas Neue', cursive" }}>
        {value}
      </p>
      <p className="text-white font-bold text-sm mt-1">{label}</p>
      <p className="text-white/40 text-xs mt-0.5">{sub}</p>
    </div>
  );
};

const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-3">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-bold text-[#0a1628] pr-4">{q}</span>
        <span
          className="text-[#f5a623] text-lg font-black flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >+</span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="px-5 py-4 text-sm text-gray-500 leading-relaxed bg-gray-50 border-t border-gray-100">
          {a}
        </p>
      </div>
    </div>
  );
};

/* ─── MAIN PAGE ─────────────────────────────────────── */

const FranchisePage = () => {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", city: "", plan: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="bg-white min-h-screen pt-14">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden min-h-[92vh] flex items-center"
        style={{ background: "linear-gradient(135deg, #020810 0%, #0a1628 50%, #0f2240 100%)" }}
      >
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#f5a623 1px,transparent 1px),linear-gradient(90deg,#f5a623 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Glowing orb */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)", transform: "translate(30%, -50%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-0 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#f5a623] rounded-full animate-pulse" />
              <span className="text-[#f5a623] text-xs font-bold uppercase tracking-[0.2em]">
                Franchise Opportunity 2025
              </span>
            </div>

            <h1 style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em", lineHeight: 1 }}
              className="text-white font-black uppercase mb-6"
              data-text="OWN YOUR SUPPLEMENT EMPIRE"
            >
              <span className="block text-4xl sm:text-6xl md:text-8xl">OWN YOUR</span>
              <span className="block text-4xl sm:text-6xl md:text-8xl text-[#f5a623]">SUPPLEMENT</span>
              <span className="block text-4xl sm:text-6xl md:text-8xl">EMPIRE</span>
            </h1>

            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Join India's fastest-growing supplement franchise network. Low investment, high margins, and a brand that already has 50,000+ loyal customers doing the marketing for you.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#apply"
                className="inline-flex items-center gap-2 bg-[#f5a623] text-black font-black text-sm px-7 py-3.5 rounded-lg uppercase tracking-wider hover:bg-yellow-400 transition-all hover:scale-105 shadow-lg shadow-[#f5a623]/20">
                Apply for Franchise →
              </a>
              <a href="#plans"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-bold text-sm px-7 py-3.5 rounded-lg uppercase tracking-wider hover:bg-white/20 transition border border-white/20">
                View Plans
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-white/10">
              {[
                { n: "50K+", l: "Customers" },
                { n: "₹150K+", l: "Avg Monthly Profit" },
                { n: "6 Month", l: "Break-even" },
                { n: "35%", l: "Max Margins" },
                { n: "10+", l: "Outlets" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-[#f5a623] font-black text-2xl md:text-3xl"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}>{s.n}</p>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wide">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[#f5a623] text-xs font-black uppercase tracking-[0.3em] mb-2">Why Choose Us</p>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
              className="text-4xl md:text-5xl font-black text-[#0a1628] uppercase">
              Everything You Need to Win
            </h2>
            <div className="w-14 h-1 bg-[#f5a623] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyCards.map((c, i) => (
              <div key={c.title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-[#f5a623]/40 hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#0a1628]/5 flex items-center justify-center text-2xl mb-4 group-hover:bg-[#f5a623]/10 transition-colors">
                  {c.icon}
                </div>
                <h3 className="font-black text-[#0a1628] text-base mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROFIT NUMBERS ════════════════════════════ */}
      <section
        className="py-16 md:py-20"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2240 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[#f5a623] text-xs font-black uppercase tracking-[0.3em] mb-2">Real Numbers</p>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
              className="text-4xl md:text-5xl font-black text-white uppercase">
              What's in it for You?
            </h2>
            <div className="w-14 h-1 bg-[#f5a623] mx-auto mt-3 rounded-full" />
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              Based on average performance of our existing franchise partners across Tier-1 and Tier-2 cities in India.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profits.map((p, i) => <ProfitCard key={p.label} {...p} index={i} />)}
          </div>

          {/* Profit breakdown bar */}
        
        </div>
      </section>

      {/* ══ PLANS ═════════════════════════════════════ */}
      <section id="plans" className="py-16 md:py-24 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[#f5a623] text-xs font-black uppercase tracking-[0.3em] mb-2">Investment Plans</p>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
              className="text-4xl md:text-5xl font-black text-[#0a1628] uppercase">
              Choose Your Plan
            </h2>
            <div className="w-14 h-1 bg-[#f5a623] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div key={plan.name}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  plan.popular
                    ? "border-[#f5a623] shadow-xl shadow-[#f5a623]/10"
                    : "border-gray-100 bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#f5a623] text-black text-xs font-black uppercase tracking-wider text-center py-2">
                    ⭐ Most Popular
                  </div>
                )}
                <div className={`p-6 ${plan.popular ? "bg-white" : "bg-white"}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
                        className="text-2xl font-black text-[#0a1628]">{plan.name}</h3>
                      <p className="text-xs text-gray-400 font-medium">{plan.tag}</p>
                    </div>
                    <div className="w-3 h-8 rounded-full" style={{ background: plan.color }} />
                  </div>

                  {/* Investment */}
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Investment</p>
                    <p className="text-3xl font-black text-[#0a1628]"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}>{plan.investment}</p>
                  </div>

                  {/* Key metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "ROI Period", val: plan.roi },
                      { label: "Margin", val: plan.margin },
                      { label: "Monthly Rev.", val: plan.monthlyRevenue },
                    ].map((m) => (
                      <div key={m.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                        <p className="text-xs font-black text-[#0a1628]">{m.val}</p>
                        <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="flex-shrink-0 mt-0.5" style={{ color: plan.color }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="#apply"
                    className="block w-full text-center font-black text-sm py-3 rounded-xl uppercase tracking-wider transition-all hover:opacity-90 hover:scale-[1.02]"
                    style={plan.popular
                      ? { background: "#f5a623", color: "#000" }
                      : { background: "#0a1628", color: "#fff" }
                    }
                  >
                    Apply for {plan.name} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS STEPS ════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[#f5a623] text-xs font-black uppercase tracking-[0.3em] mb-2">How It Works</p>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
              className="text-4xl md:text-5xl font-black text-[#0a1628] uppercase">
              From Inquiry to Opening Day
            </h2>
            <div className="w-14 h-1 bg-[#f5a623] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num}
                className="relative p-6 rounded-2xl border border-gray-100 hover:border-[#f5a623]/30 hover:shadow-lg transition-all group bg-white">
                <span
                  className="block font-black mb-3"
                  style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "3.5rem", lineHeight: 1, color: "#f5a623", opacity: 0.15 }}
                >
                  {step.num}
                </span>
                <h3 className="font-black text-[#0a1628] text-base mb-2 -mt-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#f5a623]/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#f7f8fa]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[#f5a623] text-xs font-black uppercase tracking-[0.3em] mb-2">Got Questions?</p>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
              className="text-4xl md:text-5xl font-black text-[#0a1628] uppercase">
              Frequently Asked
            </h2>
            <div className="w-14 h-1 bg-[#f5a623] mx-auto mt-3 rounded-full" />
          </div>

          <div>
            {faqs.map((faq, i) => <FAQItem key={i} {...faq} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ APPLICATION FORM ══════════════════════════ */}
      <section id="apply"
        className="py-16 md:py-24"
        style={{ background: "linear-gradient(135deg, #020810 0%, #0a1628 60%, #0f2240 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-[#f5a623] text-xs font-black uppercase tracking-[0.3em] mb-2">Take the First Step</p>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
              className="text-4xl md:text-5xl font-black text-white uppercase">
              Apply for Franchise
            </h2>
            <div className="w-14 h-1 bg-[#f5a623] mx-auto mt-3 rounded-full" />
            <p className="text-white/40 text-sm mt-4">Our franchise team will contact you within 24 hours of submission.</p>
          </div>

          <SendFranchiseEmail/>
        </div>
      </section>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default FranchisePage;