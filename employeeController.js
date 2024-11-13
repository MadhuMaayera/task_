// // import bcrypt from "bcrypt";
// // import multer from "multer";
// // import path from "path";
// // import User from "../models/User.js";
// // const storage = multer.diskStorage({
// //   designation: (req, file, cb) => {
// //     cb(null, "public/uploads");
// //   },

// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// // const upload = multer({ storage: storage });

// // const addEmployee = async (re, res) => {
// //   try {
// //     const {
// //       name,
// //       email,
// //       employeeId,
// //       dob,
// //       gender,
// //       maritalStatus,
// //       designation,
// //       department,
// //       salary,
// //       password,
// //       role,
// //     } = req.body;

// //     const user = await User.findOne({ email });
// //     if (user) {
// //       return res
// //         .status(400)
// //         .json({ success: false, error: "User already Registered in Emp" });
// //     }
// //     const hashPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashPassword,
// //       role,
// //       profileImage: req.file ? req.filename : "",
// //     });
// //     await newUser.save();

// //     const newEmployee = new employeeId({
// //       userId: savedUser.id,

// //       employeeId,
// //       dob,
// //       gender,
// //       maritalStatus,
// //       designation,
// //       department,
// //       salary,
// //     });
// //     await newEmployee.save();
// //     return res.status(200).json({ success: true, message: "employee created" });
// //   } catch (error) {
// //     return res
// //       .status(500)
// //       .json({ success: false, error: "server error in adding employee" });
// //   }
// // };

// // export { addEmployee, upload };

// import bcrypt from "bcrypt";
// import multer from "multer";
// import path from "path";
// import Department from "../models/Department.js";
// import Employee from "../models/Employee.js";
// import User from "../models/User.js";

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Set unique filename
//   },
// });

// const upload = multer({ storage: storage });

// const addEmployee = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       employeeId,
//       dob,
//       gender,
//       maritalStatus,
//       designation,
//       department,
//       salary,
//       password,
//       role,
//     } = req.body;

//     // Check if the user already exists
//     const user = await User.findOne({ where: { email } });
//     if (user) {
//       return res
//         .status(400)
//         .json({ success: false, error: "User already registered" });
//     }

//     // Hash the password before saving
//     const hashPassword = await bcrypt.hash(password, 10);

//     // Create a new user with the uploaded profile image, if available
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashPassword,
//       role,
//       profileImage: req.file ? req.file.filename : "", // Handle uploaded file
//     });

//     // Create a new employee record
//     const newEmployee = await Employee.create({
//       userId: newUser.id,
//       employeeId,
//       dob,
//       gender,
//       maritalStatus,
//       designation,
//       departmentId: department, // Assuming department is passed as ID
//       salary,
//     });

//     return res
//       .status(200)
//       .json({ success: true, message: "Employee created successfully" });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Server error while adding employee" });
//   }
// };

// // const getEmployee = async (req, res) => {
// //   try {
// //     // Use findAll instead of find for Sequelize
// //     const employee = await Employee.findAll();
// //     return res.status(200).json({ success: true, employee });
// //   } catch (error) {
// //     return res
// //       .status(500)
// //       .json({ success: false, error: "get employee server error" });
// //   }
// // };

// const getEmployee = async (req, res) => {
//   try {
//     // Use include to load associated models
//     const employees = await Employee.findAll({
//       include: [
//         {
//           model: User,
//           as: "User", // Ensure this matches the alias if used in associations
//           attributes: ["name", "email", "profileImage"], // Adjust based on fields needed
//         },
//         {
//           model: Department,
//           as: "Department", // Ensure this matches the alias if used in associations
//           attributes: ["dep_name"], // Adjust based on fields needed
//         },
//       ],
//     });

//     return res.status(200).json({ success: true, employees });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "get employee server error" });
//   }
// };

// export { addEmployee, getEmployee, upload };

import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set unique filename
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered" });
    }

    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user with the uploaded profile image, if available
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    // Create a new employee record
    const newEmployee = await Employee.create({
      userId: newUser.id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      departmentId: department, // Assuming department is passed as ID
      salary,
    });

    return res
      .status(200)
      .json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error while adding employee" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: User,
          as: "User",
          attributes: ["name", "email", "profileImage"],
        },
        {
          model: Department,
          as: "Department",
          attributes: ["dep_name"],
        },
      ],
    });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Error fetching employees" });
  }
};

export { addEmployee, getEmployee, upload };
