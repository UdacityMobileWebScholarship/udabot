const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const dialogs = require('./dialogs');
const promptHelper = require('../helper/promptHelper')(builder);

// Root dialog can understand these utterances and begin flow as per them.
// Basically,
// What are things you want to handle which can trigger a flow or reaction from bot.
// Whenever a flow fails to understands, flow can reprompt the user of send it to rootdialog to start a new flow.
const rootUtterances = {
    tellMeAboutUdacity: botMessages.welcomeMessage.options.tellMeAboutUdacity,
    awesome: botMessages.tellMeAboutUdacity.options.awesome,
    startLearning: botMessages.didNotUnderstand.options.getStarted,
    whatIsCost: botMessages.didNotUnderstand.options.whatIsCost
}


module.exports = (bot) => {
    // We will call LUIS here to understand user utterance if user has typed instead of clicking a button.
    bot.dialog(dialogs.keys.rootDialog, [
        (session, args) => {
            let utterance = args.utterance;
            if (utterance === undefined) {
                utterance = '';
            }
            if (! botMessages.isSuggestedAction(utterance)) {

            }
            if (utterance === rootUtterances.tellMeAboutUdacity) {
                session.beginDialog(dialogs.keys.tellAboutUdacity);
            } 
            else if (utterance === rootUtterances.whatIsCost) {

            }  
            else {
                // Bot failed to understand.
               session.send(promptHelper.getMessageAsSuggestedAction(session, botMessages.didNotUnderstand));
            }
        }
    ]);
};