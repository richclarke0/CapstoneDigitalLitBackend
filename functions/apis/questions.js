exports.getAllQuestions = (req, res) => {
    questions = [
        {
            'id': '1',
            'pool': '1',
            'question': 'here is a question',
            'img': 'imgurl.jpg',
            'correctAnswer': 'a',
            'answerChoices': {
                'a' : 'answer a',
                'b' : 'answer b',
                'c' : 'answer c',
                'd' : 'answer d',
            }
        },
        {
            'id': '2',
            'pool': '1',
            'question': 'here is a question',
            'img': 'imgurl.jpg',
            'correctAnswer': 'a',
            'answerChoices': {
                'a' : 'answer a',
                'b' : 'answer b',
                'c' : 'answer c',
                'd' : 'answer d',
            }
        },
    ]
    return res.json(questions);
}