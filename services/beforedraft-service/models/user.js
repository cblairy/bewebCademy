import mongoose from "mongoose";

//* Créer un schéma pour le user*/
export const userSchema = mongoose.Schema({

    "id": String,
    "username": String,
    "firstname": String,
    "fastname": String,
    "email": String
});

//* Créer un modèle pour le user*/
const User = mongoose.model('users', userSchema);

export default User;
