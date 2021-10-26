import React from "react";
import "./TakenFigures.css";
function TakenFigures({ side, figures }) {
  return (
    <div className={"figure-list"}>
      <h3>
        Taken by <b>{side}</b>
      </h3>
      <ul>
        {figures.map((figure, id) => {
          return <li key={id}>{figure.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default TakenFigures;
