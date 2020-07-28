const fs = require("fs");

function getQuizList() {
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
}

exports.getQuiz = () => {};

exports.getAnswer = () => {};

module.exports.getQuizList = getQuizList;
