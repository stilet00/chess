import React from "react";
import "./Cell.css";
import whitePawn from "../../images/whitePawn.svg";
import blackPawn from "../../images/blackPawn.svg";
import whiteKnight from "../../images/whiteKnight.svg";
import blackKnight from "../../images/blackKnight.svg";
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
  style,
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
  let nameOfImage = figure
    ? figure.color +
      figure.name.split("")[0].toUpperCase() +
      figure.name.slice(1)
    : null;
  let image = figure
    ? nameOfImage === "whiteKnight"
      ? whiteKnight
      : nameOfImage === "blackKnight"
      ? blackKnight
      : nameOfImage === "whitePawn"
      ? whitePawn
      : blackPawn
    : null;
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
          !!figure && figure.color === moveOrder
            ? "figure-place full"
            : "figure-place empty"
        }
        draggable={!!figure && figure.color === moveOrder}
        onDragStart={(e) => onDragStart(e, id, figure)}
        onDrop={(e) => onDrop(e)}
        onDragEnd={onDragEnd}
        style={{ ...style, backgroundImage: "url(" + image + ")" }}
      >
      </div>
    </div>
  );
}

export default Cell;
