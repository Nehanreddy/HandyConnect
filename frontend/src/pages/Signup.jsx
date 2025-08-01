import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-16">
      <div className="bg-gray-800 max-w-xl w-full rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-8 text-center tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6" noValidate>
          {/* Full Name */}
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Phone Number */}
          <div className="col-span-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              required
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
              pattern="^[0-9+\-\s]{7,15}$"
              title="Enter a valid phone number"
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              minLength={6}
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 pr-10 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[2.65rem] text-gray-400 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              minLength={6}
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 pr-10 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[2.65rem] text-gray-400 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Main St"
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              State
            </label>
            <input
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Pincode */}
          <div className="col-span-2">
            <label
              htmlFor="pincode"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Pincode
            </label>
            <input
              id="pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 py-3 rounded-xl font-semibold text-white shadow-md transition ${
              loading
                ? "bg-cyan-400 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            }`}
          >
            {loading ? "Creating Account..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
