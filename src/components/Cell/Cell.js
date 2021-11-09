import React from "react";
import "./Cell.css";
import Knight from "../Figures/Knight/Knight";
import Pawn from "../Figures/Pawn/Pawn";
import Queen from "../Figures/Queen/Queen";
import { Transition } from 'react-transition-group';
import { BLACK, KNIGHT, PAWN } from "../../constants/constants";
function Cell({
  id,
  figure,
  onDragStart,
  onBoardDrop,
  onDrop,
  onDragEnd,
  onDragOver,
  onDragLeave,
  nextMove,
  victory,
}) {
  const duration = 1000;

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: {
      opacity: 1,
      transform: nextMove === BLACK ? "rotate(180deg)" : "rotate(0deg)",
    },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
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
    figure.name === KNIGHT ? (
      <Knight color={figure.color} />
    ) : figure.name === PAWN ? (
      <Pawn color={figure.color} />
    ) : (
      <Queen color={figure.color} />
    )
  ) : null;

  return (
    <div
      id={id}
      style={{ background: color }}
      className={"cell"}
      onDrop={(e) => onBoardDrop(e, id)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {/*<Transition in={!!figure} timeout={duration}>*/}
      {/*  {(state) => (*/}
      {/*    <div*/}
      {/*      className={*/}
      {/*        !!figure && figure.color === nextMove && !victory.status*/}
      {/*          ? "figure-place full"*/}
      {/*          : "figure-place empty"*/}
      {/*      }*/}
      {/*      style={{*/}
      {/*        ...defaultStyle,*/}
      {/*        // ...transitionStyles[state],*/}
      {/*      }}*/}
      {/*      draggable={!!figure && figure.color === nextMove}*/}
      {/*      onDragStart={(e) => onDragStart(e, id, figure)}*/}
      {/*      onDrop={(e) => onDrop(e)}*/}
      {/*      onDragEnd={onDragEnd}*/}
      {/*    >*/}
      {/*      {figureImage}*/}
      {/*    </div>*/}

      <div
          className={
            !!figure && figure.color === nextMove && !victory.status
                ? "figure-place full"
                : "figure-place empty"
          }
          draggable={!!figure && figure.color === nextMove}
          onDragStart={(e) => onDragStart(e, id, figure)}
          onDrop={(e) => onDrop(e)}
          onDragEnd={onDragEnd}
          style={nextMove === BLACK ? { transform: "rotate(180deg)" } : { transform: "rotate(360deg)" }}
      >
        {figureImage}
      </div>
      {/*  )}*/}
      {/*</Transition>*/}
    </div>
  );
}

export default Cell;
