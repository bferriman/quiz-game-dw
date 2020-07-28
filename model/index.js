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

exports.getQuiz = (quizName) => {
  return new Promise((resolve) => {
    const fileName = quizName + ".txt";
    fs.readFile("./model/quizzes/" + fileName, "utf8", function (err, data) {
      if (err) {
        throw err;
      }
      const quiz = buildClientQuizObj(quizName, data);
      resolve(quiz);
    });
  });
};

exports.getAnswer = () => {};

// module.exports.getQuizList = getQuizList;
