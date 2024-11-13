import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment({
            dep_name: response.data.department.dep_name,
            description: response.data.department.description,
          });
        }
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSuccessMessage("Department deleted successfully!");
        setTimeout(() => {
          setSuccessMessage(""); // Clear the message after a while
          navigate("/admin-dashboard/department"); // Redirect to the department list
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Delete Department</h2>
      {successMessage && (
        <div className="p-4 mb-4 bg-green-200 text-green-800 border border-green-300 rounded">
          {successMessage}
        </div>
      )}
      <div>
        <p>
          <strong>Department Name:</strong> {department.dep_name}
        </p>
        <p>
          <strong>Description:</strong> {department.description}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Department
      </button>
    </div>
  );
};

export default DeleteDepartment;
