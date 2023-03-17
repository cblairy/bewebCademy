import User from "../models/user.js";
import log from "../log.js";

export const getUsers = async (req, res) => {
  try {
    // use find() to get all users from the database
    const users = await User.find();
    log("success", "getUsers");
    res.status(200).json(users);
  } catch (error) {
    log("error", "getUsers", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    // use finById() to get a specific user from the database
    const user = await User.findOne({ email: req.params.id });
    log("success", "getUser");
    res.status(201).json(user);
  } catch (error) {
    log("error", "getUser", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (data) => {
  const newUser = new User(data);
  try {
    // Use save() to create a new user to the database
    await newUser.save();
    log("rabbit", "createUser");
  } catch (error) {
    log("rabbit", "createUser", error.message);
  }
};
