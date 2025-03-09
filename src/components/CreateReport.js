import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreateReport.css"; // Import CSS
import { BASE_URL, USER_EMAIL } from "../config.js";

const CreateReport = () => {
  const [reportData, setReportData] = useState({
    format: "ECDF",
    fromDate: "",
    toDate: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/report/${USER_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (response.status === 202) {
        alert("Request is accepted. Report will be created in Your Reports section in sometime.");
        navigate("/"); // Redirect to home
      } else {
        alert("Failed to create report.");
      }
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="create-report-container">
      <h2>Create Report</h2>
      <form onSubmit={handleSubmit}>
        <label>Format:</label>
        <select className="report-dropdown" value="ECDF" disabled>
          <option value="ECDF">ECDF</option>
        </select>

        <label>From Date:</label>
        <input
          type="date"
          name="fromDate"
          className="report-dropdown"
          value={reportData.fromDate}
          onChange={(e) => setReportData({ ...reportData, fromDate: e.target.value })}
          required
        />

        <label>To Date:</label>
        <input
          type="date"
          name="toDate"
          className="report-dropdown"
          value={reportData.toDate}
          onChange={(e) => setReportData({ ...reportData, toDate: e.target.value })}
          required
        />

        <div className="button-group">
          <button type="submit" className="report-btn">Create</button>
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;
