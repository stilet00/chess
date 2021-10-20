import React, { useState } from "react";
import "./Board.css";
import { CellFields, COORDINATES } from "../../constants/constants";
import Cell from "../Cell/Cell";
import TakenFigures from "../TakenFigures/TakenFigures";
import { usePawls } from "../../hooks/usePawls";
import { useKnights } from "../../hooks/useKnights";
import Marking from "../Marking/Marking";
function Board(props) {
  const [cells, setCells] = useState(CellFields);
  const [currentCell, setCurrentCell] = useState(null);
  const [takenFigures, setTakenFigures] = useState({
    white: [],
    black: [],
  });
  const [moveOrder, setMoveOrder] = useState("white");
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
    if (figure.color === moveOrder) {
      setCurrentCell(cells.find((item) => item.id === id));
    } else {
      e.preventDefault();
    }
  }
  function dragLeaveHandler(e) {
    e.target.style.opacity = "1";
  }
  function dragEndHandler(e) {}

  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.opacity = "0.5";
  }

  function dragDropHandler(e) {
    e.preventDefault();
  }
  function onBoardDrop(e, id) {
    e.preventDefault();
    e.target.style.opacity = "1";
    if (currentCell.figure.name === "knight") {
      knightMoves(id, currentCell.figure.color);
    } else {
      pawlMoves(id, currentCell.figure.color);
    }
  }

  return (
    <div className={"chess"}>
      <h1>Current move: {moveOrder}</h1>
      <TakenFigures side={"white"} figures={takenFigures.white} />
      <div className="border">
        <Marking direction={"vertical"} inner={coordinates.numbers.reverse()} />
        <div
          className={"board"}
          style={moveOrder === "black" ? { transform: "rotate(180deg)" } : null}
        >
          {cells.reverse().map((cell) => {
            return (
              <Cell
                style={
                  moveOrder === "black" ? { transform: "rotate(180deg)" } : null
                }
                {...cell}
                key={cell.id}
                onDragStart={dragStartHandler}
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
                onDragEnd={dragEndHandler}
                onDrop={dragDropHandler}
                onBoardDrop={onBoardDrop}
                moveOrder={moveOrder}
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
