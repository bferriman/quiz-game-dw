import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";
import AnswerButton from "../../components/AnswerButton";
import "./style.css";

function Quiz(props) {
  const { name, inProgress } = props.location.state;
  const [quiz, setQuiz] = useState({
    name: "loading...",
    questions: [
      {
        text: "loading...",
        status: "unanswered",
        answers: ["loading...", "loading...", "loading...", "loading..."],
      },
    ],
  });
  const [quizIndex, setQuizIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    imageURL: "",
    imageAlt: "",
  });

  // called if user chose to continue a stored quiz in progress
  const loadQuizInProgress = (quizName) => {
    // load and parse quizzes in local storage
    const quizzesJSON = localStorage.getItem("quizzes");
    const quizzes = JSON.parse(quizzesJSON);

    // iterate through stored quizzes to find the one we want
    let index = 0;
    quizzes.forEach((q, i) => {
      if (q.name === quizName) {
        index = i;
      }
    });
    const quiz = quizzes[index];

    // iterate through questions to find index of first unanswered question
    let nextQuestion = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (quiz.questions[i].status === "unanswered") {
        nextQuestion = i;
        break;
      }
    }

    setQuiz(quiz);
    setQuizIndex(nextQuestion);
  };

  // called if user chose to start a new quiz
  const loadQuiz = (quizName) => {
    // get quiz data from server
    API.getQuiz(quizName).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        // mark all questions as unanswered
        res.data.questions.forEach((question) => {
          question["status"] = "unanswered";
        });
        setQuiz(res.data);
        setQuizIndex(0);
      }
    });
  };

  useEffect(() => {
    if (inProgress === true) {
      //load from local storage
      loadQuizInProgress(name);
    } else {
      //load new quiz from server
      loadQuiz(name);
    }
  }, []);

  const storeQuizState = () => {
    const quizzesJSON = localStorage.getItem("quizzes");
    let quizzes = JSON.parse(quizzesJSON);
    if (quizzes === null) {
      quizzes = [];
    } else {
      // iterate through stored quizzes to find the current quiz
      let index = undefined;
      quizzes.forEach((q, i) => {
        if (q.name === quiz.name) {
          index = i;
        }
      });
      if (index !== undefined) {
        quizzes.splice(index, 1);
      }
    }
    quizzes.push(quiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  };

  const deleteFromStorage = () => {
    const quizzesJSON = localStorage.getItem("quizzes");
    let quizzes = JSON.parse(quizzesJSON);
    if (quizzes === null) {
      return;
    } else {
      // iterate through stored quizzes to find the current quiz
      let index = undefined;
      quizzes.forEach((q, i) => {
        if (q.name === quiz.name) {
          index = i;
        }
      });
      if (index !== undefined) {
        quizzes.splice(index, 1);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
      }
    }
  };

  const showFeedback = (answerIsCorrect, gameIsOver) => {
    answerIsCorrect
      ? setFeedback({
          show: true,
          imageURL: "./images/correct.png",
          imageAlt: "Answer Correct!",
        })
      : setFeedback({
          show: true,
          imageURL: "./images/incorrect.png",
          imageAlt: "Answer Incorrect!",
        });
    setTimeout(() => {
      gameIsOver ? setGameOver(true) : setQuizIndex(quizIndex + 1);
      setFeedback({
        show: false,
        imageURL: "",
        imageAlt: "",
      });
    }, 1000);
  };

  const handleAnswerSubmit = (index) => {
    const question = quiz.questions[quizIndex];
    API.submitAnswer(quiz.name, question.text, question.answers[index]).then(
      (res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          res.data === true
            ? (question.status = "correct")
            : (question.status = "incorrect");
          if (quiz.questions[quizIndex + 1] === undefined) {
            //reached end of quiz
            deleteFromStorage();
            showFeedback(res.data, true);
          } else {
            storeQuizState();
            showFeedback(res.data, false);
          }
        }
      }
    );
  };

  const redirectUser = () => {
    if (gameOver === true) {
      return (
        <Redirect
          to={{
            pathname: "/score",
            state: {
              quiz: quiz,
            },
          }}
        />
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 progress-tracker pr-5 mt-4">
            {`${quizIndex + 1}/${quiz.questions.length}`}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 mb-5 px-4" id="question">
            {feedback.show === false ? (
              quiz.questions[quizIndex].text
            ) : (
              <img
                className="feedback-image"
                src={feedback.imageURL}
                alt={feedback.imageAlt}
              ></img>
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10" id="answers">
            <div className="row">
              {quiz.questions[quizIndex].answers.map((answer, i) => {
                return (
                  <AnswerButton
                    index={i}
                    clickHandler={handleAnswerSubmit}
                    key={i}
                  >
                    {answer}
                  </AnswerButton>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {redirectUser()}
    </>
  );
}

export default Quiz;
