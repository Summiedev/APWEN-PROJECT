import { useState, useEffect } from "react";

import Navbar from "../components/NavBar";
import html2canvas from "html2canvas";
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
    if (!formData.additionalDetails) newErrors.additionalDetails = "Additional details are required";
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
          setIsSubmitted(true); // ✅ Move this inside then
        })
        .catch((error) => console.error("Error:", error));
    }
  };
  

 

  return (
    <>
    <div className="min-h-screen jakarta-font flex flex-col bg-white">
      <Navbar />


      {!isSubmitted ? (
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
            color: 'blue',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 1.5rem',
          }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>
            Based on your inputs, here are the top 3 materials recommended for your project.
          </h2>
      
          <div style={{ width: '100%', maxWidth: '1200px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                textAlign: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                fontSize: '1.25rem',
                marginBottom: '1rem',
              }}
            >
              <div>Material</div>
              <div>Strength</div>
              <div>Cost/Unit</div>
              <div>Bridge Type</div>
              <div>Sustainability</div>
            </div>
      
            {recommendations.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  textAlign: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <div style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px solid blue' }}>
                  {item.name}
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px solid blue' }}>
                  {item.strength}
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px solid blue' }}>
                  ₦{item.cost}
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px solid blue' }}>
                  {item["bridge Type"]}
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px solid blue' }}>
                  ♻️ {item.sustainability}/10
                </div>
              </div>
            ))}
          </div>
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
