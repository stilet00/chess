import React, { useEffect, useState } from "react";
import "./Board.css";
import { CellFields, COORDINATES } from "../../constants/constants";
import Cell from "../Cell/Cell";
import TakenFigures from "../TakenFigures/TakenFigures";
import { usePawls } from "../Figures/Pawn/usePawls";
import { useKnights } from "../Figures/Knight/useKnights";
import Marking from "../Marking/Marking";
import { getOppositeColor } from "../../hooks/useOppositeColor";
function Board(props) {
  const [cells, setCells] = useState(CellFields);
  const [currentCell, setCurrentCell] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(null);
  const [takenFigures, setTakenFigures] = useState({
    white: [],
    black: [],
  });
  const [moveOrder, setMoveOrder] = useState("white");
  const [victory, setVictory] = useState({ status: false, winner: null });
  const [coordinates, setCoordinates] = useState(COORDINATES);
  const { pawlMoves } = usePawls(
    cells,
    setCells,
    currentCell,
    setCurrentCell,
    setTakenFigures,
    takenFigures,
    setMoveOrder,
    coordinates,
    setCoordinates
  );
  useEffect(() => {
    if (
      !cells.filter((cell) => cell.figure && cell.figure.color === moveOrder)
        .length
    ) {
      setVictory({ status: true, winner: getOppositeColor(moveOrder) });
      alert(getOppositeColor(moveOrder) + " has WON!");
    }
  }, [cells]);
  const { knightMoves } = useKnights(
    cells,
    setCells,
    currentCell,
    setCurrentCell,
    setTakenFigures,
    takenFigures,
    setMoveOrder,
    coordinates,
    setCoordinates
  );
  function dragStartHandler(e, id, figure) {
    e.target.style.opacity = 0.5;
    if (figure.color === moveOrder) {
      setCurrentBackground(e.target.parentNode.style.background);
      setCurrentCell(cells.find((item) => item.id === id));
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
    if (currentCell.figure.name === "knight") {
      knightMoves(id, currentCell.figure.color);
    } else {
      pawlMoves(id, currentCell.figure.color);
    }
  }

  return (
    <div className={"chess"}>
      <h1>Current move: {!victory.status ? moveOrder : "GAME OVER"}</h1>
      <TakenFigures side={"white"} figures={takenFigures.white} />
      <div className="border">
        <Marking direction={"vertical"} inner={coordinates.numbers.reverse()} />
        <div
          className={
            moveOrder === "white" ? "board static-board" : "board rotated-board"
          }
        >
          {cells.reverse().map((cell) => {
            return (
              <Cell
                {...cell}
                key={cell.id}
                onDragStart={dragStartHandler}
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
                onDragEnd={dragEndHandler}
                onDrop={dragDropHandler}
                onBoardDrop={onBoardDrop}
                moveOrder={moveOrder}
                victory={victory}
              />
            );
          })}
        </div>
        <Marking direction={"horizontal"} inner={coordinates.letters} />
      </div>

      <TakenFigures side={"black"} figures={takenFigures.black} />
    </div>
  );
}

export default Board;
