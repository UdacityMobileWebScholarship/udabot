const restify = require('restify');
const builder = require('botbuilder');
const botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Create your bot with a function to receive messages from the user
// This default message handler is invoked if the user's utterance doesn't
// match any intents handled by other dialogs.
const bot = new builder.UniversalBot(connector, [
    (session) => {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    (session, result) => {
        session.endDialog(`Hello ${result.response}!`);
    }
]);

bot.on('conversationUpdate', (message) => {
    if (message.membersAdded) {
        message.membersAdded.forEach((identity) => {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, 'firstRun');
            }
        });
    }
});

bot.dialog('firstRun', (session) => {
    session.userData.firstRun = true;
    session.send('Hello. I am Udabot.').endDialog();
}).triggerAction({
    onFindAction: (context, callback) => {
        if (!context.userData.firstRun) {
            callback(null, 1.1);
        } else {
            callback(null, 0.0);
        }
    }
})

bot.set('storage', builder.MemoryBotStorage());