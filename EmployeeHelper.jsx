// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// export const columns = [
//   {
//     name: "S No",
//     selector: (row) => row.sno,
//   },
//   {
//     name: "Name",
//     selector: (row) => row.name,
//   },
//   {
//     name: "Image",
//     selector: (row) => row.profileImage,
//   },
//   {
//     name: "Department",
//     selector: (row) => row.dep_name,
//   },
// ];

// export const fetchDepartments = async () => {
//   const token = localStorage.getItem("token");
//   console.log("Token from localStorage:", token);

//   try {
//     const response = await axios.get("http://localhost:5000/api/department", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("API response data:", response.data); // Full response data
//     if (response.data.success && Array.isArray(response.data.departments)) {
//       console.log(
//         "Departments fetched successfully:",
//         response.data.departments
//       );
//       return response.data.departments;
//     } else {
//       console.warn("No departments found or success is false");
//       return [];
//     }
//   } catch (error) {
//     console.error("API error:", error);
//     if (error.response) {
//       console.error("Response error:", error.response.data);
//       alert(`Error fetching departments: ${error.response.data.error}`);
//     }
//     return [];
//   }
// };
// export const EmployeeButtons = ({ DepId }) => {
//   // Using DepId here
//   const navigate = useNavigate();
//   return (
//     <div className="flex space-x-3">
//       <button
//         className="px-3 py-1 bg-teal-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/employee/${DepId}`)}
//       >
//         View
//       </button>

//       <button
//         className="px-3 py-1 bg-red-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/department/delete/${DepId}`)}
//       >
//         Delete
//       </button>
//       <button
//         className="px-3 py-1 bg-red-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/department/delete/${DepId}`)}
//       >
//         Leave
//       </button>
//     </div>
//   );
// };

import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define columns for Employee Table
export const columns = [
  {
    name: "S No",
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.User.name,
    sortable: true,
  },
  {
    name: "Profile Image",
    cell: (row) => (
      <img
        src={`http://localhost:5000/uploads/${row.User.profileImage}`}
        alt="Profile"
        width="50"
        height="50"
        style={{ borderRadius: "50%" }}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    name: "Department",
    selector: (row) => row.Department.dep_name,
    sortable: true,
  },
];

// Fetch Departments from API
export const fetchDepartments = async () => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);

  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API response data:", response.data); // Full response data
    if (response.data.success && Array.isArray(response.data.departments)) {
      console.log(
        "Departments fetched successfully:",
        response.data.departments
      );
      return response.data.departments;
    } else {
      console.warn("No departments found or success is false");
      return [];
    }
  } catch (error) {
    console.error("API error:", error);
    if (error.response) {
      console.error("Response error:", error.response.data);
      alert(`Error fetching departments: ${error.response.data.error}`);
    }
    return [];
  }
};

// Employee Action Buttons for CRUD operations
export const EmployeeButtons = ({ employeeId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-yellow-600 text-white"
        onClick={() =>
          navigate(`/admin-dashboard/employee/leave/${employeeId}`)
        }
      >
        Leave
      </button>
    </div>
  );
};
