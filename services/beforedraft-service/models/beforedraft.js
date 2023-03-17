import mongoose from "mongoose";
import { userSchema } from "./user.js";

//* Créer un schéma pour le user*/
const beforedraftSchema = mongoose.Schema({

    //* BeforeDraft*/
    "name": String,
    "start_date": Date,
    "end_date" : Date,
    "pre_select": Object, userSchema,
    "select":Object, userSchema,
});

//* Créer un modèle pour le user*/
const Beforedraft = mongoose.model('beforedrafts', beforedraftSchema);

export default Beforedraft;

