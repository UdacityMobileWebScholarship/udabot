const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const dialogs = require('./dialogs');
const promptHelper = require('../helper/promptHelper')(builder);

// Root dialog can understand these utterances and begin flow as per them.
// Basically,
// What are things you want to handle which can trigger a flow or reaction from bot.
// Whenever a flow fails to understands, flow can reprompt the user of send it to rootdialog to start a new flow.
const rootIssues = {
    startLearning: botMessages.didNotUnderstand.options.getStarted,
}

const rootFAQs = {
    whatIsCost: botMessages.didNotUnderstand.options.whatIsCost,
    tellAboutUdacity: botMessages.welcomeMessage.options.tellAboutUdacity
}

const userReaction = {
    awesome: botMessages.tellMeAboutUdacity.options.awesome,
}

const isIssue = (utterance = '', intent = '') => {
    for(let issue of Object.keys(rootIssues)) {
        if(utterance === rootIssues[issue] || 
            intent === issue
        ) {
            return true;
        }
    } 
    return false;
}

const isFAQ = (utterance = '') => {
    for(let faq of Object.keys(rootFAQs)) {
        if (utterance === rootFAQs[faq]) {
            return true;
        }
    }
    return false;
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

            if (utterance === rootIssues.tellMeAboutUdacity) {
                session.beginDialog(dialogs.keys.tellAboutUdacity);
            } 
            else if (utterance === rootIssues.whatIsCost) {

            }  
            else {
                // Bot failed to understand.
               session.send(promptHelper.getMessageAsSuggestedAction(session, botMessages.didNotUnderstand));
            }
        }
    ]);
};