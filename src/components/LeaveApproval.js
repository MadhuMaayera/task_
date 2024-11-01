import React, { useEffect, useState } from "react";
const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/leave/pending",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch leave requests");
        }
        const data = await response.json();
        setLeaveRequests(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApproval = async (id, status) => {
    const managerComment = prompt("Enter comment for this request:");
    if (managerComment !== null) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/leave/approve/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ status, manager_comment: managerComment }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update leave request");
        }

        const updatedRequests = leaveRequests.filter(
          (request) => request.id !== id
        );
        setLeaveRequests(updatedRequests);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h2>Leave Approval Requests</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {leaveRequests.map((request) => (
          <li key={request.id}>
            <p>
              <strong>User ID:</strong> {request.user_id}
            </p>
            <p>
              <strong>Leave Type:</strong> {request.leave_type}
            </p>
            <p>
              <strong>Start Date:</strong> {request.start_date}
            </p>
            <p>
              <strong>End Date:</strong> {request.end_date}
            </p>
            <p>
              <strong>Reason:</strong> {request.reason}
            </p>
            <p>
              <strong>Status:</strong> {request.status}
            </p>
            <button onClick={() => handleApproval(request.id, "approved")}>
              Approve
            </button>
            <button onClick={() => handleApproval(request.id, "rejected")}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveApproval;
