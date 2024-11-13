// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import AdminSummary from "./components/dashboard/AdminSummary";
// import EmployeeSummary from "./components/dashboard/EmployeeSummary";
// import AddDepartment from "./components/department/AddDepartment";
// import DeleteDepartment from "./components/department/DeleteDepartment";
// import DepartmentList from "./components/department/DepartmentList";
// import EditDepartment from "./components/department/EditDepartment";
// import AddEmployee from "./components/employee/AddEmployee";
// import EmployeeList from "./components/employee/EmployeeList";
// import AddLeave from "./components/leaves/AddLeave";
// import LeaveList from "./components/leaves/LeaveList";
// import AdminDashboard from "./pages/AdminDashboard";
// import Login from "./pages/Login";
// import PrivateRoutes from "./utils/PrivateRoutes";
// import RoleBaseRoutes from "./utils/RoleBaseRoutes";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Redirect to admin-dashboard if no path is specified */}
//         <Route path="/" element={<Navigate to="/admin-dashboard" />} />
//         {/* Login Route */}
//         <Route path="/login" element={<Login />} />
//         {/* Admin Dashboard Routes */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <PrivateRoutes>
//               <RoleBaseRoutes requiredRole={["admin"]}>
//                 <AdminDashboard />
//               </RoleBaseRoutes>
//             </PrivateRoutes>
//           }
//         >
//           <Route index element={<AdminSummary />} />
//           <Route path="department" element={<DepartmentList />} />
//           <Route path="add-department" element={<AddDepartment />} />
//           <Route path="department/:id" element={<EditDepartment />} />
//           <Route path="department/delete/:id" element={<DeleteDepartment />} />

//           <Route path="/admin-dashboard/employee" element={<EmployeeList />} />
//           <Route
//             path="/admin-dashboard/add-employee"
//             element={<AddEmployee />}
//           />
//         </Route>
//         Employee Dashboard Routes
//         <Route
//           path="/employee-dashboard"
//           element={
//             <PrivateRoutes>
//               <RoleBaseRoutes requiredRole={["employee"]}>
//                 <EmployeeDashboard />
//               </RoleBaseRoutes>
//             </PrivateRoutes>
//           }
//         >
//           <Route index element={<EmployeeSummary />}></Route>
//           <Route path="/employee-dashboard/leaves" element={<LeaveList />} />
//           <Route path="/employee-dashboard/add-leaves" element={<AddLeave />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminSummary from "./components/dashboard/AdminSummary";
import EmployeeSummary from "./components/dashboard/EmployeeSummary";
import AddDepartment from "./components/department/AddDepartment";
import DeleteDepartment from "./components/department/DeleteDepartment";
import DepartmentList from "./components/department/DepartmentList";
import EditDepartment from "./components/department/EditDepartment";
import AddEmployee from "./components/employee/AddEmployee";
import EmployeeList from "./components/employee/EmployeeList";
import AddLeave from "./components/leaves/AddLeave";
import LeaveCalendar from "./components/leaves/LeaveCalender";
import LeaveList from "./components/leaves/LeaveList";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to admin-dashboard if no path is specified */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="department" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="department/delete/:id" element={<DeleteDepartment />} />
          <Route path="employee" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
        </Route>

        {/* Employee Dashboard Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummary />} />
          <Route path="leaves" element={<LeaveList />} />
          <Route path="add-leaves" element={<AddLeave />} />
          <Route path="leave-calender" element={<LeaveCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
