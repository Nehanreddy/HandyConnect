import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Eye, EyeOff } from "lucide-react";

const WorkerSignup = () => {
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
    aadhaar: "",
    serviceType: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [aadhaarCard, setAadhaarCard] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePhoto || !aadhaarCard) {
      alert("Please upload both profile photo and Aadhaar card");
      return;
    }

    if (!form.serviceType) {
      alert("Please select your service type");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    formData.append("profile", profilePhoto);
    formData.append("aadhaarCard", aadhaarCard);

    setLoading(true);

    try {
      await API.post("/worker/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Worker signup successful!");
      navigate("/worker");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white max-w-xl w-full rounded-lg shadow-lg p-10 border border-gray-200">
        <h2 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Join as a Worker
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6"
          encType="multipart/form-data"
          noValidate
        >
          {/* Full Name */}
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-700"
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
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="name"
            />
          </div>

          {/* Aadhaar Number */}
          <div className="col-span-2">
            <label
              htmlFor="aadhaar"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Aadhaar Number<span className="text-red-500">*</span>
            </label>
            <input
              id="aadhaar"
              name="aadhaar"
              type="text"
              value={form.aadhaar}
              onChange={handleChange}
              placeholder="1234 5678 9012"
              required
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              inputMode="numeric"
              pattern="\d{12}"
              title="Enter 12 digit Aadhaar number"
            />
          </div>

          {/* Phone */}
          <div className="col-span-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-semibold text-gray-700"
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
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              pattern="^[0-9+\-\s]{7,15}$"
              title="Enter a valid phone number"
              autoComplete="tel"
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
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
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-700"
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
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[2.65rem] text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-semibold text-gray-700"
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
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[2.65rem] text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Main St"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="street-address"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="address-level2"
            />
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              State
            </label>
            <input
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="address-level1"
            />
          </div>

          {/* Pincode */}
          <div className="col-span-2">
            <label
              htmlFor="pincode"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Pincode
            </label>
            <input
              id="pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="postal-code"
            />
          </div>

          {/* Service Type */}
          <div className="col-span-2">
            <label
              htmlFor="serviceType"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Service Type<span className="text-red-500">*</span>
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="" disabled>
                Select Service Type
              </option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Painter">Painter</option>
              <option value="Appliance Repair">Appliance Repair</option>
            </select>
          </div>

          {/* Profile Photo */}
          <div className="col-span-2">
            <label
              htmlFor="profilePhoto"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Profile Photo<span className="text-red-500">*</span>
            </label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              required
              aria-describedby="profilePhotoHelp"
            />
            <small id="profilePhotoHelp" className="text-gray-500">
              Upload a clear profile photo.
            </small>
          </div>

          {/* Aadhaar Card */}
          <div className="col-span-2">
            <label
              htmlFor="aadhaarCard"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Aadhaar Card<span className="text-red-500">*</span>
            </label>
            <input
              id="aadhaarCard"
              type="file"
              accept="image/*"
              onChange={(e) => setAadhaarCard(e.target.files[0])}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              required
              aria-describedby="aadhaarCardHelp"
            />
            <small id="aadhaarCardHelp" className="text-gray-500">
              Upload scanned copy of your Aadhaar card.
            </small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 py-3 rounded-lg font-semibold text-white shadow-md transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <div className="col-span-2 text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/worker-login')}
                className="text-blue-600 hover:text-blue-700 font-medium underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerSignup;
