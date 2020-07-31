import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./style.css";

function Title() {
  const [quizzes, setQuizzes] = useState([]);
  const [storedQuizzes, setStoredQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState();

  const loadQuizzes = () => {
    API.getQuizzes().then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setQuizzes(res.data);
      }
    });
  };

  const loadStoredQuizzes = () => {
    const quizzes = localStorage.getItem("quizzes");
    if (quizzes) {
      setStoredQuizzes(JSON.parse(quizzes));
    }
  };

  useEffect(() => {
    loadQuizzes();
    loadStoredQuizzes();
  }, []);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const getImageURL = () => {
    const fileName = selectedQuiz ? selectedQuiz.name : "questionmarks";
    return `./images/${fileName}.jpg`;
  };

  const getAltText = () => {
    return selectedQuiz
      ? selectedQuiz.name.replace("_", " ")
      : "Question Marks";
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="my-5" id="image">
              <img
                className="cover"
                src={getImageURL()}
                alt={getAltText()}
              ></img>
            </div>
            <div id="inputs">
              <div className="dropdown my-3 text-center">
                <button
                  className="btn btn-secondary btn-lg dropdown-toggle rounded-pill select-button"
                  type="button"
                  id="quizSelectButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {selectedQuiz
                    ? selectedQuiz.name.replace("_", " ")
                    : "Select Quiz"}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="quizSelectButton"
                >
                  {storedQuizzes.length !== 0 ? (
                    storedQuizzes.map((quiz, i) => {
                      return (
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() =>
                            handleQuizSelect({
                              name: quiz.name,
                              inProgress: true,
                            })
                          }
                          key={i}
                        >
                          {quiz.name.replace("_", " ") + " (in progress...)"}
                        </button>
                      );
                    })
                  ) : (
                    <></>
                  )}
                  {quizzes.map((quiz, i) => {
                    return (
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() =>
                          handleQuizSelect({ name: quiz, inProgress: false })
                        }
                        key={i + 1000}
                      >
                        {quiz.replace("_", " ")}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="my-3 text-center">
                <Link
                  to={{
                    pathname: "/quiz",
                    state: {
                      name: selectedQuiz ? selectedQuiz.name : undefined,
                      inProgress: selectedQuiz
                        ? selectedQuiz.inProgress
                        : undefined,
                    },
                  }}
                >
                  <button
                    className={
                      selectedQuiz
                        ? "btn btn-secondary btn-lg rounded-pill"
                        : "btn btn-secondary btn-lg rounded-pill d-none"
                    }
                    type="button"
                    id="quiz-start-button"
                  >
                    Let's Go!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Title;
