import amqplib from 'amqplib';
import log from '../log.js';
var channel;
var queueTab = ["archive_queue", "badge_queue"];


export const rabbitConnect = async () => {
    try {
        // connect to RabbitMQ
        const connection = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}:5672`);
        channel = await connection.createChannel();
        queueTab.forEach(async (queue) => {
            await channel.assertQueue(queue);
        });
        log("rabbit", "Connected to RabbitMQ");
    } catch (error) {
        log("rabbit", "Error connecting to RabbitMQ", error);
    }
}

export const sendToQueue = async (message, language) => {
    // send message to RabbitMQ on bewebacademy queue
    try {
        queueTab.forEach(async (queue) => {
            log("rabbit", `Publishing to queueName: ${queue.toString()}`);
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify({ 'message': message, 'data': language })));
        });
    }
    catch (error) {
        log("rabbit", "Error sending to queue", error);
    }
}