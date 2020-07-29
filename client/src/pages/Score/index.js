import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";

function Score(props) {
  const { quiz } = props.location.state;

  return (
    <>
      <div className="container" id="score-report">
        {quiz.questions.map((q, i) => {
          return (
            <div className="row" key={i}>
              <div className="col-md-8">{q.text}</div>
              <div className="col-md-2">{q.status}</div>
            </div>
          );
        })}
      </div>
      <Link to="/">
        <button
          className="btn btn-secondary btn-lg"
          type="button"
          id="return-to-title"
        >
          Play Again!
        </button>
      </Link>
    </>
  );
}

export default Score;
