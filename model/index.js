const fs = require("fs");
const { buildClientQuizObj, buildServerQuizObj } = require("../utils");

exports.getQuizList = () => {
  return new Promise((resolve) => {
    fs.readdir("./model/quizzes/", function (err, filenames) {
      if (err) {
        throw err;
      }
      resolve(
        filenames.map((file) => {
          return file.replace(".txt", "");
        })
      );
    });
  });
};

exports.getQuiz = (quizName, mode) => {
  return new Promise((resolve, reject) => {
    if (mode !== "client" && mode !== "server") {
      reject("invalid mode argument");
    }
    const fileName = quizName + ".txt";
    fs.readFile("./model/quizzes/" + fileName, "utf8", function (err, data) {
      if (err) {
        throw err;
      }
      const quiz =
        mode === "client"
          ? buildClientQuizObj(quizName, data)
          : buildServerQuizObj(quizName, data);
      resolve(quiz);
    });
  });
};

exports.getAnswer = (quiz, question) => {
  return new Promise((resolve, reject) => {
    quiz.questions.forEach((q) => {
      if (q.text === question) {
        resolve(q.answers[0].text.replace(" (correct)", ""));
      }
    });
  });
};

// module.exports.getQuizList = getQuizList;
