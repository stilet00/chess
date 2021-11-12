import {
  CellFields,
  COORDINATES,
  KNIGHT,
  PAWN,
  QUEEN,
  WHITE,
} from "../../constants/constants";
import { useState } from "react";
import { moveKnight } from "../Figures/Knight/moveKnight";
import { movePawn } from "../Figures/Pawn/movePawn";
import { moveQueen } from "../Figures/Queen/moveQueen";
import { getOppositeColor } from "../../utils/utils";
import {
  CellInterface,
  CellField,
  Coordinates,
  Figure,
} from "../../interfaces/interfaces";

export function useBoard() {
  const [cells, setCells] = useState<CellField>(CellFields);
  const [coordinates, setCoordinates] = useState(COORDINATES);
  const [takenFigures, setTakenFigures] = useState({
    white: [],
    black: [],
  });
  const [grabbedFigure, setGrabbedFigure] =
    useState<CellInterface | any>(undefined);
  const [nextMove, setNextMove] = useState(WHITE);

  function moveFigure(id: number) {
    const state = {
      cells,
      setCells,
      grabbedFigure,
      setGrabbedFigure,
      setTakenFigures,
      takenFigures,
      setNextMove,
      coordinates,
      setCoordinates,
      setBoard,
      endCellId: id,
    };
    switch (grabbedFigure.figure.name) {
      case KNIGHT:
        moveKnight(state);
        break;
      case PAWN:
        movePawn(state);
        break;
      case QUEEN:
        moveQueen(state);
        break;
      default:
        break;
    }
  }

  function setBoard(
    cells: Array<CellInterface>,
    setCells: any,
    figure: Figure,
    currentCell: CellInterface,
    setNextMove: any,
    coordinates: Coordinates,
    setCoordinates: any,
    endCellID: number
  ) {
    setCells(
      cells.map((item) =>
        item.id === endCellID
          ? { ...item, figure: { ...figure, isTouched: true } }
          : item.id === currentCell.id
          ? { ...item, figure: null }
          : { ...item }
      )
    );
    if (currentCell.figure) {
      setNextMove(getOppositeColor(currentCell.figure.color));
    }

    setCoordinates({
      letters: coordinates.letters.reverse(),
      numbers: coordinates.numbers.reverse(),
    });
  }

  return {
    moveFigure,
    coordinates,
    takenFigures,
    cells,
    setGrabbedFigure,
    nextMove,
  };
}
