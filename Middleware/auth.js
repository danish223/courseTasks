const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");  // Token is usually passed in the Authorization header as 'Bearer <token>'
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Remove 'Bearer ' from the token string and verify it
    const decoded = jwt.verify(token.split(" ")[1], 'your-secret-key');  // 'your-secret-key' should be the same as in login
    req.user = decoded;  // Attach the decoded token info to the request object
    next();  // Call the next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
