// src/components/LeaveCalendar.js
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

function LeaveCalendar() {
  const [leaveEvents, setLeaveEvents] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/api/leave/calendar",
          {
            params: { startDate: "2019-01-01", endDate: "2024-12-30" },
          }
        );

        // Map the data to match the FullCalendar event structure
        const events = data.map((leave) => ({
          title: `Employee ${leave.user_id} on leave`,
          start: leave.start_date,
          end: leave.end_date,
          color: "green", // Green color for approved leaves
        }));

        setLeaveEvents(events);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={leaveEvents}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek",
      }}
    />
  );
}

export default LeaveCalendar;
