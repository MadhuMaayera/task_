import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import LeaveRequest from "./components/LeaveRequest";
import LeaveApproval from "./components/LeaveApproval";
import LeaveCalendar from "./components/LeaveCalender";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leave-request" element={<LeaveRequest />} />
        <Route path="/leave-approval" element={<LeaveApproval />} />
        <Route path="/leave-calendar" element={<LeaveCalendar />} />{" "}
        <Route path="*" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
