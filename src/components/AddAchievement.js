import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddAchievement.css";
import { BASE_URL, USER_EMAIL } from "../config.js";

const AddAchievement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: `${USER_EMAIL}`,
    fromDate: "",
    toDate: "",
    description: "",
    category: "",
    evidences: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEvidenceChange = (index, value) => {
    const updatedEvidences = [...formData.evidences];
    updatedEvidences[index] = value;
    setFormData({ ...formData, evidences: updatedEvidences });
  };

  const addEvidenceField = () => {
    setFormData({ ...formData, evidences: [...formData.evidences, ""] });
  };

  const removeEvidenceField = (index) => {
    const updatedEvidences = formData.evidences.filter((_, i) => i !== index);
    setFormData({ ...formData, evidences: updatedEvidences });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/achievement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Achievement added successfully!");
        navigate(`/achievements/${USER_EMAIL}`);
      } else {
        alert("Error adding achievement");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend");
    }
  };

  return (
    <div className="add-achievement-container">
      <h2 className="add-achievement-title">Add Achievement</h2>
      <form onSubmit={handleSubmit} className="add-achievement-form">
        <label>
          From Date:
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="input-field"
            required
          />
        </label>

        <label>
          To Date:
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="input-field"
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
            required
          />
        </label>

        <label>
          Evidences:
          {formData.evidences.map((evidence, index) => (
            <div key={index} className="evidence-field">
              <input
                type="text"
                value={evidence}
                onChange={(e) => handleEvidenceChange(index, e.target.value)}
                className="input-field"
              />
              <button
                type="button"
                onClick={() => removeEvidenceField(index)}
                className="remove-evidence-btn"
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={addEvidenceField} className="add-evidence-btn">
            + Add Evidence
          </button>
        </label>

        <div className="form-buttons">
          <button type="button" onClick={() => navigate("/achievements")} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAchievement;
