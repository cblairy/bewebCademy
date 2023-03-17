import Badge from "../models/badge.js";
import Language from "../models/language.js";
import { sendToQueue } from "../message_bus/message_bus.js";
import mongoose from "mongoose";
import log from "../log.js";

export const updateLanguageById = async (data) => {
  const newLanguage = new Language(data);
  try{
    await Badge.updateMany({"language.$[]._id": data._id}, {"$set": {"language.$[element]": newLanguage}}, {"arrayFilters": [{"element._id": data._id}]})
    log("rabbit", "updateLanguageById",) 

    const badges = await Badge.find({
      "language._id": mongoose.Types.ObjectId(data._id),
    });
    badges.forEach((element) => {
      sendToQueue("badge_updated", element);
    });
    log("success", "Language updated");
  } catch (error) {
    log("error", "Error updating language", error);
  }
};

