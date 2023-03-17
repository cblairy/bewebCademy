import amqplib from "amqplib";
import { updateLanguageById } from "../controllers/Language_controller.js";
import log from "../log.js";
var channel;
var queueTab = ["session_queue", "exercice_queue"];

export const rabbitConnect = async () => {
  try {
    // connect to RabbitMQ
    const connection = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}:5672`);
    channel = await connection.createChannel();
    queueTab.forEach(async (queue) => {
      await channel.assertQueue(queue);
    });
    log("rabbit", "Connected to RabbitMQ");
    // consume bewebacademy queue
    channel.consume("badge_queue", async (data) => {
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
//  export const sendToQueue = () => {}
export const sendToQueue = async (message, badge) => {
  // send message to RabbitMQ on bewebacademy queue
  try {
    queueTab.forEach(async (element) => {
      log("rabbit", `Publishing to queueName: ${element.toString()}`);
      await channel.sendToQueue(
        element,
        Buffer.from(JSON.stringify({ message: message, data: badge }))
      );
    });
  } catch (error) {
    log("rabbit", "Error sending to queue", error);
  }
};

const checkEvent = async (event, data) => {
  if (event === "language_updated") {
    await updateLanguageById(data);
  }
};
