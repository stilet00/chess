import React, { useEffect, useState } from "react";
import "./Board.css";
import { WHITE, BLACK } from "../../constants/constants";
import Cell from "../Cell/Cell";
import TakenFigures from "../TakenFigures/TakenFigures";
import { useBoard } from "./useBoard";
import Marking from "../Marking/Marking";
import { getOppositeColor } from "../../utils/utils";
import { Figure, CellInterface } from "../../interfaces/interfaces";

function Board() {
  const [currentBackground, setCurrentBackground] = useState(null);
  const [victory, setVictory] = useState<{
    status: boolean;
    winner: string | any;
  }>({ status: false, winner: null });
  const {
    moveFigure,
    cells,
    setGrabbedFigure,
    coordinates,
    takenFigures,
    nextMove,
  } = useBoard();

  useEffect(() => {
    if (
      !cells.filter(
        (cell: CellInterface) => cell.figure && cell.figure.color === nextMove
      ).length
    ) {
      const winner = getOppositeColor(nextMove);

      setVictory({ status: true, winner: winner });
      alert(winner + " has WON!");
    }
  }, [cells, nextMove]);

  function dragStartHandler(e: any, id: number, figure: Figure) {
    e.target.style.opacity = 0.5;
    if (figure.color === nextMove) {
      setCurrentBackground(e.target.parentNode.style.background);
      setGrabbedFigure(cells.find((cell: CellInterface) => cell.id === id));
    } else {
      e.preventDefault();
    }
  }

  function dragLeaveHandler(e: any) {
    e.target.style.background = currentBackground;
  }

  function dragEndHandler(e: any) {
    e.target.style.opacity = 1;
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    setCurrentBackground(e.target.parentNode.style.background);
    e.target.style.background = "lightblue";
  }

  function dragDropHandler(e: any) {
    e.preventDefault();
  }

  function onBoardDrop(e: any, id: number) {
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
          className={
            nextMove === WHITE ? "board static-board" : "board rotated-board"
          }
        >
          {cells.map((cell: CellInterface) => (
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
