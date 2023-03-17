import Session from "../models/session.js";
import log from "../log.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    log("success", "getSessions");
    res.status(200).json(sessions);
  } catch (error) {
    log("error", "getSessions", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const sessions = await Session.findOne(req.params.id);
    log("success", "getSession");
    res.status(200).json(sessions);
  } catch (error) {
    log("error", "getSession", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const createSession = async (data) => {
  const newSession = new Session(data);

  try {
    await newSession.save();
    log("rabbit", "createSession");
  } catch (error) {
    log("rabbit", "createSession", error.message);
  }
};
