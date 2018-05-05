const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const dialogs = require('./dialogs');
const promptHelper = require('../helper/promptHelper')(builder);

module.exports = (bot) => {
    // We will call LUIS here to understand user utterance if user has typed instead of clicking a button.
    bot.dialog(dialogs.keys.tellAboutUdacity, [
        (session) => {
            builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.tellMeAboutUdacity));
        },
        (session, result) => {
            let response = result.response;
            
            if (response ===  botMessages.tellMeAboutUdacity.options.awesome) {
                builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.awesome));
            }
        },
        (session, result) => {
            let response = result.response;
            session.beginDialog(dialogs.keys.rootDialog, {utterance: response});
        }
    ]);
};