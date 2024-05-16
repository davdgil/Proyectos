const { IncomingWebhook } = require('@slack/webhook');
const webhookURL = process.env.SLACK_WEBHOOK; // Asegúrate de que esta variable de entorno esté definida
const webhook = new IncomingWebhook(webhookURL);

const handleError = (res, message, code = 403) => {
    // Log the error to Slack
    webhook.send({
        text: `Error ${code}: ${message}`
    }).catch(err => {
        console.error('Error sending message to Slack:', err);
    });

    // Respond with the error
    res.status(code).send(message);
};


const handleSuccess = (res, message, data, code = 200) => {
    res.status(code).json({ message, data });
};

module.exports = { handleError, handleSuccess };
