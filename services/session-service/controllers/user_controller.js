import mongoose from "mongoose";
import { sendToQueue } from "../message_bus/message_bus.js";
import Session from "../models/session.js";
import User from "../models/user.js";
import log from "../log.js";

export const getUser = async (req, res) => {
  try {
    // use finById() to get a specific user from the database
    const user = await User.findById(req.params.id);
    log("success", "getUser");
    res.status(201).json(user);
  } catch (error) {
    log("error", "getUser", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const createSessionByUser = async (data) => {
  const newSession = new Session({
    badges: [],
    exercices: [],
    user: data,
  });
  try {
    // Use save() to create a new user to the database
    await newSession.save();
    sendToQueue("session_created", newSession);
    log("success", "createSessionByUser");
  } catch (error) {
    log("error", "createSessionByUser", error.message);
  }
};

export const updateSessionUser = async (data) => {
  const newUser = new User(data);
  try {
    // Use findByIdAndUpdate() to update a user in the database
    await Session.updateOne(
      { "user._id": mongoose.Types.ObjectId(data._id) },
      { user: newUser }
    );
    const sessionUpdate = await Session.findOne({
      "user._id": mongoose.Types.ObjectId(data._id),
    });
    sendToQueue("session_updated", sessionUpdate);
    log("success", "updateSessionUser");
  } catch (error) {
    log("error", "updateSessionUser", error.message);
  }
};

export const deleteSessionByUserId = async (data) => {
  const newSession = new Session({
    badges: [],
    exercices: [],
    user: data,
  });
  try {
    // Use findByIdAndDelete() to delete a specific user to the database
    await Session.deleteOne({ "user._id": mongoose.Types.ObjectId(data._id) });
    log("success", "deleteSessionByUserId");
    // utilisateur deleted => session deleted => archives_session updated ? ou rien ? (pour le moment rien :D)
    // sendToQueue("session_deleted", newSession)
  } catch (error) {
    log("error", "deleteSessionByUserId", error.message);
  }
};
