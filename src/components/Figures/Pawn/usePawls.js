import { getOppositeColor } from "../../../hooks/commonHooks";
import { QUEEN, WHITE } from "../../../constants/constants";

export function usePawls(
  cells,
  setCells,
  currentCell,
  setCurrentCell,
  setTakenFigures,
  takenFigures,
  setMoveOrder,
  coordinates,
  setCoordinates
) {
  function pawlMoves(endCellID, color) {
    const figureOnLand = cells.find((item) => item.id === endCellID).figure;
    const oppositeColor = getOppositeColor(color);
    const attackCheck =
      color === WHITE
        ? currentCell.id - 9 === endCellID || currentCell.id - 7 === endCellID
        : currentCell.id + 9 === endCellID || currentCell.id + 7 === endCellID;
    const moveCheck =
      color === WHITE ? currentCell.id - 8 : currentCell.id + 8;
    const bigMoveCheck =
      color === WHITE
        ? currentCell.id - 16 === endCellID
        : currentCell.id + 16 === endCellID;

    const queenTransformCheck =
      color === WHITE
        ? cells
            .map((item, index) => {
              if (index < 8) {
                return index;
              }
            })
            .includes(endCellID)
        : cells
            .map((item, index) => {
              if (index > 55) {
                return index;
              }
            })
            .includes(endCellID);
    const queen = queenTransformCheck
      ? { ...currentCell.figure, name: QUEEN }
      : null;
    if (figureOnLand) {
      if (figureOnLand.color !== color && attackCheck) {
        if (!queenTransformCheck) {
          setFigure(currentCell.figure, endCellID);
        } else {
          setFigure(queen, endCellID);
        }

        setTakenFigures({
          ...takenFigures,
          [color]: [...takenFigures[color], figureOnLand],
        });
        setMoveOrder(oppositeColor);
        setCoordinates({
          letters: coordinates.letters.reverse(),
          numbers: coordinates.numbers.reverse(),
        });
      } else {
        alert("Can't take");
      }
    } else if (
      moveCheck === endCellID ||
      (bigMoveCheck &&
        !currentCell.figure.isTouched &&
        !cells.find((item) => item.id === moveCheck).figure)
    ) {
      if (!queenTransformCheck) {
        setFigure(currentCell.figure, endCellID);
      } else {
        setFigure(queen, endCellID);
      }
      setMoveOrder(oppositeColor);
      setCoordinates({
        letters: coordinates.letters.reverse(),
        numbers: coordinates.numbers.reverse(),
      });
    } else {
      alert("Wrong move");
      setCurrentCell(null);
    }
  }
  function setFigure(figure, endCellID) {
    setCells(
      cells.map((item) => {
        return item.id === endCellID
          ? { ...item, figure: { ...figure, isTouched: true } }
          : item.id === currentCell.id
          ? { ...item, figure: null }
          : item;
      })
    );
  }
  return {
    pawlMoves,
  };
}
