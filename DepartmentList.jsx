// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { Link } from "react-router-dom";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";

// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([]); // Default to an empty array
//   const [depLoading, setDepLoading] = useState(false);
//   const [error, setError] = useState(null); // State for error handling

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setDepLoading(true);
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/department",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (response.data.success) {
//           const data = response.data.departments.map((dep, index) => ({
//             _id: dep._id,
//             sno: index + 1,
//             dep_name: dep.dep_name,
//             action: <DepartmentButtons Id={dep._id} />,
//           }));
//           setDepartments(data);
//         } else {
//           throw new Error("Failed to fetch departments");
//         }
//       } catch (error) {
//         setError(
//           error.message || "An error occurred while loading departments"
//         );
//       } finally {
//         setDepLoading(false);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   if (error) {
//     return <div className="p-5 text-center text-red-600">{error}</div>;
//   }

//   return (
//     <>
//       {depLoading ? (
//         <div className="p-5 text-center">Loading...</div>
//       ) : (
//         <div className="p-5">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center my-4">
//             <input
//               type="text"
//               placeholder="Search by Department Name"
//               className="px-4 py-0.5 border"
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add new department
//             </Link>
//           </div>
//           <div>
//             <DataTable columns={columns} data={departments} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DepartmentList;

import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep.id, // Mapping the id properly
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons DepId={dep.id} />, // Passing DepId here
          }));
          setDepartments(data);
        } else {
          throw new Error("Failed to fetch departments");
        }
      } catch (error) {
        setError(
          error.message || "An error occurred while loading departments"
        );
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  if (error) {
    return <div className="p-5 text-center text-red-600">{error}</div>;
  }

  return (
    <>
      {depLoading ? (
        <div className="p-5 text-center">Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center my-4">
            <input
              type="text"
              placeholder="Search by Department Name"
              className="px-4 py-0.5 border"
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add new department
            </Link>
          </div>
          <div>
            <DataTable columns={columns} data={departments} />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
