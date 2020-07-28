const { getQuizList, getQuiz, getAnswer } = require("../model");

exports.sendQuizList = async (req, res) => {
  let quizzes = await getQuizList();
  res.json(quizzes);
};

exports.sendQuiz = (req, res) => {};

exports.checkAnswer = (req, res) => {};
