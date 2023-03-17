import Language from "../models/language.js";
import log from "../log.js";

export const getLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    log("success", "getLanguages");
    res.status(200).json(languages);
  } catch (error) {
    log("error", "getLanguages", error);
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

export const createLanguage = async (data) => {
  const newLanguage = new Language(data);

  try {
    // Use save() to create a new language to the database
    await newLanguage.save();
    log("rabbit", "createLanguage");
  } catch (error) {
    log("rabbit", "createLanguage", error.message);
  }
};
