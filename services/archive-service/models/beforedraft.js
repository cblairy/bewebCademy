import mongoose from "mongoose";

//* Créer un schéma pour le user*/
export const beforedraftSchema = mongoose.Schema({

    //* BeforeDraft*/
    "name": String,
    "start_date": Date,
    "end_date" : Date,
});

//* Créer un modèle pour le user*/
const Beforedraft = mongoose.model('archives_beforedrafts', beforedraftSchema);

export default Beforedraft;