import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { rabbitConnect } from "./message_bus/message_bus.js";
import router from "./routes/Exercice_Route.js";
import log from "./log.js";
dotenv.config();
import cors from "cors"
const app = express();

if (process.env.NODE_ENV == "prod") {
  process.env['RABBITMQ_URL'] = 'rabbitmq-clusterip-srv'
}else if (process.env.NODE_ENV == "dev") {
  process.env['RABBITMQ_URL'] = 'localhost'
}
log("success", `RABBITMQ_URL: ${process.env['RABBITMQ_URL']}`)

rabbitConnect();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));
app.use("/exercice", router);

// URL de la bdd
const CONNECTION_URL =
  "mongodb+srv://admin:admin@cluster0.wcwrngq.mongodb.net/?retryWrites=true&w=majority";
// port de l'application
const PORT = 4000;

// connexion à MongoDB
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  // mongoose.connect(CONNECTION_URL, { useUnifiedTopology: true })
  .then(() =>
    // lancement  du serveur
    app.listen(PORT, () => log("success", `Server running on port: ${PORT}`))
  )
  .catch((error) =>
    // affichage de l'erreur
    log("error", "Error connecting to MongoDB", error)
  );
