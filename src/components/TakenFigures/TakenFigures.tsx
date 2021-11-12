import React from "react";
import "./TakenFigures.css";
import { Figure } from "../../interfaces/interfaces";

function TakenFigures({ side, figures }: any) {
  return (
    <div className={"figure-list"}>
      <h3>
        Taken by <b>{side}</b>
      </h3>
      <ul>
        {figures.map((figure: Figure, id: number) => {
          return <li key={id}>{figure.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default TakenFigures;
