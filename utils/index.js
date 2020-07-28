const randomize = (arr) => {
  //using Fisher Yates method
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

exports.buildClientQuizObj = (quizName, data) => {
  const dataArr = data.split("\n");
  const quiz = {
    name: quizName,
    questions: [],
  };

  for (let i = 0; i < (dataArr.length + 1) / 6; i++) {
    let question = {
      text: dataArr[i * 6],
      answers: [
        dataArr[i * 6 + 1].replace(" (correct)", ""),
        dataArr[i * 6 + 2],
        dataArr[i * 6 + 3],
        dataArr[i * 6 + 4],
      ],
    };
    randomize(question.answers);
    quiz.questions.push(question);
  }
  randomize(quiz.questions);

  return quiz;
};

exports.buildServerQuizObj = (quizName, data) => {
  const dataArr = data.split("\n");
  const quiz = {
    name: quizName,
    questions: [],
  };

  for (let i = 0; i < (dataArr.length + 1) / 6; i++) {
    let question = {
      text: dataArr[i * 6],
      answers: [
        {
          text: dataArr[i * 6 + 1].replace(" (correct)", ""),
          isCorrect: true,
        },
        {
          text: dataArr[i * 6 + 2],
          isCorrect: false,
        },

        {
          text: dataArr[i * 6 + 3],
          isCorrect: false,
        },

        {
          text: dataArr[i * 6 + 4],
          isCorrect: false,
        },
      ],
    };
    quiz.questions.push(question);
  }
  return quiz;
};
