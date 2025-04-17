import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddAchievement.css";
import { BASE_URL, USER_EMAIL } from "../config.js";

const AddAchievement = ({ editData, onClose, refreshAchievements }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    if (editData) {
      console.log("Initial editData.toDate:", editData?.toDate);
      return {
        achievementId: editData.achievementId,
        fromDate: editData.fromDate || "",
        toDate: editData.toDate || "",
        description: editData.description || "",
        category: editData.category || "",
        evidences: editData.evidences && editData.evidences.length > 0 ? editData.evidences : [""],
      };
    } else {
      return {
        email: `${USER_EMAIL}`, // only used for add
        fromDate: "",
        toDate: "",
        description: "",
        category: "",
        evidences: [""],
      };
    }
  });
  
  
  useEffect(() => {
    console.log("Modal render check");
  }, []);
  

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
      const url = `${BASE_URL}/achievement`;
      const method = editData ? "PATCH" : "POST";
      console.log("Submitting formData:", formData);

  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert(`Achievement ${editData ? "updated" : "added"} successfully!`);
        if (refreshAchievements) refreshAchievements(); 
        if (onClose) onClose();
        navigate(`/achievements/${USER_EMAIL}`);
      } else {
        alert("Error saving achievement");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend");
    }
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="add-achievement-title">{editData ? "Edit Achievement" : "Add Achievement"}</h2>  
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
        <button
            type="button"
            onClick={() => {
              if (onClose) {
                onClose(); // Close modal in edit/add mode
              } else {
                navigate(`/achievements/${USER_EMAIL}`); // fallback
              }
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Save
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddAchievement;
