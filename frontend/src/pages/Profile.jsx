import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { Pen } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        setForm({
          name: res.data.name || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          address: res.data.address || "",
          city: res.data.city || "",
          state: res.data.state || "",
          pincode: res.data.pincode || ""
        });
      } catch (err) {
        alert("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await API.put("/auth/profile", form, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      alert("Profile updated successfully!");
      setEditingField(null);
    } catch (err) {
      alert(err.response?.data?.msg || "Profile update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-700">
        Loading profile...
      </div>
    );
  }

  const renderField = (fieldName, label, fullWidth = false, type = "text") => {
    const isEditing = editingField === fieldName;
    return (
      <div className={`${fullWidth ? "col-span-2" : ""} flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm`}>
        {isEditing ? (
          <input
            type={type}
            name={fieldName}
            value={form[fieldName]}
            onChange={handleChange}
            className="flex-grow border-none outline-none bg-transparent text-gray-800"
            autoFocus
          />
        ) : (
          <p className="flex-grow text-gray-700">
            {form[fieldName] || <i className="text-gray-400">Not set</i>}
          </p>
        )}
        <button
          type="button"
          onClick={() => setEditingField(isEditing ? null : fieldName)}
          className="ml-2 text-blue-600 hover:text-blue-800"
          aria-label={isEditing ? `Cancel edit ${label}` : `Edit ${label}`}
        >
          <Pen size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-8 border rounded-2xl shadow-lg bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {renderField("name", "Full Name", true)}
        {renderField("phone", "Phone", true, "tel")}
        {renderField("email", "Email", true, "email")}
        {renderField("address", "Address", true)}
        {renderField("city", "City")}
        {renderField("state", "State")}
        {renderField("pincode", "Pincode", true)}

        <button
          type="submit"
          disabled={updating || editingField === null}
          className={`col-span-2 py-3 text-lg font-medium rounded-xl transition ${
            updating || editingField === null
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
