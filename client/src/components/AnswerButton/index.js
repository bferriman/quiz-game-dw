import React from "react";
import "./style.css";

function AnswerButton(props) {
  const { index, clickHandler } = props;
  return (
    <button
      className="btn btn-info btn-lg"
      id={`answer${index}`}
      type="button"
      onClick={() => {
        clickHandler(index);
      }}
    >
      {props.children}
    </button>
  );
}

export default AnswerButton;
