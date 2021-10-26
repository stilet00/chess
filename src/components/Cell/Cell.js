import React from "react";
import "./Cell.css";
import Knight from "../Figures/Knight/Knight";
import Pawn from "../Figures/Pawn/Pawn";
import Queen from "../Figures/Queen/Queen";
function Cell({
  id,
  figure,
  onDragStart,
  onBoardDrop,
  onDrop,
  onDragEnd,
  onDragOver,
  onDragLeave,
  moveOrder,
  victory,
}) {
  let color;
  if (
    id < 9 ||
    (id > 16 && id < 25) ||
    (id > 32 && id < 41) ||
    (id > 48 && id < 57)
  ) {
    color = id % 2 ? "grey" : "brown";
  } else {
    color = id % 2 ? "brown" : "grey";
  }
  let figureImage = figure ? (
    figure.name === "knight" ? (
      <Knight color={figure.color} />
    ) : figure.name === "pawn" ? (
      <Pawn color={figure.color} />
    ) : (
      <Queen color={figure.color} />
    )
  ) : null;
  return (
    <div
      id={id}
      style={{ background: color }}
      className={"single-cell"}
      onDrop={(e) => onBoardDrop(e, id)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div
        className={
          !!figure && figure.color === moveOrder && !victory.status
            ? "figure-place full"
            : "figure-place empty"
        }
        draggable={!!figure && figure.color === moveOrder}
        onDragStart={(e) => onDragStart(e, id, figure)}
        onDrop={(e) => onDrop(e)}
        onDragEnd={onDragEnd}
        style={moveOrder === "black" ? { transform: "rotate(180deg)" } : null}
      >
        {figureImage}
      </div>
    </div>
  );
}

export default Cell;
