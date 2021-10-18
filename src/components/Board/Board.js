import React, { useState } from "react";
import "./Board.css";
import { CellFields } from "../../constants/constants";
import Cell from "../Cell/Cell";
import TakenFigures from "../TakenFigures/TakenFigures";
import { usePawls } from "../../hooks/usePawls";
import { useKnights } from "../../hooks/useKnights";
function Board(props) {
  const [cells, setCells] = useState(CellFields);
  const [currentCell, setCurrentCell] = useState(null);
  const [takenFigures, setTakenFigures] = useState({
    white: [],
    black: [],
  });
  const [moveOrder, setMoveOrder] = useState("white");
  const { whitePawlMoves, blackPawlMoves } = usePawls(
    cells,
    setCells,
    currentCell,
    setCurrentCell,
    setTakenFigures,
    takenFigures,
    setMoveOrder,
    moveOrder
  );
  const { knightMoves } = useKnights(
    cells,
    setCells,
    currentCell,
    setCurrentCell,
    setTakenFigures,
    takenFigures,
    setMoveOrder,
    moveOrder
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
  function onBoardDrop(e, id, figure) {
    e.preventDefault();
    e.target.style.opacity = "1";
    if (currentCell.figure.name === "knight") {
      knightMoves(id, figure, currentCell.figure.color);
    } else if (currentCell.figure.color === "white") {
      whitePawlMoves(id);
    } else {
      blackPawlMoves(id);
    }
  }

  return (
    <div className={"chess"}>
      <h1>Current move: {moveOrder}</h1>
      <TakenFigures side={"white"} figures={takenFigures.white} />
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
      <TakenFigures side={"black"} figures={takenFigures.black} />
    </div>
  );
}

export default Board;
