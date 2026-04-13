// backend/src/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach full user data
    
    // Your token has { userId: user.id }, so extract it correctly
    req.userId = decoded.userId; 

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
