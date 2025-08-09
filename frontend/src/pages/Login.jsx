import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      login({
        ...res.data.user,
        token: res.data.token,
      });

      navigate(`/home/${res.data.user.name}`);
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center px-4 py-16">
      <div className="bg-gray-900 max-w-md w-full rounded-2xl shadow-xl p-10 border border-purple-700">
        <h2 className="text-4xl font-extrabold text-purple-400 mb-8 text-center tracking-wide">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-3 text-gray-200 placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-3 pr-12 text-gray-200 placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Enter your password"
              aria-describedby="togglePassword"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[2.65rem] text-gray-400 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
              id="togglePassword"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-sm font-medium text-purple-400 hover:text-purple-300 focus:outline-none focus:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-purple-400 hover:text-purple-300 font-semibold focus:outline-none focus:underline"
            >
              Sign up
            </button>
          </p>

          <p className="text-center text-gray-500 my-4">or</p>

          <button
            type="button"
            onClick={() => navigate("/worker")}
            className="w-full border border-purple-600 text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-700 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Work with us?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
