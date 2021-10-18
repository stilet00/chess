export function useKnights(
  cells,
  setCells,
  currentCell,
  setCurrentCell,
  setTakenFigures,
  takenFigures,
  setMoveOrder,
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
    const oppositeColor = color === "white" ? "black" : "white";
    if (!figureOnLand) {
      if (moveCheck(endCellID)) {
        setMoveOrder(oppositeColor);
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
        setCurrentCell(null);
      }
    } else if (figureOnLand.color === color) {
      alert("Can't take");
      setCurrentCell(null);
    } else {
      setTakenFigures({
        ...takenFigures,
        [color]: [...takenFigures.white, figureOnLand],
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
    }
  }

  return {
    knightMoves,
  };
}
