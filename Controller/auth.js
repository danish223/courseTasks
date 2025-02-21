const users = require("../Models/user"); 
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  // Ensure username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the user already exists
  if (users[username]) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

  // Store the new user in memory
  users[username] = { username, password};

  console.log("Current Users:", users); // Debugging: Check if users are stored

  res.status(201).json({ message: "Costumer registered successfully.Now you can login" });
};



exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    // Check if user exists
    const user = users[username];
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  
    res.json({ message: "Login successful" });
  };