const { IncomingWebhook } = require("@slack/webhook")
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)
const loggerStream = {
    write: message => {
        console.log("Logging to Slack: ", message); // Confirmar que esto se imprime
        webHook.send({
            text: message
        });
    }
}

module.exports = loggerStream