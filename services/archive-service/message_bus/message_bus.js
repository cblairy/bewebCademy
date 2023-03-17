import amqplib from "amqplib";
import log from "../log.js";
import { createUser } from "../controllers/user_controller.js";
import { createSession } from "../controllers/session_controller.js";
import { createLanguage } from "../controllers/language_controller.js";
import { createBeforedraft } from "../controllers/beforedraft_controller.js";
var channel;
var queues = ["archive_queue", "badge_queue", "user_queue", "session_queue", "exercice_queue"];

export const rabbitConnect = async () => {
  try {
    // connect to RabbitMQ
    const connection = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}:5672`);
    channel = await connection.createChannel();
    for (let i = 0; i < queues.length; i++) {
      await channel.assertQueue(queues[i]);
    }
    log("rabbit", "Connected to RabbitMQ");
    // consume bewebacademy queue
    channel.consume("archive_queue", async (data) => {
      await checkEvent(
        JSON.parse(Buffer.from(data.content)).message,
        JSON.parse(Buffer.from(data.content)).data
      ).then(
        log(
          "rabbit",
          `Event : ${JSON.parse(Buffer.from(data.content)).message}`
        )
      );
      channel.ack(data);
    });
  } catch (error) {
    log("rabbit", "Error connecting to RabbitMQ", error);
  }
};

const checkEvent = async (event, data) => {
  switch (event) {
    case "user_deleted":
      await createUser(data);
      break;
    case "session_deleted":
      await createSession(data);
      break;
    case "beforedraft_deleted":
      await createBeforedraft(data);
      break;
    case "language_deleted":
      await createLanguage(data);
      break;
  }
};
