import { useState } from "react";

const SendFranchiseEmail = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    plan: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://www.muscleup24x7.com/api/email/sendEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }

      setSuccess("Franchise application submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        plan: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
        />

        <input
          name="city"
          placeholder="Your City"
          required
          value={formData.city}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
        />
      </div>

      <select
        name="plan"
        required
        value={formData.plan}
        onChange={handleChange}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white [&>option]:text-black [&>option]:bg-white"
      >
        <option value="">Select Plan</option>
        <option value="Starter">Starter – ₹1.5L to ₹2.5L</option>
        <option value="Growth">Growth – ₹3L to ₹5L</option>
        <option value="Elite">Elite – ₹7L to ₹12L</option>
      </select>

      <textarea
        name="message"
        rows={4}
        placeholder="Tell us about your background..."
        value={formData.message}
        onChange={handleChange}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      {success && (
        <p className="text-green-500 text-sm">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f5a623] text-black font-black py-4 rounded-xl hover:bg-yellow-400 transition"
      >
        {loading ? "Submitting..." : "Submit Franchise Application →"}
      </button>
    </form>
  );
};

export default SendFranchiseEmail;