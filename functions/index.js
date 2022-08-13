const functions = require("firebase-functions");
const app = require('express')();

const {
    getAllQuestions,
    postOneQuestion,
    getOneQuestion,
    deleteQuestion,
} = require('./apis/functions')


app.get('/questions', getAllQuestions);
app.get('/question/:questionId', getOneQuestion)
app.post('/question', postOneQuestion)
app.delete('/question/:questionId', deleteQuestion)





exports.api = functions.https.onRequest(app);