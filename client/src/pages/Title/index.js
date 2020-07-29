import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

function Title() {
  const [quizzes, setQuizzes] = useState([]);
  const [storedQuizzes, setStoredQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState();

  const loadQuizzes = () => {
    console.log("Sending request for quizzes");
    API.getQuizzes().then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        console.log("trying to set quizzes");
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
    console.log(quiz.name + " selected!");
    setSelectedQuiz(quiz);
  };

  return (
    <>
      <h1>Select A Quiz!</h1>
      <div className="dropdown">
        <button
          className="btn btn-secondary btn-lg dropdown-toggle"
          type="button"
          id="quizSelectButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedQuiz ? selectedQuiz.name : "Select Quiz"}
        </button>
        <div className="dropdown-menu" aria-labelledby="quizSelectButton">
          {storedQuizzes.length !== 0 ? (
            storedQuizzes.map((quiz, i) => {
              return (
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() =>
                    handleQuizSelect({ name: quiz.name, inProgress: true })
                  }
                  key={i}
                >
                  {quiz.name + " (in progress...)"}
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
                {quiz}
              </button>
            );
          })}
        </div>
      </div>
      <Link
        to={{
          pathname: "/quiz",
          state: {
            name: selectedQuiz ? selectedQuiz.name : undefined,
            inProgress: selectedQuiz ? selectedQuiz.inProgress : undefined
          }
        }}
      >
        <button
          className="btn btn-secondary btn-lg"
          type="button"
          id="quizSelectButton"
        >
          Let's Go!
        </button>
      </Link>
    </>
  );
}

export default Title;
