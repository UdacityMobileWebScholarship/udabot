const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const dialogs = require('./dialogs');
const promptHelper = require('../helper/promptHelper')(builder);

module.exports = (bot) => {
    // We will call LUIS here to understand user utterance if user has typed instead of clicking a button.
    bot.dialog(dialogs.keys.faqDialog, [
        (session, args) => {
            let key = args.faqKey;
            let utterance = args.utterance;
            if (key === dialogs.faqs.tellAboutUdacity) {
                builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.tellMeAboutUdacity));
            } 
        },
        (session, result) => {
            let response = result.response;
            session.beginDialog(dialogs.keys.rootDialog, {utterance: response});
        }
    ]);
};