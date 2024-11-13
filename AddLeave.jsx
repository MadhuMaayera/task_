import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const [leaves, setLeaves] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaves((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/leaves/add`, // Endpoint for adding leave
        leaves, // Send only the leave details (no employeeId needed)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
          },
        }
      );

      if (response.data.success) {
        navigate("/employee-dashboard/leaves"); // Redirect on success
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/845962030/photo/green-leaf-frame-isolate-on-white-background.jpg?s=612x612&w=0&k=20&c=9QOPnr7ChsOPAs9hJjrv7c1cD8C4oTlQKPRzTtF87W4=')",
      }}
    >
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Request For Leave
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Leave Type
              </label>
              <select
                name="leaveType"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Vacation Leave">Vacation Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reason
              </label>
              <textarea
                name="reason"
                placeholder="Reason for leave"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-200 ease-in-out"
              >
                Submit Leave Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
