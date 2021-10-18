export function usePawls(
  cells,
  setCells,
  currentCell,
  setCurrentCell,
  setTakenFigures,
  takenFigures,
  setMoveOrder,
) {
  function pawlMoves(endCellID, color) {

    const figureOnLand = cells.find((item) => item.id === endCellID).figure;
    const oppositeColor = color === "white" ? "black" : "white";
    const attackCheck = color === "white" ? currentCell.id - 9 === endCellID || currentCell.id - 7 === endCellID : currentCell.id + 9 === endCellID || currentCell.id + 7 === endCellID;
    const moveCheck = color === "white" ? currentCell.id - 8 : currentCell.id + 8;
    const bigMoveCheck = color === "white" ? currentCell.id - 16 === endCellID : currentCell.id + 16 === endCellID;
    if (figureOnLand) {
      if (
        figureOnLand.color !== color &&
        (attackCheck)
      ) {
        setCells(
          cells.map((item) => {
            return item.id === endCellID
              ? { ...item, figure: { ...currentCell.figure, isTouched: true } }
              : item.id === currentCell.id
              ? { ...item, figure: null }
              : item;
          })
        );
        setTakenFigures({
          ...takenFigures,
          [color]: [...takenFigures[color], figureOnLand],
        });
        setMoveOrder(oppositeColor);
      } else {

        alert("Can't take");
      }
    } else if (
        moveCheck === endCellID ||
      (bigMoveCheck &&
        !currentCell.figure.isTouched &&
        !cells.find((item) => item.id === moveCheck).figure)
    ) {
      setCells(
        cells.map((item) => {
          return item.id === endCellID
            ? { ...item, figure: { ...currentCell.figure, isTouched: true } }
            : item.id === currentCell.id
            ? { ...item, figure: null }
            : item;
        })
      );
      setMoveOrder(oppositeColor);
    } else {
      alert("Wrong move");
      setCurrentCell(null);
    }
  }

  return {
    pawlMoves,
  };
}
