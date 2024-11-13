import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const EmployeeSummaryCard = () => {
  const { User } = useAuth();

  return (
    <div className="p-6">
      <div className="flex items-center bg-purple-400 rounded-lg shadow-lg p-6">
        {/* Icon beside the Welcome Back text */}
        <div className="text-4xl flex justify-center items-center bg-blue-900 text-white p-4 rounded-full shadow-md">
          <FaUser />
        </div>

        {/* Text for Welcome Back and the user's name */}
        <div className="pl-6">
          <p className="text-lg text-blue-900">Welcome Back</p>
          <p className="text-2xl font-bold text-gray-800">{User?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummaryCard;
