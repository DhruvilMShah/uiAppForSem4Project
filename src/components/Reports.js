import React, { useEffect, useState } from "react";
import "../css/Reports.css"; // Import CSS
import { BASE_URL } from "../config.js";

const Reports = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem('token');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/reports/${loggedInUser}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className="reports-container">
      <h2>Your Reports</h2>
      <ul>
        {reports.map((report, index) => {
          // Extract filename from filePath
          var fileName = ""
          if(report.status === "SUCCESSFUL") {
            fileName = report.filePath.split("/").pop();
          }
          else {
            fileName = "";
          }
          
  
          return (
            <li key={index} className="report-item">
              <strong>Requested Date:</strong> {report.requestedDate} &nbsp;&nbsp;&nbsp;
              <strong>Status:</strong> {report.status} <br />
              <strong>File Path:</strong> 
              <a href={report.filePath} target="_blank" rel="noopener noreferrer">
                {fileName} {/* Show only the filename instead of full path */}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
  
};

export default Reports;
