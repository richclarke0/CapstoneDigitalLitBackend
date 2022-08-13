const functions = require("firebase-functions");
const app = require('express')();
const auth = require('./util/auth');

const {
    getAllQuestions,
    postOneQuestion,
    getOneQuestion,
    deleteQuestion,
    editQuestion,
} = require('./apis/functions')

const {
    loginUser,
    signUpUser,
    getUserDetail,
    updateUserDetails,
} = require('./apis/users')

//routes
app.get('/questions', auth, getAllQuestions);
app.get('/question/:questionId', auth, getOneQuestion);
app.post('/question', auth, postOneQuestion);
app.delete('/question/:questionId', auth, deleteQuestion);
app.put('/question/:questionId', auth, editQuestion)


//users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);


exports.api = functions.https.onRequest(app);