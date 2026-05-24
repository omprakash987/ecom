import React from "react";

const reviews = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    product: "ON Whey Protein",
    rating: 5,
    review: "Absolutely love this protein! Mixes perfectly, no clumps, and the chocolate flavour is incredible. Gained 4kg of lean muscle in just 2 months. 100% genuine product, fast delivery too!",
    avatar: "RS",
    color: "#f5a623",
    verified: true,
    date: "2 days ago",
  },
  {
    name: "Priya Mehta",
    location: "Mumbai",
    product: "Creatine Monohydrate",
    rating: 5,
    review: "Best creatine I've ever used. My gym performance skyrocketed within the first week. Strength gains are real and no water retention issues. Will definitely reorder!",
    avatar: "PM",
    color: "#10b981",
    verified: true,
    date: "5 days ago",
  },
  {
    name: "Arjun Kapoor",
    location: "Bangalore",
    product: "Pre Workout Extreme",
    rating: 4,
    review: "Insane energy boost! Hit a new PR on bench press after starting this. The pump is crazy and focus is on another level. Slight tingling but that's the beta-alanine doing its job.",
    avatar: "AK",
    color: "#6366f1",
    verified: true,
    date: "1 week ago",
  },
  {
    name: "Sneha Joshi",
    location: "Pune",
    product: "Omega-3 Fish Oil",
    rating: 5,
    review: "My joints feel so much better after 3 weeks of use. No fishy burps at all! Skin has improved too. This is now a permanent part of my supplement stack. Highly recommend!",
    avatar: "SJ",
    color: "#ec4899",
    verified: true,
    date: "1 week ago",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    product: "BCAA 2:1:1",
    rating: 5,
    review: "Recovery time has dropped significantly. Earlier DOMS would last 3 days, now it's gone in 24 hours. Watermelon flavour is super refreshing during workouts. Worth every rupee!",
    avatar: "VS",
    color: "#f43f5e",
    verified: true,
    date: "2 weeks ago",
  },
  {
    name: "Anjali Rao",
    location: "Hyderabad",
    product: "Multivitamin Daily",
    rating: 5,
    review: "Energy levels throughout the day are so much better. No afternoon crash at work anymore. Hair fall has also reduced noticeably. The packaging is top-notch and product is 100% authentic!",
    avatar: "AR",
    color: "#0ea5e9",
    verified: true,
    date: "2 weeks ago",
  },
  {
    name: "Rohan Gupta",
    location: "Kolkata",
    product: "EAA + Hydration",
    rating: 4,
    review: "Great amino profile and the electrolytes keep me hydrated during long sessions. Taste is amazing — Blue Raspberry is my favourite. Packaging is solid, no leakage in transit.",
    avatar: "RG",
    color: "#8b5cf6",
    verified: true,
    date: "3 weeks ago",
  },
  {
    name: "Kavya Nair",
    location: "Chennai",
    product: "ON Whey Protein",
    rating: 5,
    review: "As a female athlete, I was looking for a clean protein without artificial sweeteners. This is perfect — light on the stomach, great amino profile, and vanilla flavour doesn't get boring!",
    avatar: "KN",
    color: "#f59e0b",
    verified: true,
    date: "1 month ago",
  },
  {
    name: "Amit Verma",
    location: "Lucknow",
    product: "Creatine Monohydrate",
    rating: 5,
    review: "I was sceptical at first but the results speak for themselves. Strength is up, volume is up, and recovery is faster. Ordering my 3rd tub now. Best creatine at this price point in India!",
    avatar: "AV",
    color: "#14b8a6",
    verified: true,
    date: "1 month ago",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        className={`w-3 h-3 ${s <= rating ? "text-[#f5a623] fill-[#f5a623]" : "text-gray-200 fill-gray-200"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div
    className="flex-shrink-0 w-72 md:w-80 bg-white rounded-xl border border-gray-100 p-4 shadow-sm mx-2 select-none"
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    {/* Top: avatar + name */}
    <div className="flex items-center gap-3 mb-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
        style={{ background: review.color }}
      >
        {review.avatar}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-bold text-[#0a1628] truncate">{review.name}</p>
          {review.verified && (
            <span className="flex-shrink-0 bg-green-50 text-green-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-green-100 uppercase tracking-wide">
              ✓ Verified
            </span>
          )}
        </div>
        <p className="text-[10px] text-gray-400">{review.location} · {review.date}</p>
      </div>
    </div>

    {/* Product tag */}
    <div className="inline-flex items-center gap-1 bg-[#0a1628]/5 rounded-md px-2 py-1 mb-2.5">
      <span className="text-[10px] font-bold text-[#0a1628] uppercase tracking-wide">🛒 {review.product}</span>
    </div>

    {/* Stars */}
    <div className="flex items-center gap-1.5 mb-2">
      <StarRating rating={review.rating} />
      <span className="text-xs font-bold text-[#0a1628]">{review.rating}.0</span>
    </div>

    {/* Review text */}
    <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{review.review}</p>

    {/* Bottom amber accent */}
    <div className="mt-3 h-[2px] w-8 bg-[#f5a623] rounded-full" />
  </div>
);

const ReviewsMarquee = () => {
  // Duplicate for seamless infinite loop
  const doubled = [...reviews, ...reviews];

  return (
    <section
      className="py-10 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f7f8fa 0%, #ffffff 100%)" }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5a623] font-bold mb-0.5">
              What Our Customers Say
            </p>
            <h2
              className="text-xl md:text-2xl font-black text-[#0a1628] uppercase"
              style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
            >
              Real Reviews · Real Results
            </h2>
            <div className="w-10 h-[3px] bg-[#f5a623] mt-1 rounded-full" />
          </div>
          {/* Aggregate rating */}
          <div className="text-right hidden sm:block">
            <p className="text-3xl font-black text-[#0a1628]">4.9<span className="text-base text-gray-400">/5</span></p>
            <StarRating rating={5} />
            <p className="text-[10px] text-gray-400 mt-0.5">Based on 2,400+ reviews</p>
          </div>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f7f8fa] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling row */}
        <div className="flex marquee-track">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* Inline keyframe animation */}
      <style>{`
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default ReviewsMarquee;