export function usePawls(
  cells,
  setCells,
  currentCell,
  setCurrentCell,
  setTakenFigures,
  takenFigures,
  setMoveOrder,
  moveOrder
) {
  function whitePawlMoves(endCellID) {
    const figureOnLand = cells.find((item) => item.id === endCellID).figure;
    if (figureOnLand) {
      if (
        figureOnLand.color !== "white" &&
        (currentCell.id - 9 === endCellID || currentCell.id - 7 === endCellID)
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
          white: [...takenFigures.white, figureOnLand],
        });
        setMoveOrder(moveOrder === "white" ? "black" : "white");
      } else {
        alert("Can't take");
      }
    } else if (
      currentCell.id - 8 === endCellID ||
      (currentCell.id - 16 === endCellID &&
        !currentCell.figure.isTouched &&
        !cells.find((item) => item.id === currentCell.id - 8).figure)
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
      setMoveOrder(moveOrder === "white" ? "black" : "white");
    } else {
      alert("Wrong move");
      setCurrentCell(null);
    }
  }
  function blackPawlMoves(endCellID) {
    const figureOnLand = cells.find((item) => item.id === endCellID).figure;
    if (figureOnLand) {
      if (
        figureOnLand.color !== "black" &&
        (currentCell.id + 9 === endCellID || currentCell.id + 7 === endCellID)
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
          white: [...takenFigures.white, figureOnLand],
        });
        setMoveOrder(moveOrder === "white" ? "black" : "white");
      } else {
        alert("Can't take");
      }
    } else if (
      currentCell.id + 8 === endCellID ||
      (currentCell.id + 16 === endCellID &&
        !currentCell.figure.isTouched &&
        !cells.find((item) => item.id === currentCell.id + 8).figure)
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
      setMoveOrder(moveOrder === "white" ? "black" : "white");
    } else {
      alert("Wrong move");
      setCurrentCell(null);
    }
  }

  return {
    whitePawlMoves,
    blackPawlMoves,
  };
}
