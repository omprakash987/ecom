import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const stats = [
  { value: "100%", label: "Authentic Products" },
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Premium Products" },
  { value: "4.9★", label: "Average Rating" },
];

const features = [
  {
    icon: "🛡️",
    title: "100% Pure & Authentic",
    desc: "Every product is lab-tested and sourced directly from certified brands. Zero adulteration, zero compromise.",
  },
  {
    icon: "⚡",
    title: "Instant Mixability",
    desc: "Ultra-fine micro-filtered powder that dissolves completely — no lumps, no residue, just smooth perfection.",
  },
  {
    icon: "🔬",
    title: "Clinically Dosed",
    desc: "Every scoop delivers exactly what's on the label. No prop blends, no hidden fillers — just real results.",
  },
  {
    icon: "🏆",
    title: "Trusted by Athletes",
    desc: "Chosen by 50,000+ fitness enthusiasts, bodybuilders and professional athletes across India.",
  },
];

const PromoSection = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section
      className="py-14 md:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0f2240 50%, #0a1628 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: VIDEO ── */}
          <div className="relative group order-2 lg:order-1">
            {/* Glow behind video */}
            <div className="absolute -inset-3 bg-[#f5a623]/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="relative rounded-2xl overflow-hidden border-2 border-[#f5a623]/30 shadow-2xl">
              <video
                ref={videoRef}
                src="/reel.MP4"
                className="w-full aspect-[9/16] md:aspect-video lg:aspect-[9/16] object-cover"
                loop
                muted
                playsInline
                poster="/reel.jpeg"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

              {/* Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-full bg-[#f5a623] flex items-center justify-center shadow-lg hover:bg-yellow-400 hover:scale-110 transition-all duration-200"
                >
                  {playing
                    ? <Pause size={18} className="text-black" />
                    : <Play size={18} className="text-black translate-x-0.5" />
                  }
                </button>

                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition"
                >
                  {muted
                    ? <VolumeX size={14} className="text-white" />
                    : <Volume2 size={14} className="text-white" />
                  }
                </button>
              </div>

              {/* Brand watermark */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-white font-black text-lg uppercase tracking-widest opacity-80"
                  style={{ fontFamily: "'Bebas Neue', cursive", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  Muscleup24x7
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: COPY ── */}
          <div className="order-1 lg:order-2">

            {/* Eyebrow */}
            <p className="text-[#f5a623] text-xs font-black uppercase tracking-[0.3em] mb-3">
              Our Promise to You
            </p>

            {/* Headline */}
            <h2
              className="text-white font-black uppercase leading-none mb-2"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                letterSpacing: "0.04em",
                lineHeight: 1.05,
              }}
            >
              Built for
              <span className="block text-[#f5a623]">Champions.</span>
              Made for
              <span className="block text-[#f5a623]">Everyone.</span>
            </h2>

            <p className="text-white/50 text-sm leading-relaxed mt-4 mb-8 max-w-md">
              We don't just sell supplements — we fuel transformations. Every product in our lineup is crafted to deliver real, measurable results, backed by science and trusted by thousands across India.
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-8">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl bg-[#f5a623]/10 border border-[#f5a623]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f5a623]/20 transition-colors">
                    <span className="text-lg">{f.icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{f.title}</p>
                    <p className="text-white/40 text-xs leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 pt-6 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-[#f5a623] font-black leading-none"
                    style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-white/40 text-[9px] md:text-[10px] font-semibold uppercase tracking-wide mt-0.5 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoSection;