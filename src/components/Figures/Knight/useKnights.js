import { getOppositeColor } from "../../../hooks/commonHooks";

export function useKnights(
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
  function moveCheck(endCellID) {
    return (
      endCellID === currentCell.id - 10 ||
      endCellID === currentCell.id - 6 ||
      endCellID === currentCell.id + 6 ||
      endCellID === currentCell.id + 10 ||
      endCellID === currentCell.id - 15 ||
      endCellID === currentCell.id - 17 ||
      endCellID === currentCell.id + 17 ||
      endCellID === currentCell.id + 15
    );
  }
  function knightMoves(endCellID, color) {
    const figureOnLand = cells.find((item) => item.id === endCellID).figure;
    const oppositeColor = getOppositeColor(color);
    if (!figureOnLand) {
      if (moveCheck(endCellID)) {
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
    } else {
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
    }
  }

  return {
    knightMoves,
  };
}
