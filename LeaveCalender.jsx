import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./LeaveCalender.css";

const LeaveCalendar = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leaves", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLeaveRequests(response.data.leaveRequests);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaves();
  }, []);

  // Highlight dates on the calendar based on leave start and end dates
  //   const tileContent = ({ date, view }) => {
  //     if (view === "month") {
  //       const leaveOnDate = leaveRequests.find(
  //         (leave) =>
  //           new Date(leave.startDate) <= date && date <= new Date(leave.endDate)
  //       );
  //       return leaveOnDate ? (
  //         <div className="bg-red-200 rounded-full p-1">Leave</div>
  //       ) : null;
  //     }
  //   };
  // Customize calendar tile content to highlight leave dates and display leave ID
  const tileContent = ({ date, view }) => {
    // Only apply this for month view to highlight individual days
    if (view === "month") {
      // Find a leave entry for the specific date
      const leaveOnDate = leaveRequests.find(
        (leave) =>
          new Date(leave.startDate) <= date && date <= new Date(leave.endDate)
      );

      // If there's a leave for this date, show the ID and 'Leave' marker
      return leaveOnDate ? (
        <div className="bg-red-200 text-xs rounded px-1 py-3 text-center">
          Leave #{leaveOnDate.id}
        </div>
      ) : null;
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Employee Leave Calendar</h3>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent} // Customize date tiles to show leave dates
      />
    </div>
  );
};

export default LeaveCalendar;
