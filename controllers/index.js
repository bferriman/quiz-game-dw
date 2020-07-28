const { getQuizList, getQuiz, getAnswer } = require("../model");

exports.sendQuizList = async (req, res) => {
  let quizzes = await getQuizList();
  res.json(quizzes);
};

exports.sendQuiz = async (req, res) => {
  let quiz = await getQuiz(req.params.quizId);
  res.json(quiz);
};

exports.checkAnswer = (req, res) => {};
