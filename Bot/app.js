const restify = require('restify');
const builder = require('botbuilder');
const botbuilder_azure = require("botbuilder-azure");
const BotMessage = require('./helper/botMessages') ;
const promptHelper = require('./helper/promptHelper')(builder);

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
const bot = new builder.UniversalBot(connector);

bot.on('conversationUpdate', (message) => {
    if (message.membersAdded) {
        message.membersAdded.forEach((identity) => {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, 'firstRun');
            }
        });
    }
});

initialMessage = new BotMessage(
    [
        [
            `Hey there, I’m Udabot! A Udacity chatbot to help make your learning experience udacious by providing personalized course recommendations and mentorship.`
        ]
    ],
    {
        howDoesThatWork: `How does that work?`,
        cool: `Cool, let's get started!`
    }
);


howDoesThatWork = new BotMessage(
    [
        [
            `Udacity is an innovative online education provider. We offer cutting-edge courses built in partnership with leading companies like Google, AT&T, and Facebook on everything from mastering web design to tech entrepreneurship.`
        ],
        [
            `Our flagship Nanodegree programs set the standard for industry-recognized credentials, where your code is reviewed by experts from these organizations.`
        ]
    ],
    {
        cool: `Cool, let's get started!`
    }
)


bot.dialog('firstRun', [
    (session) => {
        session.userData.firstRun = true;
        builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, initialMessage));
    },
    (session, result) => {
        let response = result.response;
        if (response === initialMessage.options.howDoesThatWork) {
            builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, howDoesThatWork));
        } else if (response === initialMessage.options.cool) {
            // TODO : Start that dialog
        } else {
            // TODO : QnA | LUIS response
        }
    }
]).triggerAction({
    onFindAction: (context, callback) => {
        if (!context.userData.firstRun) {
            callback(null, 1.1);
        } else {
            callback(null, 0.0);
        }
    }
})

bot.set('storage', builder.MemoryBotStorage());