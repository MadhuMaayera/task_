const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");

exports.register = (req, res) => {
  const { name, email, password, role_id } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const checkEmailSql = "SELECT * FROM users WHERE email = ?";

  // Check if user already exists
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0)
      return res.status(409).json({ error: "Email already exists" });

    const sql =
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, role_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      console.error("Login error:", err);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password for email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, role_id: user.role_id });
  });
};
