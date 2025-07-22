import { useState, useEffect } from "react";
import API from "../services/api";
import { useWorkerAuth } from "../context/WorkerAuthContext";
import { Pen } from "lucide-react";

const WorkerProfile = () => {
  const { worker } = useWorkerAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    aadhaar: ""
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!worker?.token) {
        console.warn("⚠️ No token available");
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/worker/profile", {
          headers: {
            Authorization: `Bearer ${worker.token}`,
          },
        });
        setForm(res.data);
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
        alert("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [worker]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await API.put("/worker/profile", form, {
        headers: {
          Authorization: `Bearer ${worker?.token}`,
        },
      });
      alert("✅ Worker profile updated successfully!");
      setEditingField(null);
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.msg || "Worker profile update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  const renderField = (fieldName, label, fullWidth = false, type = "text", editable = true) => {
    const isEditing = editingField === fieldName;

    return (
      <div className={`${fullWidth ? "col-span-2" : ""} flex items-center border rounded p-2`}>
        {isEditing && editable ? (
          <input
            type={type}
            name={fieldName}
            value={form[fieldName]}
            onChange={handleChange}
            className="flex-grow border-none outline-none"
            aria-label={label}
            autoFocus
          />
        ) : (
          <p className="flex-grow select-text text-gray-800">{form[fieldName] || <i className="text-gray-400">Not set</i>}</p>
        )}
        {editable && (
          <button
            type="button"
            onClick={() => setEditingField(isEditing ? null : fieldName)}
            className="ml-2 text-blue-600 hover:text-blue-800"
            aria-label={`Edit ${label}`}
          >
            <Pen size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Worker Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {renderField("name", "Full Name", true)}
        {renderField("phone", "Phone", true, "tel")}
        {renderField("email", "Email", true, "email")}
        {renderField("address", "Address", true)}
        {renderField("city", "City")}
        {renderField("state", "State")}
        {renderField("pincode", "Pincode")}
        {renderField("aadhaar", "Aadhaar Number", true, "text", false)}

        <button
          type="submit"
          disabled={updating || editingField === null}
          className={`col-span-2 py-2 rounded text-white ${
            updating || editingField === null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default WorkerProfile;
