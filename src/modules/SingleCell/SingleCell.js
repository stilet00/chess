import React from "react";
import "./SingleCell.css";
import whitePawn from "../../images/whitePawn.png";
import blackPawn from "../../images/blackPawn.png";
import whiteKnight from "../../images/whiteKnight.png";
import blackKnight from "../../images/blackKnight.png";
function SingleCell({
  id,
  figure,
  onDragStart,
  onBoardDrop,
  onDrop,
  onDragEnd,
  onDragOver,
  onDragLeave,
  moveOrder,
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
  const textColor = figure ? figure.color : null;
  let nameOfImage = figure
    ? figure.color +
      figure.name.split("")[0].toUpperCase() +
      figure.name.slice(1)
    : null;
  let image =
    nameOfImage === "whiteKnight"
      ? whiteKnight
      : nameOfImage === "blackKnight"
      ? blackKnight
      : nameOfImage === "whitePawn"
      ? whitePawn
      : blackPawn;
  return (
    <div
      id={id}
      style={{ background: color }}
      className={"single-cell"}
      onDrop={(e) => onBoardDrop(e, id, figure)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div
        className={!!figure && figure.color === moveOrder ? "figure" : "empty"}
        draggable={!!figure && figure.color === moveOrder}
        style={{ color: textColor }}
        onDragStart={(e) => onDragStart(e, id, figure)}
        onDrop={(e) => onDrop(e)}
        onDragEnd={onDragEnd}
      >
        {figure ? <img src={image} /> : id}
      </div>
    </div>
  );
}

export default SingleCell;
