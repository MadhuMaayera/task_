// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } }); // Sequelize syntax

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ success: false, error: "Wrong password" });
//     }

//     const token = jwt.sign(
//       { _id: user.id, role: user.role },
//       process.env.JWT_KEY,
//       { expiresIn: "10d" }
//     );

//     res.status(200).json({
//       success: true,
//       token,
//       user: { _id: user.id, name: user.name, role: user.role },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// const verify = (req, res) => {
//   return res.status(200).json({ success: true, user: req.user });
// };

// const resetPassword = async(user._id, password) =>
// {
//   let PasswordReset = await TokenExpiredError.findOne({ userId });
//   if (!PasswordReset) {
//     return res.status(404).json({ success: false, error: "Password reset token error" })
//   }
//   const isValid = await bcrypt.compare(token, PasswordReset.token)
//   if (!isValid) {
//     return res.status(401).json({
//       success: false, error: "Invalid password reset token
//     });
//   }
//   const hash = await bcrypt.hash(password, Number(bycryptSalt));
//   await User.update({ password: hash }, {
//     where: { id: user._id },
//       { $set: { password: hash } },
//     { new: true });

//   }

// export { login, verify };

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PasswordResetToken from "../models/PasswordResetToken.js"; // Assuming a model for storing tokens
import User from "../models/User.js";

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } }); // Sequelize syntax

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Wrong password" });
    }

    const token = jwt.sign(
      { _id: user.id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: { _id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Verify function to check token validity and return user info
const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

// Assuming PasswordResetToken and bcrypt are imported here as shown previously

const resetPassword = async (req, res) => {
  const { userId, token, newPassword } = req.body;

  try {
    const passwordReset = await PasswordResetToken.findOne({
      where: { userId },
    });
    if (!passwordReset) {
      return res
        .status(404)
        .json({ success: false, error: "Password reset token not found" });
    }

    const isValid = await bcrypt.compare(token, passwordReset.token);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Assuming saltRounds of 10
    await User.update({ password: hashedPassword }, { where: { id: userId } });

    // Optionally, delete the reset token after a successful password reset
    await PasswordResetToken.destroy({ where: { userId } });

    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { login, resetPassword, verify };
