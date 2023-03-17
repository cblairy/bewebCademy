import mongoose from "mongoose";

//* Créer un schéma pour le user*/
export const userSchema = mongoose.Schema({

    "firstname": String,
    "fastname": String,
    "email": String,
    "password": String,
    "register_date": Date,
    "phone_number":String,
    "draft_id": String,
});

//* Créer un modèle pour le user*/
const User = mongoose.model('archives_users', userSchema);

export default User;
