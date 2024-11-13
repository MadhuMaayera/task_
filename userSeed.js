import bcrypt from "bcrypt";
import { connectToDatabase } from "./config/db.js"; // Keep using import here
import User from "./models/User.js";
const userRegister = async () => {
  await connectToDatabase(); // Ensure DB connection
  try {
    // Sync the models with the database (create table if not exists)
    // await User.sync(); // This will create the 'users' table if it doesn't exist
    await User.sync({ force: true });

    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
    console.log("User created successfully!");
  } catch (error) {
    console.log(error);
  }
};

userRegister();
