import React, { useEffect, useState } from "react";
import "../css/Reports.css"; // Import CSS
import { BASE_URL } from "../config.js";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const userEmail = "john.doe@example.com"; // Replace with logged-in user's email

  useEffect(() => {
    fetch(`${BASE_URL}/reports/${userEmail}`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className="reports-container">
      <h2>Your Reports</h2>
      <ul>
        {reports.map((report, index) => (
          <li key={index} className="report-item">
            <strong>File Path:</strong> {report.filePath} <br />
            <strong>Requested Date:</strong> {report.requestedDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
