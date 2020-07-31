import React from "react";
import "./style.css";

function Result(props) {
  const { question, status } = props;

  const getStatusImg = () => {
    if (status === "correct") {
      return (
        <img
          className="status-image"
          src={"./images/check.png"}
          alt="checkmark"
        ></img>
      );
    } else {
      return (
        <img
          className="status-image"
          src={"./images/redx.png"}
          alt="red X"
        ></img>
      );
    }
  };

  return (
    <tr>
      <td>{question}</td>
      <td>{getStatusImg()}</td>
    </tr>
  );
}

export default Result;
