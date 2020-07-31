import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import Result from "../../components/Result";

function Score(props) {
  const { quiz } = props.location.state;

  const tabulate = () => {
    const quizLength = quiz.questions.length;
    let numCorrect = 0;
    quiz.questions.forEach((q) => {
      if (q.status === "correct") {
        numCorrect++;
      }
    });
    return `${numCorrect}/${quizLength}`;
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 results my-5 text-center">
            <div className="card">
              <table className="table table-light table-striped mb-0">
                <thead>
                  <tr>
                    <th className="top-left" scope="col">
                      {quiz.name.replace("_", "")}
                    </th>
                    <th scope="col">{tabulate()}</th>
                  </tr>
                </thead>
                <tbody>
                  {quiz.questions.map((q, i) => {
                    return (
                      <Result
                        question={q.text}
                        status={q.status}
                        key={i}
                      ></Result>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Link to="/">
              <button
                className="btn btn-secondary btn-lg rounded-pill mt-5"
                type="button"
                id="return-to-title"
              >
                Play Again!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Score;
