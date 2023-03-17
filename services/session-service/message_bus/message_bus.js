import amqplib from 'amqplib';
import { updateBadgeById, updateExerciceById } from '../controllers/session_controller.js';
import { createSessionByUser, deleteSessionByUserId, updateSessionUser } from '../controllers/user_controller.js';
import log from '../log.js';
var channel;
var queueTab = ["archive_queue"];

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
        //consommation
        channel.consume("session_queue", async (data) => {
            await checkEvent(JSON.parse(Buffer.from(data.content)).message, JSON.parse(Buffer.from(data.content)).data).then(log("rabbit", `Event : ${JSON.parse(Buffer.from(data.content)).message}`));
            channel.ack(data);
        })
    } catch (error) {
        log("rabbit", "Error connecting to RabbitMQ", error);
    }
}

export const sendToQueue = async (message, session) => {
    // send message to RabbitMQ on bewebacademy queue
    channel.sendToQueue('archive_queue', Buffer.from(JSON.stringify({'message': message, 'data': session})));
    log("rabbit", `Message sent to archive_queue`);
}
const checkEvent = async(event, data) => {
    switch(event){
        case "badge_updated":
            await updateBadgeById(data)
            break;
        case "exercice_updated":
            await updateExerciceById(data)
            break;
        case "user_updated":
            await updateSessionUser(data)
            break;
        case "user_created":
            await createSessionByUser(data)
            break;
        case "user_deleted":
            await deleteSessionByUserId(data)
            break;
    }
}