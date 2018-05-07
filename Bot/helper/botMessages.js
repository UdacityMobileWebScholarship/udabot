const allOptions = [];

const BotMessage = module.exports.BotMessage = class BotMessage {
    constructor(messages = [[]], options = {}) {
        this.messages = messages;
        if (this.messages.length === 0) {
            throw new Error(`Messages cannot be empty array.`);
        }
        this.options = options;
        for(let opt of Object.keys(options)) {
            allOptions[options[opt]] = true;
        }
    }

    getMessage() {
        let responses = []
        this.messages.forEach((item)=>{
            const messagesLength = item.length;
            const randomIndex = Math.floor(Math.random() * messagesLength);
            responses.push(item[randomIndex]);
        })
        return responses;
    }
}

module.exports.isSuggestedAction = (utterance) => {
    return (allOptions[utterance] === true);
}

module.exports.initialMessage = new BotMessage(
    [
        [
            `Hey there, I’m Udabot! A Udacity chatbot to help make your learning experience udacious by providing personalized course recommendations and mentorship.`
        ]
    ],
    {
        howDoesThatWork: `How does that work?`,
        cool: `Cool, let's get started!`
    }
);

module.exports.awesome = new BotMessage(
    [
        [
            `Hell yeah! It is awesooome. ✌😎️`
        ]
    ],
    {
        getStarted: `Start Learning`,
        whatIsCost: `What is the cost?`
    }
)

module.exports.didNotUnderstand = new BotMessage(
    [
        [
            `😥 Sorry, I did not understood what you said. My vacaubulary is pretty limited.`,
            `😥 Hmm.. I did'nt get you. `,
            `Sorry, my tiny brain can understand only some basic sentences or it will explode. 🤯`
        ],
        [
            `How about choosing one option from below 👇`,
            `Please choose below 👇 options or try a different text.`
        ]
    ],
    {
        getStarted: `Start Learning`,
        whatIsCost: `What is the cost?`
    }
)