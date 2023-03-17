import mongoose from 'mongoose'

//* Creer un schema pour le language */
 export const languageSchema = mongoose.Schema({
    'name': String,
    'monaco': String
});

//* Créer un modèle pour le language */
const Language = mongoose.model('language', languageSchema)

export default Language;