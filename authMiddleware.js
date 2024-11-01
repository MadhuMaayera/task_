const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    req.userId = decoded.id;
    req.roleId = decoded.role_id;
    next();
  });
};
exports.isManager = (req, res, next) => {
  if (req.roleId !== 2) {
    // Assuming '2' is the role ID for managers
    return res.status(403).json({ error: "Requires manager role" }); // Forbidden if not a manager
  }
  next();
};
