// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

//             if (response.data.success) {
//                 // Call login function with the user data
//                 login(response.data.user);
//                 console.log(response.data.user);
//                 // Store the token in local storage
//                 localStorage.setItem("token", response.data.token);

//                 // Navigate based on user role
//                 if (response.data.user.role === "admin") {
//                     navigate('/admin-dashboard');
//                 } else {
//                     navigate('/employee-dashboard');
//                 }
//             }
//         } catch (error) {
//             if (error.response && !error.response.data.success) {
//                 setError(error.response.data.error);
//             } else {
//                 setError("An unexpected error occurred");
//             }
//         }
//     };

//     return (
//         <div
//             className="flex flex-col items-center h-screen justify-center space-y-6"
//             style={{
//                 backgroundImage: 'url("https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg")',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center'
//             }}
//         >
//             <h2 className="font-pacific text-3xl text-white">Employee Leave Management System</h2>

//             <div className="flex flex-col items-center p-6 w-80 bg-white bg-opacity-50 rounded-lg space-y-4">
//                 <h2 className="text-2xl font-semibold mb-4">Login</h2>
//                 {error && <p className="text-red-500">{error}</p>}

//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             placeholder="Enter Email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="password" className="block text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             placeholder="******"
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="mb-4 flex items-center justify-between">
//                         <div className="inline-flex items-center">
//                             <input type="checkbox" className="form-checkbox" id="remember-me" />
//                             <span className="ml-2 text-gray-700">Remember me</span>
//                         </div>
//                         <a href="#" className="text-sm text-gray-600 hover:text-gray-900 ml-4">Forgot Password?</a>
//                     </div>

//                     <div className="mb-4">
//                         <button
//                             type="submit"
//                             className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null); // Clear previous error

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        login(response.data.user); // Log in user
        localStorage.setItem("token", response.data.token); // Save token

        // Navigate based on role
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleForgotPassword = () => {
    window.location.href = "/reset password";
  };
  return (
    <div
      className="flex flex-col items-center h-screen justify-center space-y-6"
      style={{
        backgroundImage:
          'url("https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="font-pacific text-3xl text-white">
        Employee Leave Management System
      </h2>

      <div className="flex flex-col items-center p-6 w-80 bg-white bg-opacity-50 rounded-lg space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <button onClick={() => handleForgotPassword()}>
          Forgot Password ?
        </button>
      </div>
    </div>
  );
};

export default Login;
