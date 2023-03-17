import Beforedraft from "../models/beforedraft.js";
import log from "../log.js";

export const getBeforedrafts = async (req, res) => {
  try {
    // use find() to get all users from the database
    const beforedrafts = await Beforedraft.find();
    log("success", "getBeforedrafts");
    res.status(200).json(beforedrafts);
  } catch (error) {
    log("error", "getBeforedrafts", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const getBeforedraft = async (req, res) => {
  try {
    // use finById() to get a specific user from the database
    const beforedraft = await Beforedraft.findById(req.params.id);
    log("success", "getBeforedraft");
    res.status(201).json(beforedraft);
  } catch (error) {
    log("error", "getBeforedraft", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const createBeforedraft = async (data) => {
  const newBeforedraft = new Beforedraft(data);

  try {
    // Use save() to create a new user to the database
    await newBeforedraft.save();
    log("rabbit", "createBeforedraft");
  } catch (error) {
    log("rabbit", "createBeforedraft", error.message);
  }
};
