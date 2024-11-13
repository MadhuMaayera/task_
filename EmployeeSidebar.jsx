import React from "react";
import { FaBuilding, FaCalendarAlt, FaTachometerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const EmployeeSidebar = () => {
  return (
    <div className="bg-purple-600 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-blue-900 h-12 flex items-center justify-center">
        <h3 className="text-1xl text-center font-sans">
          {" "}
          Employee Leave Mangament
        </h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            }flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            }flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/leave-calender"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            }flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span>Leave Calender</span>
        </NavLink>
      </div>
    </div>
  );
};
export default EmployeeSidebar;
