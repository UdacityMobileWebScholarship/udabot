const allOptions = [];

class BotMessage {
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


module.exports.howDoesThatWork = new BotMessage(
    [
        [
            `Udacity is an innovative online education provider. We offer cutting-edge courses built in partnership with leading companies like Google, AT&T, and Facebook on everything from mastering web design to tech entrepreneurship.`
        ],
        [
            `Our flagship Nanodegree programs set the standard for industry-recognized credentials, where your code is reviewed by experts from these organizations.`
        ]
    ],
    {
        cool: `Cool, let's get started!`
    }
)

module.exports.welcomeMessage = new BotMessage(
    [
        [
            `Hi! Welcome to Udacity.` 
        ],
        [
            `I'm here to tell you all about Udacity.
            Please tell me freely what's on your mind 😀`
        ]
    ],
    {
        tellMeAboutUdacity: `Tell me about Udacity`
    }
)

module.exports.tellMeAboutUdacity = new BotMessage(
    [
        [
            `Udacity is a online portal for self-paced learning whose courses are prepared by tech giants like Google, Amazon, facebook etc .`
        ],
        [
            `It provides some Nanodegree degree programs where you code is reviewed by experts from these organisations.`
        ]
    ],
    {
        awesome: `Awesome`
    }
)

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