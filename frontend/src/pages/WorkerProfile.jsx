import { useState, useEffect } from "react";
import API from "../services/api";
import { useWorkerAuth } from "../context/WorkerAuthContext";
import { Pen } from "lucide-react";
import WorkerNavbar from "../components/Workernavbar"; // 🆕 ADD THIS

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
        console.log("✅ Profile loaded:", res.data); // 🆕 ADD: Debug log
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
      const res = await API.put("/worker/profile", form, {
        headers: {
          Authorization: `Bearer ${worker?.token}`,
        },
      });
      console.log("✅ Profile updated:", res.data); // 🆕 ADD: Debug log
      alert("✅ Worker profile updated successfully!");
      setEditingField(null);
    } catch (err) {
      console.error("❌ Update error:", err);
      alert(err.response?.data?.msg || "Worker profile update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div>
        <WorkerNavbar /> {/* 🆕 ADD: Navigation */}
        <div className="text-center py-20 text-gray-700 pt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          Loading profile...
        </div>
      </div>
    );
  }

  const renderField = (fieldName, label, fullWidth = false, type = "text", editable = true) => {
    const isEditing = editingField === fieldName;

    return (
      <div className="space-y-2"> {/* 🔄 UPDATED: Better spacing */}
        <label className="block text-sm font-medium text-gray-700">{label}</label> {/* 🆕 ADD: Label */}
        <div className={`${fullWidth ? "col-span-2" : ""} flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm`}>
          {isEditing && editable ? (
            <input
              type={type}
              name={fieldName}
              value={form[fieldName] || ""} 
              onChange={handleChange}
              className="flex-grow border-none outline-none bg-transparent text-gray-800"
              aria-label={label}
              autoFocus
            />
          ) : (
            <p className="flex-grow text-gray-700">
              {form[fieldName] || <i className="text-gray-400">Not set</i>}
            </p>
          )}
          {editable && (
            <button
              type="button"
              onClick={() => setEditingField(isEditing ? null : fieldName)}
              className="ml-2 text-blue-600 hover:text-blue-800 transition"
              aria-label={`Edit ${label}`}
            >
              <Pen size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <WorkerNavbar /> 
      <div className="min-h-screen bg-gray-50 pt-24"> 
        <div className="max-w-4xl mx-auto p-8"> 
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Worker Profile</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
              <div className="md:col-span-2">{renderField("name", "Full Name", true)}</div>
              <div className="md:col-span-2">{renderField("phone", "Phone Number", true, "tel")}</div>
              <div className="md:col-span-2">{renderField("email", "Email Address", true, "email")}</div>
              <div className="md:col-span-2">{renderField("address", "Address", true)}</div>
              {renderField("city", "City")}
              {renderField("state", "State")}
              {renderField("pincode", "Pincode")}
              <div className="md:col-span-2">{renderField("aadhaar", "Aadhaar Number", true, "text", false)}</div>

              {/* 🆕 ADD: Service Type Display (read-only) */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Service Type</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm bg-gray-50">
                  <p className="flex-grow text-gray-700 font-medium">
                    {worker?.serviceType || <i className="text-gray-400">Not set</i>}
                  </p>
                  <span className="text-xs text-gray-500">Cannot be changed</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={updating || editingField === null}
                className={`md:col-span-2 py-3 text-lg font-medium rounded-xl transition ${
                  updating || editingField === null
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                }`}
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>
            </form>

            {/* 🆕 ADD: Profile completion indicator */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Profile Status</h3>
              <div className="flex items-center space-x-2">
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${Object.values(form).filter(value => value && value.trim() !== '').length / Object.keys(form).length * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-blue-700 font-medium">
                  {Math.round(Object.values(form).filter(value => value && value.trim() !== '').length / Object.keys(form).length * 100)}%
                </span>
              </div>
              <p className="text-xs text-blue-600 mt-1">Complete your profile to get more service requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
