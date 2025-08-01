import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await API.post("/auth/reset-password", {
        email: form.email,
        newPassword: form.newPassword,
      });
      alert("Password reset successfully. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-16">
      <div className="bg-gray-800 max-w-md w-full rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-8 text-center tracking-wide">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              minLength={6}
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 pr-12 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
              minLength={6}
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-cyan-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            aria-busy={loading}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
