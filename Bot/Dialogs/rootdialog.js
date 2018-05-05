const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const promptHelper = require('../helper/promptHelper')(builder);

module.exports = (bot) => {
    // We will call LUIS here to understand user utterance if user has typed instead of clicking a button.
    bot.dialog('rootDialog', [
        (session) => {
            let utterance = session.privateConversationData.utterance;
            if (! botMessages.isSuggestedAction(utterance)) {
                session.send('Call LUIOS');
            }
            if (utterance === botMessages.welcomeMessage.options.tellMeAboutUdacity) {
                builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.tellMeAboutUdacity))
            } else if (utterance === botMessages.tellMeAboutUdacity.options.awesome) {
                builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.awesome))
            }
        }
    ]);
};