import axios from "axios";

export default {
  getQuizzes: function () {
    return axios.get("/api/quiz");
  },

  getQuiz: function (quizName) {
    return axios.get(`/api/quiz/${quizName}`);
  },

  submitAnswer: function (quizName, question, answer) {
    return axios.post(`/api/quiz/${quizName}`, {
      question: question,
      answer: answer
    });
  }
};
