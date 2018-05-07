const botMessages = require('../helper/botMessages') ;
const builder = require('botbuilder');
const dialogs = require('./dialogs');
const promptHelper = require('../helper/promptHelper')(builder);
const JSON = require('circular-json');
const winston = require('winston');

module.exports = ((bot) => {
    bot.dialog(dialogs.keys.firstRun, [
        (session) => {
            winston.log('info',`firstRun[0]`);
            builder.Prompts.text(session, promptHelper.getMessageAsSuggestedAction(session, botMessages.initialMessage));
            session.endDialog();
        }
    ])
});

