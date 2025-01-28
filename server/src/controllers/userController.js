import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

// Register
// Register
export const registerUser = async (req, res) => {
  const { name, email, password, location } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set default location if not provided
    const userLocation = location || { type: "Point", coordinates: [0, 0] };

    const user = await User.create({ name, email, password: hashedPassword, location: userLocation });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password'); // Add .select('+password') to include the password field

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('User password from DB:', user.password);  // Debugging line to ensure password is present

    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
