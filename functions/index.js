const functions = require("firebase-functions");
const app = require('express')();

const {
    getAllQuestions,
    postOneQuestion,
} = require('./apis/functions')


app.get('/questions', getAllQuestions);
app.post('/question', postOneQuestion)





exports.api = functions.https.onRequest(app);