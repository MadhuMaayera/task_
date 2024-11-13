import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  // Ensure 'req', 'res', 'next' are passed
  try {
    // Get the token from Authorization header
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token not provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token Not Valid" });
    }

    // Find user using the decoded _id
    const user = await User.findByPk(decoded._id); // Correct Sequelize method is 'findByPk'

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error in verifyUser middleware:", error); // Log the error for debugging
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export default verifyUser;
