import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeaveRequest.css"; // Include your CSS file

const LeaveRequest = () => {
  const [leaveData, setLeaveData] = useState({
    user_id: 7, // Replace with actual user ID if necessary
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (
  //     !leaveData.leave_type ||
  //     !leaveData.start_date ||
  //     !leaveData.end_date ||
  //     !leaveData.reason
  //   ) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:3001/api/leave/submit", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
  //       },
  //       body: JSON.stringify(leaveData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error || "Leave request submission failed");
  //     }

  //     const data = await response.json();
  //     setSuccess("Leave request submitted successfully!");
  //     console.log(data);
  //     // Optionally redirect or clear the form here
  //     navigate("/dashboard"); // Redirect to dashboard or another page after success
  //   } catch (err) {
  //     setError(err.message);
  //     console.error(err);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !leaveData.leave_type ||
      !leaveData.start_date ||
      !leaveData.end_date ||
      !leaveData.reason
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/leave/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(leaveData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Leave request submission failed");
      }

      const data = await response.json();
      setSuccess("Leave request submitted successfully!");
      console.log(data);
      // Redirect to LeaveCalendar page after successful submission
      navigate("/leave-calendar");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="leave-request-container">
      <h2>Leave Request Submission</h2>
      <form onSubmit={handleSubmit} className="leave-request-form">
        <div>
          <label>Leave Type:</label>
          <select
            name="leave_type"
            value={leaveData.leave_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick Leave">Sick Leave</option>
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={leaveData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={leaveData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={leaveData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Leave Request</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default LeaveRequest;
