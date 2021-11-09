import React, {useEffect, useState} from "react";
import "./Board.css";
import { WHITE, BLACK } from "../../constants/constants";
import Cell from "../Cell/Cell";
import TakenFigures from "../TakenFigures/TakenFigures";
import {useBoard} from "./useBoard";
import Marking from "../Marking/Marking";
import { getOppositeColor } from "../../utils/utils";

function Board(props) {
  const [currentBackground, setCurrentBackground] = useState(null);
  const [victory, setVictory] = useState({ status: false, winner: null });
  const {
    moveFigure,
    cells,
    setGrabbedFigure,
    coordinates,
    takenFigures,
    nextMove
  } = useBoard();
  
  useEffect(() => {
    if (!cells.filter((cell) => cell.figure && cell.figure.color === nextMove).length) {
      const winner = getOppositeColor(nextMove);

      setVictory({ status: true, winner: winner });
      alert(winner + " has WON!");
    }
  }, [cells, nextMove]);

  function dragStartHandler(e, id, figure) {
    e.target.style.opacity = 0.5;
    if (figure.color === nextMove) {
      setCurrentBackground(e.target.parentNode.style.background);
      setGrabbedFigure(cells.find((item) => item.id === id));
    } else {
      e.preventDefault();
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.background = currentBackground;
  }

  function dragEndHandler(e) {
    e.target.style.opacity = 1;
  }

  function dragOverHandler(e) {
    e.preventDefault();
    setCurrentBackground(e.target.parentNode.style.background);
    e.target.style.background = "lightblue";
  }

  function dragDropHandler(e) {
    e.preventDefault();
  }

  function onBoardDrop(e, id) {
    e.preventDefault();
    e.target.style.opacity = 1;
    e.target.style.background = currentBackground;
    moveFigure(id);
  }

  return (
    <div className={"chess"}>
      <h1>
        Current move:
        <span className={`turn-text ${nextMove}`}>
          {!victory.status ? nextMove : "GAME OVER"}
        </span>
      </h1>
      <TakenFigures side={WHITE} figures={takenFigures.white} />
      <div className="border">
        <Marking direction={"vertical"} marks={coordinates.numbers} />
        <div
          className={nextMove === WHITE ? "board static-board" : "board rotated-board"}
        >
          {cells.map(cell => (
              <Cell
                  key={cell.id}
                  {...cell}
                  onDragStart={dragStartHandler}
                  onDragOver={dragOverHandler}
                  onDragLeave={dragLeaveHandler}
                  onDragEnd={dragEndHandler}
                  onDrop={dragDropHandler}
                  onBoardDrop={onBoardDrop}
                  nextMove={nextMove}
                  victory={victory}
              />
          ))}
        </div>
        <Marking direction={"horizontal"} marks={coordinates.letters} />
      </div>
      <TakenFigures side={BLACK} figures={takenFigures.black} />
    </div>
  );
}

export default Board;
