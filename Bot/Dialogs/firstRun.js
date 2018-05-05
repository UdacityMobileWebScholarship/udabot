const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const dialogs = require('./dialogs');
const promptHelper = require('../helper/promptHelper')(builder);


module.exports = ((bot) => {
    bot.dialog(dialogs.keys.firstRun, [
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
                session.beginDialog(dialogs.keys.rootDialog, {utterance: response});
            }
        },
        (session, result) => {
            let response = result.response;
            if (response === botMessages.howDoesThatWork.options.cool) {
                builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.welcomeMessage));        
            }
            else {
                session.beginDialog(dialogs.keys.rootDialog, {utterance: response});
            }
        }, 
        (session, result) => {
            let response = result.response;
            session.beginDialog(dialogs.keys.rootDialog, {utterance: response});
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

