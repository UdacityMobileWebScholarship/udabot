# Udabot - Udacity pathfinder bot <img src="https://imgur.com/OwBSPh4.png" height="40px" align="right"/>

The repository contains the source code for **Udabot** - A chat bot developed as a **gift to Udacity by students of Udacity.** The development started as a collaboration between few students selected for google mobile web specialist scholarship.

## Getting started

The repo contains 3 core components
1. Bot 
2. Webchat control
3. Udabot frontend webpage

**Bot :** This component contains the code to set up a bot server. The server handles the HTTP requests, calls LUIS whenever needed and manages the conversation flow. 

**Webchat control :** Webchat control is the React based chat component of the Udabot. To change UI, or to add additional functionality to bot, update this component. 

**Udabot frontend webpage :** This is React based component for the website of Udacity. This contains a reference to webchat control as a child component.

Refer to [wiki](https://github.com/UdacityMobileWebScholarship/udabot/wiki) to understand how to setup the code.

## :heart: Tech stacks :heart:

- [Microsoft Bot framework](https://dev.botframework.com/) - Framework to support bot operations
- [Webchat Control](https://github.com/Microsoft/BotFramework-WebChat) - Custom implementation for chat UI
- [React js](https://reactjs.org) - UI code to host webchat and make bot as a progressive web bot.
- [LUIS.ai](https://www.luis.ai) - NLP service
