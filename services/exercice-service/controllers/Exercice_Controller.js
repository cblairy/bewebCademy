import Exercice from "../models/exercice.js";
// import Badge, { getBadge } from '../controllers/Badge_Controller.js';
import { sendToQueue } from "../message_bus/message_bus.js";
import log from "../log.js";

export const getExercices = async (req, res) => {
  try {
    // use find() to get all exercices from the database
    const exercices = await Exercice.find();
    log("success", "getExercices");
    res.status(200).json(exercices);
  } catch (error) {
    log("error", "getExercices", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const getExercice = async (req, res) => {
  try {
    // use findById() to get a specific exercice from the database
    const exercice = await Exercice.findById(req.params.id);
    log("success", "getExercice");
    res.status(201).json(exercice);
  } catch (error) {
    log("error", "getExercice", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const createExercice = async (req, res) => {
  const body = req.body.formData;
  const newExercice = new Exercice(body);
  try {
    // use save() to cerate a new exercice to the database
    await newExercice.save();
    log("success", "createExercice");
    res.status(201).json(newExercice);
  } catch (error) {
    log("error", "createExercice", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const deleteExercice = async (req, res) => {
  try {
    // use finById() to get a specific exercice from the database
    const exercice = await Exercice.findById(req.params.id);
    sendToQueue("exercice_deleted", exercice);
    log("rabbit", "deleteExercice");
    try {
      // use findByIdAndDelete() to delete a specific exercice to the database
      await Exercice.findByIdAndDelete(req.params.id);
        log("success", "deleteExercice");
      res.status(201).json(`${req.params.id} : supprimer`);
    } catch (error) {
        log("error", "deleteExercice", error.message);
    }
  } catch (error) {
    log("rabbit", "deleteExercice", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const updateExercice = async (req, res) => {
  const body = req.body.formData;
  const newExercice = new Exercice(body);
  try {
    sendToQueue("exercice_updated", newExercice);
    log("rabbit", "updateExercice");
    try {
      // Use findByIdAndUpdate() to update a Exercice in the database
      const exo = await Exercice.findByIdAndUpdate(req.params.id, body);
        log("success", "updateExercice");
      res.status(201).json(exo);
    } catch (error) {
        log("error", "updateExercice", error.message);
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    log("rabbit", "updateExercice", error.message);
  }
};
