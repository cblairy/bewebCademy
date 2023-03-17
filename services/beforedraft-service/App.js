import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import log from "./log.js";
dotenv.config();

import router from "./routes/beforedraft_routes.js";
import { rabbitConnect } from "./message_bus/message_bus.js";

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

const CONNECTION_URL =
  "mongodb+srv://admin:admin@cluster0.wcwrngq.mongodb.net/?retryWrites=true&w=majority";

const PORT = 1010;

app.use("/before-draft", router);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() =>
    app.listen(PORT, () => log("success", `Server running on port: ${PORT}`))
  )
  .catch((error) => log("error", "Error connecting to MongoDB", error));
