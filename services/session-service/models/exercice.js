import mongoose from "mongoose";
import { badgeSchema } from "./badge.js";

// créer un schéma pour le exercice
export const exerciceSchema = mongoose.Schema({

    // Exercice
    "badges": [badgeSchema],
    "name": String,
    "language": String,
    "done": Boolean,
    "done_date": Date,
    "statement": String,
    "result": mongoose.Mixed,
    "saved": mongoose.Mixed

});

// créer un modèle pour l'exercice
const Exercice = mongoose.model('exercices', exerciceSchema);

export default Exercice;