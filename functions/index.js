const functions = require("firebase-functions");
const app = require('express')();

const {
    getAllQuestions,
    postOneQuestion,
    getOneQuestion,
    deleteQuestion,
    editQuestion,
} = require('./apis/functions')


app.get('/questions', getAllQuestions);
app.get('/question/:questionId', getOneQuestion);
app.post('/question', postOneQuestion);
app.delete('/question/:questionId', deleteQuestion);
app.put('/question/:questionId', editQuestion)






exports.api = functions.https.onRequest(app);