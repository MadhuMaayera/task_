import React from "react";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center text-white justify-between h-12 bg-purple-500 px-5">
      <p> Welcome {user.name} </p>
      <button
        className="px-4 py-1 bg-purple-700 hover:bg-purple-400 border-2 border-black rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
