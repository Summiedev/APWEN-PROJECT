import { useState, useEffect } from "react";
import { UserCircle } from "lucide-react"; // For avatar icon
import { FaCloudUploadAlt } from "react-icons/fa"; // For upload history icon
import Navbar from "../components/NavBar";

export default function ProjectPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // for showing user info later (optional)

  const [formData, setFormData] = useState({
    loadBearing: "",
    indoor: false,
    marine: false,
    outdoor: false,
    budgetRange: "",
    construction: false,
    research: false,
    prototyping: false,
    consumerProduct: false,
    other: false,
    additionalDetails: "",
  });

  const [errors, setErrors] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  // 🧠 Check if the user is logged in (session exists)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/user", {
      method: "GET",
      credentials: "include", // VERY IMPORTANT! Sends cookies to Flask
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Not logged in");
      })
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setUserData(null);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.loadBearing) newErrors.loadBearing = "Load-Bearing Requirement is required";
    if (!formData.budgetRange) newErrors.budgetRange = "Budget Range is required";
    if (!formData.additionalDetails) newErrors.additionalDetails = "Additional details are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => setRecommendations(data.recommendations || []))
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/login"; // Redirect to Flask Google login
  };

  const handleLogout = () => {
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setIsLoggedIn(false);
        setUserData(null);
      })
      .catch((err) => console.error("Logout failed", err));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex flex-col items-center p-8">
        <div className="flex justify-end w-full max-w-6xl mb-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <UserCircle className="text-blue-600" size={32} />
              <div className="text-sm">
                <p className="font-semibold">{userData?.name}</p>
                <p className="text-gray-500">{userData?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
            >
              Login with Google
            </button>
          )}
        </div>

        <div className="bg-white text-black rounded-xl shadow p-8 w-full max-w-3xl space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Tell us about your project
          </h2>

          {/* 📝 Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <select
                  name="loadBearing"
                  value={formData.loadBearing}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                >
                  <option value="">Select Load-Bearing Requirement</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.loadBearing && (
                  <p className="text-red-500 text-sm">{errors.loadBearing}</p>
                )}
              </div>

              {/* Environmental Exposure */}
              <div className="flex gap-4">
                {["indoor", "marine", "outdoor"].map((exposure) => (
                  <label key={exposure} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={exposure}
                      checked={formData[exposure]}
                      onChange={handleChange}
                    />
                    {exposure.charAt(0).toUpperCase() + exposure.slice(1)}
                  </label>
                ))}
              </div>

              <div>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                >
                  <option value="">Select Budget Range</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.budgetRange && (
                  <p className="text-red-500 text-sm">{errors.budgetRange}</p>
                )}
              </div>

              {/* Intended Use */}
              <div className="flex gap-4 flex-wrap">
                {["construction", "research", "prototyping", "consumerProduct", "other"].map((use) => (
                  <label key={use} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={use}
                      checked={formData[use]}
                      onChange={handleChange}
                    />
                    {use.charAt(0).toUpperCase() + use.slice(1)}
                  </label>
                ))}
              </div>

              {/* Additional Details */}
              <div>
                <textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                  placeholder="Enter additional details..."
                  rows={4}
                ></textarea>
                {errors.additionalDetails && (
                  <p className="text-red-500 text-sm">{errors.additionalDetails}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-lg w-full hover:bg-blue-700 transition"
              >
                Get Recommendations
              </button>
            </div>
          </form>
        </div>

        {/* 🛠 Recommendation Table */}
        {recommendations.length > 0 && (
          <div className="mt-8 w-full overflow-x-auto">
            <h3 className="text-lg font-semibold mb-2">Recommended Materials</h3>
            <table className="min-w-full table-auto border border-gray-300 rounded-lg text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">#</th>
                  <th className="px-4 py-2 border-b text-left">Material</th>
                  <th className="px-4 py-2 border-b text-left">Strength</th>
                  <th className="px-4 py-2 border-b text-left">Cost</th>
                  <th className="px-4 py-2 border-b text-left">Weight</th>
                  <th className="px-4 py-2 border-b text-left">Sustainability</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{item.material}</td>
                    <td className="px-4 py-2 border-b">{item.strength}</td>
                    <td className="px-4 py-2 border-b">{item.cost}</td>
                    <td className="px-4 py-2 border-b">{item.weight}</td>
                    <td className="px-4 py-2 border-b">{item.sustainability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 📁 Upload History */}
        {isLoggedIn && (
          <div className="bg-white rounded-xl shadow p-8 w-full max-w-5xl mt-12">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaCloudUploadAlt className="text-blue-500" />
              Upload History
            </h3>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3">File Name</th>
                  <th className="p-3">Date Uploaded</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">project-details.pdf</td>
                  <td className="p-3">April 24, 2025</td>
                  <td className="p-3 text-green-600 font-semibold">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="bg-blue shadow mt-12 p-6 text-center text-gray-600">
        &copy; 2025 SmartMaterial. All rights reserved.
      </footer>
    </div>
  );
}
