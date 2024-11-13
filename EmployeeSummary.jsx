import React from "react";
import EmployeeSummaryCard from "./EmployeeSummaryCard";
const EmployeeSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-pacific">Employee Dashboard</h3>
      <EmployeeSummaryCard />
    </div>
  );
};

export default EmployeeSummary;
