const restify = require('restify');
const builder = require('botbuilder');
const botbuilder_azure = require("botbuilder-azure");
const dialogs = require('./Dialogs/dialogs.js');
const colors = require('colors');
const JSON = require('circular-json');
const winston = require('winston');

winston.configure({
    transports: [
      new (winston.transports.File)({ filename: 'debug.log' })
    ]
  });

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   winston.info('%s listening to %s', server.name, server.url); 
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
const bot = new builder.UniversalBot(connector, (session)=>{
    winston.log('info', 'In POST');
    session.beginDialog(dialogs.keys.rootDialog);
});

dialogs.init(bot);

bot.on('conversationUpdate', (message) => {
    if (message.membersAdded) {
        winston.log('info', `ConersationUpdate`)
        message.membersAdded.forEach((identity) => {
            if (identity.id === message.address.bot.id) {
                winston.log('info', 'Inside Coverstion Update', message);
                bot.beginDialog(message.address, dialogs.keys.firstRun);
            }
        });
    }
});

bot.set('storage', new builder.MemoryBotStorage());

// Middle ware
bot.use({
    receive: function (event, next) {
        winston.log('info',`User:`, event);
        next();
    },
    send: function (event, next) {
        //winston.log('info',`Udabot`, event);
        next();
    }
});