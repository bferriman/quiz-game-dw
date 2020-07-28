const { getQuizList, getQuiz, getAnswer } = require("../model");

exports.sendQuizList = async (req, res) => {
  let quizzes = await getQuizList();
  res.json(quizzes);
};

exports.sendQuiz = async (req, res) => {
  let quiz = await getQuiz(req.params.quizName, "client");
  res.json(quiz);
};

exports.checkAnswer = async (req, res) => {
  const { question, answer } = req.body;
  let quiz = await getQuiz(req.params.quizName, "server");
  const correctAnswer = await getAnswer(quiz, question);
  res.json(answer === correctAnswer);
};
