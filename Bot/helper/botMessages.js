module.exports = class BotMessage {
    constructor(messages = [[]], options = {}) {
        this.messages = messages;
        if (this.messages.length === 0) {
            throw new Error(`Messages cannot be empty array.`);
        }
        this.options = options;
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