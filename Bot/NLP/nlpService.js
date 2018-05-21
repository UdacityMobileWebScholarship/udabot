const axios = require('axios').default;
const env = require('dotenv').config();
const ent = require('ent');
const colors = require('colors');
const JSON = require('circular-json');
const winston = require('winston');

const getLuisResult = (utterance) => {
    let luisURL = `https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/${process.env.LUIS_APP_ID}?subscription-key=${process.env.LUIS_APP_KEY}&verbose=true&timezoneOffset=0&q=${utterance}` 
    return axios.get(luisURL, {
        transformResponse: (response) => {
            // LUIS Score by default is from 0-1 and QnAScore is from 0-100.
            // Normalizing score for comparision.
            winston.log('info',`Luis Result : `,response);
            response =  JSON.parse(response);
            response.topScoringIntent.score *= 100;
            return response;
        }
    });
}

const getQnAResult = (utterance) => {
    let QnAUrl = `https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/${process.env.QNA_ID}/generateAnswer`;
    return axios.post(QnAUrl, {
        "question": utterance
    }, {
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": process.env.QNA_KEY,
        },
        transformResponse: (response) => {
            winston.log('info',`QnA Result `, response);
            response = JSON.parse(response);
            if (response["answers"][0]["score"] > 0) {
                let answer = ent.decode(response["answers"][0]["answer"]);
                response["answers"][0]["answer"] = JSON.parse(answer);
            }
            return response;
        }
    });
}

const getResult = (utterance) => {
    return new Promise((resolve, reject) => {
        let results = axios.all([
            getLuisResult(utterance),
            getQnAResult(utterance)
        ])
        .then(axios.spread((luisResult, qnaResult) => {
            
            resolve({
                luisResult: luisResult.data,
                qnaResult: qnaResult.data
            });
        }))
    });
    
}

module.exports = {
    getResult,
    getQnAResult,
    getLuisResult
};