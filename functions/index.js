const functions = require("firebase-functions");
const app = require('express')();

const {
    getAllQuestions
} = require('./apis/questions')


app.get('/questions', getAllQuestions);





exports.api = functions.https.onRequest(app);