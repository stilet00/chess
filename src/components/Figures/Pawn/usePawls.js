import { getOppositeColor } from "../../../hooks/commonHooks";

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
      color === "white"
        ? currentCell.id - 9 === endCellID || currentCell.id - 7 === endCellID
        : currentCell.id + 9 === endCellID || currentCell.id + 7 === endCellID;
    const moveCheck =
      color === "white" ? currentCell.id - 8 : currentCell.id + 8;
    const bigMoveCheck =
      color === "white"
        ? currentCell.id - 16 === endCellID
        : currentCell.id + 16 === endCellID;

    const queenTransformCheck =
      color === "white"
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
      ? { ...currentCell.figure, name: "queen" }
      : null;
    if (figureOnLand) {
      if (figureOnLand.color !== color && attackCheck) {
        if (!queenTransformCheck) {
          setCells(
            cells.map((item) => {
              return item.id === endCellID
                ? {
                    ...item,
                    figure: { ...currentCell.figure, isTouched: true },
                  }
                : item.id === currentCell.id
                ? { ...item, figure: null }
                : item;
            })
          );
        } else {
          setCells(
            cells.map((item) => {
              return item.id === endCellID
                ? { ...item, figure: { ...queen } }
                : item.id === currentCell.id
                ? { ...item, figure: null }
                : item;
            })
          );
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
        setCells(
          cells.map((item) => {
            return item.id === endCellID
              ? { ...item, figure: { ...currentCell.figure, isTouched: true } }
              : item.id === currentCell.id
              ? { ...item, figure: null }
              : item;
          })
        );
      } else {
        setCells(
          cells.map((item) => {
            return item.id === endCellID
              ? { ...item, figure: { ...queen } }
              : item.id === currentCell.id
              ? { ...item, figure: null }
              : item;
          })
        );
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

  return {
    pawlMoves,
  };
}
