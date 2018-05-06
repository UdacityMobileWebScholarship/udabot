const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const dialogs = require('./dialogs');
const promptHelper = require('../helper/promptHelper')(builder);
const nlpService = require('../NLP/nlpService');
const colors = require('colors');

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

class UTTERANCE_TYPES {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }

    static get FAQ() {
        return 'FAQ';
    }

    static get ISSUE() {
        return 'ISSUE';
    }
}

module.exports = (bot) => {
    // We will call LUIS here to understand user utterance if user has typed instead of clicking a button.
    bot.dialog(dialogs.keys.rootDialog, [
        async (session, args) => {
            let utterance = args.utterance;
            if (utterance === undefined) {
                utterance = '';
            }
            let utteranceType = UTTERANCE_TYPES.UNKNOWN;
            let qnaResponse = {};
            let luisResponse = {};
            if (! botMessages.isSuggestedAction(utterance)) {
                session.sendTyping();
                let response = await nlpService.getResult(utterance);
                luisResponse = response.luisResult;
                qnaResponse = response.qnaResult;
                let luisScore = luisResponse.topScoringIntent.score;
                let qnaScore = qnaResponse.answers[0].score;
                if (luisScore > qnaScore && luisScore > 30) {
                    utteranceType = UTTERANCE_TYPES.ISSUE;
                }
                else if (qnaScore > luisScore && qnaScore > 30) {
                    utteranceType = UTTERANCE_TYPES.FAQ;
                }
            }
            
            if (utteranceType === UTTERANCE_TYPES.FAQ) {
                session.beginDialog(dialogs.keys.faqDialog, {
                    faq: qnaResponse.answers[0].answer
                });
            }
            
            else {
                // Bot failed to understand.
                builder.Prompts.text(session,promptHelper.getMessageAsSuggestedAction(session, botMessages.didNotUnderstand));
            }
        }, 
        (session, result) => {
            let response = result.response;
            session.beginDialog(dialogs.keys.rootDialog, {utterance: response});
        }
    ]);
};