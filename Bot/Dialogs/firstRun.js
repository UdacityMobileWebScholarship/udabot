const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const promptHelper = require('../helper/promptHelper')(builder);


module.exports = ((bot) => {
    bot.dialog('firstRun', [
        (session) => {
            session.userData.firstRun = true;
            builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.initialMessage));
        },
        (session, result) => {
            let response = result.response;
            if (response === botMessages.initialMessage.options.howDoesThatWork) {
                builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.howDoesThatWork));
            } else if (response === botMessages.initialMessage.options.cool) {
                builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.welcomeMessage));
            } else {
                session.privateConversationData.utterance = response;
                session.beginDialog('rootDialog');
            }
        },
        (session, result) => {
            let response = result.response;
            if (response === botMessages.howDoesThatWork.options.cool) {
                builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.welcomeMessage));        
            }
            else {
                session.privateConversationData.utterance = response;
                session.beginDialog('rootDialog');
            }
        }, 
        (session, result) => {
            session.privateConversationData.utterance = result.response;
            session.beginDialog('rootDialog');
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
});

