const bcrypt = require('bcrypt');
const User = require('../Model/user');
const jwt = require('jsonwebtoken');

// Controller to register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate user input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    return res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error registering user' });
  }
};


const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token: token
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error logging in' });
    }
  };


module.exports = { registerUser, loginUser};