import Language from "../models/language.js";
import { sendToQueue } from "../message_bus/message_bus.js";
import log from "../log.js";

export const getLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    log("success", "getLanguages");
    res.status(200).json(languages);
  } catch (error) {
    log("error", "getLanguages", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const getLanguage = async (req, res) => {
  try {
    // use finById() to get a specific language from the database
    const language = await Language.findById(req.params.id);
    log("success", "getLanguage");
    res.status(201).json(language);
  } catch (error) {
    log("error", "getLanguage", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const createLanguage = async (req, res) => {
  const body = req.body.formData;
  const newLanguage = new Language(body);
  try {
    // Use save() to create a new language to the database
    await newLanguage.save();
    log("success", "createLanguage");
    res.status(201).json(newLanguage);
  } catch (error) {
    log("error", "createLanguage", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const updateLanguage = async (req, res) => {
  const body = req.body.formData;
  const newLanguage = new Language(body);

  try {
    // Use findByIdAndUpdate() to update a language in the database
    await Language.findByIdAndUpdate(req.params.id, body);
    sendToQueue("language_updated", newLanguage);
    log("rabbit", "updateLanguage");
    res.status(201).json(body);
  } catch (error) {
    log("rabbit", "updateLanguage", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const deleteLanguage = async (req, res) => {
  const language = await Language.findById(req.params.id);

  try {
    // Use findByIdAndDelete() to delete a specific language to the database
    await Language.findByIdAndDelete(req.params.id);
    sendToQueue("language_deleted", language);
    log("rabbit", "deleteLanguage");
    res.status(201).json(`${req.params.id} : supprimé`);
  } catch (error) {
    log("rabbit", "deleteLanguage", error.message);
    res.status(404).json({ message: error.message });
  }
};
