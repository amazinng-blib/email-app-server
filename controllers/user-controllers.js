const UserModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/handletoken');
const validator = require('validator');

const registerUser = async (req, res) => {
  const email = req?.body?.email?.toLowerCase()?.trim();
  const first_name = req?.body?.firstName?.toLowerCase()?.trim();
  const last_name = req?.body?.lastName?.toLowerCase()?.trim();
  const password = req?.body?.password;
  try {
    // todo: before creating new user, check if user exist

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User Exist' });
    }

    // todo: if user exist, validate input eg email

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Email must be a valid email' });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password is too weak' });
    }

    // todo: encrypt passwod

    const salt = await bcrypt.genSalt();
    const passwordHarsh = await bcrypt.hash(password, salt);

    // todo: create new user

    const userObj = {
      first_name,
      last_name,
      email,
      password: passwordHarsh,
    };

    newUser = new UserModel(userObj);
    await newUser.save();

    if (newUser) {
      const token = generateToken(newUser?._id);

      const userDetails = {
        token,
        user: newUser,
      };

      return res.status(201).json({ message: 'User Created', userDetails });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User Does not exist' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user?._id);
    if (user) {
      const { password, ...otherDetails } = user?._doc;

      const userDetails = {
        otherDetails,
        token,
      };

      return res
        .status(200)
        .json({ message: 'Logged-in Successfully', userDetails });
    }
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const getUserReceivedMessages = async (req, res) => {
  const loggedInUserId = req?.query?.userId;

  try {
    const user = await UserModel.findById(loggedInUserId);
    if (!user) {
      return res.status(404).json({ message: 'Not Found' });
    }

    res.status(200).json({
      message: 'Messages Fetched',
      userMessages: user?.received_mails,
    });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserReceivedMessages,
};
