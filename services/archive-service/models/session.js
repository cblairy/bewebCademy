import mongoose from 'mongoose';
import { badgeSchema } from './badge.js';
import { exerciceSchema } from './exercice.js';
import { userSchema } from './user.js';
//** Créer un schéma pour la session*/
const sessionSchema = mongoose.Schema({
    //** Session */
    "badges": [badgeSchema],
    "exercices": [exerciceSchema],
    "user": Object, userSchema,

});

//** Créer un modele pour la session */
const Session = mongoose.model("archives_sessions", sessionSchema);

export default Session;