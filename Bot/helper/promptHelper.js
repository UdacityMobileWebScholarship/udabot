const delay = 1000;

module.exports = (builder) => {
    return {
        getMessageAsSuggestedAction: (session, botMessage) => {
            const actions = [];

            for(let opt of Object.keys(botMessage.options)) {
                actions.push(builder.CardAction.imBack(session, botMessage.options[opt], botMessage.options[opt]));
            }

            let botReply = botMessage.getMessage();
            botReply.forEach((reply, index)=>{
                if (index < botReply.length -1 ) {// We want to send prompts on last message 
                    session.send(reply);
                    session.delay(delay);
                }
            })
            let message = new builder.Message(session)
                .text(botReply[botReply.length - 1])
                .suggestedActions(
                    builder.SuggestedActions.create(
                        session, actions
                    )
                );
            return message;
        }
    }
}