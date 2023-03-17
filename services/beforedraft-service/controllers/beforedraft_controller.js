import Beforedraft from "../models/beforedraft.js";
import { sendToQueue } from "../message_bus/message_bus.js";
import log from "../log.js";
import e from "cors";

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

export const createBeforedraft = async (req, res) => {
  const body = req.body.formData;
  const newBeforedraft = new Beforedraft(body);

  try {
    // Use save() to create a new user to the database
    await newBeforedraft.save();
    log("success", "createBeforedraft");
    res.status(201).json(newBeforedraft);
  } catch (error) {
    log("error", "createBeforedraft", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const updateBeforedraft = async (req, res) => {
  const body = req.body.formData;

  try {
    // Use findByIdAndUpdate() to update a user in the database
    await Beforedraft.findByIdAndUpdate(req.params.id, body);
    log("success", "updateBeforedraft");
    res.status(201).json(body);
  } catch (error) {
    log("error", "updateBeforedraft", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const addUsertoPreSelect = async (req, res) => {
  const user = req.body;
  try {
    //check if user is already in preselect 
    const beforedraft = await Beforedraft.findById(req.params.id);
    var alreadyInPreSelect = false;
    var alreadyInSelect = false;
    beforedraft.pre_select.forEach(element => {
      if (element.id == user.id) {
        alreadyInPreSelect = true;
      }
    });
    beforedraft.pre_select.forEach(element => {
      if (element.id == user.id) {
        alreadyInSelect = true;
      }
    });
    //add user to the preselect array
    if (!alreadyInPreSelect && !alreadyInSelect)
    {
      await Beforedraft.findByIdAndUpdate(req.params.id, { $push: { pre_select: user } });
      log("success", "addUsertoPreSelect");
      res.status(201).json(user);
    } else
    {
      log("error", "addUsertoPreSelect", "User already exists");
      res.status(404).json({ message: "User already in the select array" });
    }
  } catch (error) {
    log("error", "addUsertoPreSelect", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const addUsertoSelect = async (req, res) => {
  const user = req.body;

  try {
    // delete user in preselct
    await Beforedraft.findByIdAndUpdate(req.params.id, {
      $pull: { pre_select: user },
    });
    // add user in select
    await Beforedraft.findByIdAndUpdate(req.params.id, {
      $push: { select: user },
    });
    await Beforedraft.findByIdAndUpdate(req.params.id, body);
    res.status(201).json(body);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//forech before dreaft if date is today return true else return false
export const checkBeforedraft = async (req, res) => {
  var newDate = new Date();
  var date = newDate.toISOString().slice(0, 10);
  try {
    const beforedrafts = await Beforedraft.find();
    beforedrafts.forEach(element => {
      if (element.start_date.toISOString().slice(0, 10) <= date  && element.end_date.toISOString().slice(0, 10) >= date) {
        res.status(201).json(element);
      } else {
        res.status(404).json({ message: error.message });
      }
      log("success", "checkBeforedraft");
    });
  } catch (error) {
    log("error", "checkBeforedraft", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const deleteBeforedraft = async (req, res) => {
  try {
    // use finById() to get a specific user from the database
    const beforedraft = await Beforedraft.findById(req.params.id);

    sendToQueue("beforedraft_deleted", beforedraft);
    log("rabbit", "beforedraft_deleted");

    // Use findByIdAndDelete() to delete a specific user to the database
    await Beforedraft.findByIdAndDelete(req.params.id);
    log("success", "deleteBeforedraft");
    res.status(201).json(`${req.params.id} : supprimé`);
  } catch (error) {
    log("error", "deleteBeforedraft", error.message);
  }
};
