import React from "react";
import { Link } from "react-router-dom";
const LeaveList = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Manage Leaves</h3>
      <div className="flex justify-between items-center">
        <Link
          to="/employee-dashboard/add-leaves"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add Leaves
        </Link>
      </div>
    </div>
  );
};

export default LeaveList;
