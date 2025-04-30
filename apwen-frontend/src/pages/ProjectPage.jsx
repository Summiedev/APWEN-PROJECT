import { useState, useEffect } from "react";

import Navbar from "../components/NavBar";
import html2canvas from "html2canvas";
import Loader from "../components/Loader";
import jsPDF from "jspdf";

const ProjectPage=()=> {


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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleExportPDF = () => {
    const input = document.getElementById("pdf-content"); 
  
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("material_recommendations.pdf");
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.loadBearing) newErrors.loadBearing = "Load-Bearing Requirement is required";
    if (!formData.budgetRange) newErrors.budgetRange = "Budget Range is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleStartOver = () => {
    setIsSubmitted(false);
    setFormData({
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
    setRecommendations([]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true); // Show loader
      fetch(`${import.meta.env.VITE_API_URL}/api/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setRecommendations(data.recommendations || []);
          setIsSubmitted(true);
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => setLoading(false)); // Hide loader
    }
  };
  

 

  return (
    <>
    <div className="min-h-screen jakarta-font flex flex-col bg-white">
      <Navbar />


      {loading ? (
  <Loader />
) : !isSubmitted ? (
        // Show Form
        <main className="flex-1 flex flex-col items-center p-8">


          <div className="bg-gray-50 text-black rounded-xl shadow-md pt-2 pb-6 pr-8 pl-8 w-full max-w-xl space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Tell us about your project
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <select
                    name="loadBearing"
                    value={formData.loadBearing}
                    onChange={handleChange}
                    className="border rounded-lg mb-4 p-3 w-full"
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
                        onChange={handleChange} />
                      {exposure.charAt(0).toUpperCase() + exposure.slice(1)}
                    </label>
                  ))}
                </div>

                <div>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="border rounded-lg mb-4 p-3 w-full"
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
                  {["construction", "research", "prototyping", "consumer Product", "other"].map((use) => (
                    <label key={use} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={use}
                        checked={formData[use]}
                        onChange={handleChange} />
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
                  className="bg-blue-600 mb-6 text-white py-3 rounded-lg w-full hover:bg-blue-700 transition"
                >
                  Get Recommendations
                </button>
              </div>
            </form>
          </div>
        </main>
      ) : (
        // Show Results
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* The part to export */}
        <main
  id="pdf-content"
  style={{
    backgroundColor: '#f9fafb',
    fontFamily: 'Segoe UI, Tahoma, sans-serif',
    padding: '2rem',
    margin: '0 auto',
    maxWidth: '1200px',
    boxSizing: 'border-box',
  }}
>
  <style>
    {`
      @media (max-width: 768px) {
        .grid-header, .grid-row {
          grid-template-columns: 1fr !important;
          text-align: left !important;
        }

        .grid-header > div,
        .grid-row > div {
          padding: 0.75rem 0 !important;
          border-bottom: 2px solid #ccc !important;
        }

        .grid-row {
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      }
    `}
  </style>

  <h2
    style={{
      fontSize: '2.5rem',
      fontWeight: '700',
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '2.5rem',
    }}
  >
    Top 3 Material Recommendations for Your Project
  </h2>

  {/* Table Header */}
  <div
    className="grid-header"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      backgroundColor: '#e3eaf6',
      padding: '1.25rem',
      fontWeight: '700',
      fontSize: '1.25rem',
      color: '#34495e',
      borderTopLeftRadius: '0.5rem',
      borderTopRightRadius: '0.5rem',
      textAlign: 'center',
      border: '2px solid #3b82f6',
    }}
  >
    <div>Material</div>
    <div>Strength</div>
    <div>Cost/Unit</div>
    <div>Bridge Type</div>
    <div>Sustainability</div>
  </div>

  {/* Table Rows */}
  {recommendations.map((item, index) => (
    <div
      key={index}
      className="grid-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        backgroundColor: '#ffffff',
        padding: '1.25rem',
        fontSize: '1.125rem',
        color: '#2f3640',
        textAlign: 'center',
        border: '2px solid #3b82f6',
        borderTop: 'none',
      }}
    >
      <div>{item.name}</div>
      <div>{item.strength}</div>
      <div>₦{item.cost}</div>
      <div>{item["bridge Type"]}</div>
      <div>♻️ {item.sustainability}/10</div>
    </div>
  ))}
</main>


      
        {/* The buttons are outside and visible */}
        <div className="flex gap-6 mt-12">
          <button
            onClick={handleStartOver}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50"
          >
            Start Over
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Export as PDF
          </button>
        </div>
      </div>
      
     
      )}

      {/* 🛠 Recommendation Table */}
      

      
    <footer className="bg-blue shadow mt-12 p-6 text-center text-gray-600">
        &copy; 2025 SmartMaterial. All rights reserved.
      </footer>
    </div>
    </>
  );
}
export default ProjectPage;
