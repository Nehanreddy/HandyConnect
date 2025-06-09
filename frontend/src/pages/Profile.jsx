import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { Pen } from "lucide-react"; // pen icon

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

  // Track which field is being edited, null means none
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
      setEditingField(null); // close edit after update
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

  // Helper to render each field with editable toggle
  const renderField = (fieldName, label, fullWidth = false, type = "text") => {
    const isEditing = editingField === fieldName;
    return (
      <div className={`${fullWidth ? "col-span-2" : ""} flex items-center border rounded p-2`}>
        {isEditing ? (
          <input
            type={type}
            name={fieldName}
            value={form[fieldName]}
            onChange={handleChange}
            className="flex-grow border-none outline-none"
            autoFocus
          />
        ) : (
          <p className="flex-grow select-text">{form[fieldName] || <i className="text-gray-400">Not set</i>}</p>
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
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
          className={`col-span-2 py-2 rounded text-white ${
            updating || editingField === null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
