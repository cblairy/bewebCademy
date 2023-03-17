import Badge from "../models/badge.js";
import { sendToQueue } from "../message_bus/message_bus.js";
import log from "../log.js";

export const getBadges = async (req, res) => {
  try {
    // use find() to get all badges from the database
    const badges = await Badge.find();
    log("success", "getBadges");
    res.status(200).json(badges);
  } catch (error) {
    log("error", "getBadges", error);
    res.status(404).json({ message: error.message });
  }
};

export const getBadge = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    log("success", "getBadge");
    res.status(201).json(badge);
  } catch (error) {
    log("error", "getBadge", error);
    res.status(404).json({ message: error.message });
  }
};

export const createBadge = async (req, res) => {
  const body = req.body.formData;
  const newBadge = new Badge(body);
  try {
    await newBadge.save();
    log("success", "createBadge");
    res.status(201).json(newBadge);
  } catch (error) {
    log("error", "createBadge", error);
    res.status(404).json({ message: error.message });
  }
};

export const updateBadge = async (req, res) => {
  const body = req.body.formData;
  const newBadge = new Badge(body);
  try {
    sendToQueue("badge_updated", newBadge);
    log("rabbit", "updateBadge");
    try {
      const badge = await Badge.findByIdAndUpdate(req.params.id, body);
      log("success", "updateBadge");
      res.status(201).json(badge);
    } catch (error) {
      log("error", "updateBadge", error);
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    log("rabbit", "updateBadge", error);
  }
};

export const deleteBadge = async (req, res) => {
  try {
    //find badge and send to queue
    await Badge.findByIdAndDelete(req.params.id);
    log("success", "deleteBadge");
    res.status(201).json(`${req.params.id} : supprimé`);
  } catch (error) {
    log("error", "deleteBadge", error);
    res.status(404).json({ message: error.message });
  }
};
