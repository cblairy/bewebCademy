import amqplib from "amqplib";
import log from "../log.js";
let queueTab = ["user_queue", "archive_queue"];
var channel;

export const rabbitConnect = async () => {
  try {
    // connect to RabbitMQ
    const connection = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}:5672`);
    channel = await connection.createChannel();
    // assert all queues
    queueTab.forEach(async (queue) => {
      await channel.assertQueue(queue);
    });
    log("rabbit", "Connected to RabbitMQ");
  } catch (error) {
    log("rabbit", "Error connecting to RabbitMQ", error);
  }
};

export const sendToQueue = async (message, beforedraft) => {
  // send message to RabbitMQ on bewebacademy queue
  try {
    queueTab.forEach(async (queue) => {
      log("rabbit", `Publishing to queueName: ${queue.toString()}`);
      await channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify({ message: message, data: beforedraft }))
      );
    });
  } catch (error) {
    log("rabbit", "Error sending to queue", error);
  }
};
