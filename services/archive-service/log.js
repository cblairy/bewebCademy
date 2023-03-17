var date = new Date();
var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
/**
 * @param event - Votre event: success / error / rabbit / info.
 * @param message - Votre message
 * @param error - Message d'erreur
 */
export default (event, message, error) => {
    if (event == "success") {
        console.log("\x1b[32m", `Success - ${formattedDate} - message: ${message}`);
    } else if (event == "error") {
        console.log("\x1b[31m", `Error - ${formattedDate} - message: ${message} - error: ${error}`);
    } else if (event == "rabbit" && error != null) {
        console.log("\x1b[31m", `Error-RabbitMQ - ${formattedDate} - message: ${message} - error: ${error}`);
    } else if (event == "rabbit") {
        console.log("\x1b[36m", `Success-RabbitMQ - ${formattedDate} - message: ${message}`);
    } else if (event == "info") {
        console.log("\x1b[33m", `Info - ${formattedDate} - message: ${message}`);
    }
};
