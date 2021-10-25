import {
  getHorizontalLineCells,
  getLeftDiagonalCheck,
  getOppositeColor,
  getRightDiagonalCells,
  getVerticalLineCells,
} from "../../../hooks/commonHooks";

export function useQueen(
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
  function moveCheck(currentID, endCellID) {
    const verticalArray = getVerticalLineCells(cells, currentID);
    const horizontalArray = getHorizontalLineCells(cells, currentID);
    const rightDiagonalArray = getRightDiagonalCells(cells, currentID);
    return (
      verticalArray.includes(endCellID) ||
      horizontalArray.includes(endCellID) ||
      rightDiagonalArray.includes(endCellID) ||
      getLeftDiagonalCheck(currentID, endCellID)
    );
  }
  function queenMoves(endCellID, color) {
    const figureOnLand = cells.find((item) => item.id === endCellID).figure;
    const oppositeColor = getOppositeColor(color);
    if (!figureOnLand) {
      if (moveCheck(currentCell.id, endCellID)) {
        setMoveOrder(oppositeColor);
        setCoordinates({
          letters: coordinates.letters.reverse(),
          numbers: coordinates.numbers.reverse(),
        });
        setCells(
          cells.map((item) => {
            return item.id === endCellID
              ? { ...item, figure: currentCell.figure }
              : item.id === currentCell.id
              ? { ...item, figure: null }
              : item;
          })
        );
      } else {
        alert("Wrong move");
        setCurrentCell(null);
      }
    } else if (figureOnLand.color === color) {
      alert("Can't take");
      setCurrentCell(null);
    } else if (moveCheck(currentCell.id, endCellID)) {
      setTakenFigures({
        ...takenFigures,
        [color]: [...takenFigures[color], figureOnLand],
      });
      setCells(
        cells.map((item) => {
          return item.id === endCellID
            ? { ...item, figure: currentCell.figure }
            : item.id === currentCell.id
            ? { ...item, figure: null }
            : item;
        })
      );
      setMoveOrder(oppositeColor);
      setCoordinates({
        letters: coordinates.letters.reverse(),
        numbers: coordinates.numbers.reverse(),
      });
    } else {
      alert("Wrong move!");
    }
  }
  return {
    queenMoves,
  };
}
