import mongoose from "mongoose";
import { languageSchema } from './language.js';

// créer un schéma pour le badge
export const badgeSchema = mongoose.Schema({

    // Badge
    "name": String,
    'language': [languageSchema],
    "image": String,
    "acquisition_date": Date,
    "all_done": Boolean
});

// créer un modèle pour le badge
const Badge = mongoose.model('badges', badgeSchema);

export default Badge;