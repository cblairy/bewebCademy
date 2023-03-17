import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/Badge_route.js";
import { rabbitConnect } from "./message_bus/message_bus.js";
import log from "./log.js";
import cors from "cors"
const app = express();

if (process.env.NODE_ENV == "prod") {
  process.env['RABBITMQ_URL'] = 'rabbitmq-clusterip-srv'
}else if (process.env.NODE_ENV == "dev") {
  process.env['RABBITMQ_URL'] = 'localhost'
}
log("success", `RABBITMQ_URL: ${process.env['RABBITMQ_URL']}`)

rabbitConnect();
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/badge", router);

// URL de la bdd
const CONNECTION_URL =
  "mongodb+srv://admin:admin@cluster0.wcwrngq.mongodb.net/?retryWrites=true&w=majority";

// Port de l'application
const PORT = 2000;

// Connexion à MongoDB
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    // Lancement du serveur
    app.listen(PORT, () => log("success", `Server running on port: ${PORT}`))
  )
  .catch((error) =>
    // Affichage de l'erreur
    log("error", "Error connecting to MongoDB", error)
  );
