const { db } = require("../util/admin");

exports.getAllQuestions = (request, response) => {
    db
        .collection('questions')
        .get()
        .then((data) => {
            let questions = []
            data.forEach((doc) => {
                console.log("one thing: ", doc.data())
                questions.push({
                    questionId: doc.id,
                    pool: doc.data().pool,
                    question: doc.data().question,
                    img: doc.data().img,
                    correctAnswer: doc.data().correctAnswer,
                    answerChoices: doc.data().answerChoices
                })
            })
            return response.json(questions)
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code })
        });
};

exports.getOneQuestion = (request, response) => {
    const document = db.doc(`/questions/${request.params.questionId}`);
    document
    .get()
    .then((doc) => {
        if (!doc.exists) {
            return response.status(404).json({ error: 'Question not found' })
        }
        // return document.delete();
        response.json(doc.data());
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
    });
};

exports.postOneQuestion = (request, response) => {
    // i love the use of trim() here
    if (request.body.pool.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    if (request.body.question.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.correctAnswer.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.answerChoicesA.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.answerChoicesB.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.answerChoicesC.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.answerChoicesD.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    //creates a new question object, parsing req.body
    const newQuestion = {
        pool: request.body.pool,
        img: request.body.img,
        question: request.body.question,
        correctAnswer: request.body.correctAnswer,
        answerChoices: {
            a: request.body.answerChoicesA,
            b: request.body.answerChoicesB,
            c: request.body.answerChoicesC,
            d: request.body.answerChoicesD
        },
    }
    //now the actual db submission stuff
    db
        .collection('questions')
        .add(newQuestion)
        .then((doc) => {
            const responseQuestion = newQuestion;
            responseQuestion.id = doc.id;
            return response.json(responseQuestion);
        })
        .catch((err) => {
            response.status(500).json({ error: 'Something went wrong' });
            console.error(err);
        });
};

exports.deleteQuestion = (request, response) => {
    const document = db.doc(`/questions/${request.params.questionId}`);
    let questionText
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: `Question not found: ${request.params.questionId}` })
            }
            if("fresh0" !== request.user.username){
                return response.status(403).json({error:"Unauthorized"})
           }
            questionText = doc.data().question
            return document.delete();
        })
        .then(() => {
            response.json({ message: `Delete successful! ${request.params.questionId} : ${questionText}` });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editQuestion = (request, response) => {
    if (request.body.questionId) {
        response.status(403).json({
            message: "Not allowed to edit the questionId"
        })
    }
    if (request.body.pool.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty' });
    }
    if (request.body.question.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.correctAnswer.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.answerChoicesA.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.answerChoicesB.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.answerChoicesC.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    if (request.body.answerChoicesD.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }

    //creates a new question object, parsing req.body
    const editedQuestion = {
        pool: request.body.pool,
        img: request.body.img,
        question: request.body.question,
        correctAnswer: request.body.correctAnswer,
        answerChoices: {
            a: request.body.answerChoicesA,
            b: request.body.answerChoicesB,
            c: request.body.answerChoicesC,
            d: request.body.answerChoicesD
        },
    }
    //get the doc
    let document = db.collection("questions").doc(`${request.params.questionId}`);
    //push
    
    document.update(editedQuestion)
        .then(() => {
            response.json({ message: "Edit committed to db" })
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({
                error: err.code
            })
        })
}