import React from "react";
import "./style.css";

function AnswerButton(props) {
  const { index, clickHandler } = props;
  return (
    <div className="col-md-6 text-center mb-3">
      <button
        className="btn btn-info btn-lg rounded-pill answer-button"
        id={`answer${index}`}
        type="button"
        onClick={() => {
          clickHandler(index);
        }}
      >
        {props.children}
      </button>
    </div>
  );
}

export default AnswerButton;
