const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc    Register a new user
// @route   /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { email, phone, profile, password, picture } = req.body;

  //validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields2");
  }

  //Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user

  const user = await User.create({
    email,
    phone,
    profile,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      phone: user.phone,
      profile: user.profile,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  //res.send( `hola ${req.body.name}`)
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  try {
    // Get works using id in the JWT
    //console.log("userController: ", req.user)
    const user = await User.findById(req.params.id);
    //console.log('userController: ', req.file)

    if (!user) {
      res.status(401);
      throw new Error("User not found or not conected");
    }

    // Obtener la parte de la ruta después de la carpeta 'uploads'
    const relativePath = req.file.path.split("uploads")[1];
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { picture: process.env.SERVER + "uploads" + relativePath },
      { new: true }
    );
    const userUpdated = {
      _id: updateUser._id,
      email: updateUser.email,
      phone: updateUser.phone,
      profile: updateUser.profile,
      picture: updateUser.picture,
      token: updateUser.token,
    };
    res.status(200).json(userUpdated);
  } catch (error) {
    // Handle any errors that occur during execution
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, profile } = req.body;

  const user = await User.findOne({ email });

  //Check user and password match

  if (
    user & (user.profile == profile) &&
    (await bcrypt.compare(password, user.password))
  ) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      phone: user.phone,
      profile: user.profile,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Ivalid Credential or chose the correct profile");
  }
});

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user.id,
    email: req.user.email,
    phone: req.user.phone,
    profile: req.user.profile,
    picture: req.user.picture,
    token: generateToken(req.user.id),
  };
  res.status(200).json(user);
});

//Generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  updateUser,
  loginUser,
  getMe,
};
