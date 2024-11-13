import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { EmployeeButtons } from "../../utils/EmployeeHelper";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          setEmployees(response.data.employees);
        } else {
          throw new Error("Failed to fetch employees");
        }
      } catch (error) {
        setError(error.message || "Error loading employees");
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (error) {
    return <div className="p-5 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <DataTable
        columns={[
          { name: "S.No", selector: (row, i) => i + 1 },
          { name: "Name", selector: (row) => row.User.name, sortable: true },
          { name: "Email", selector: (row) => row.User.email },
          { name: "Department", selector: (row) => row.Department.dep_name },
          {
            name: "Actions",
            selector: (row) => <EmployeeButtons employeeId={row.id} />,
          },
        ]}
        data={employees}
        progressPending={empLoading}
        pagination
      />
      <Link
        to="/admin-dashboard/add-employee"
        className="px-4 py-1 bg-teal-600 rounded text-white"
      >
        Add Employee
      </Link>
    </div>
  );
};

export default EmployeeList;
