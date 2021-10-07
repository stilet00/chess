export function useKnights(
  cells,
  setCells,
  currentCell,
  setCurrentCell,
  setTakenFigures,
  takenFigures,
  setMoveOrder,
  moveOrder
) {
  function knightCheck(endCellID) {
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
  function knightMoves(endCellID, figureOnLand, knightColor) {
    if (!figureOnLand) {
      if (knightCheck(endCellID)) {
        setMoveOrder(moveOrder === "white" ? "black" : "white");
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
    } else if (figureOnLand.color === knightColor) {
      alert("Can't take");
      setCurrentCell(null);
    } else {
      setTakenFigures({
        ...takenFigures,
        [knightColor]: [...takenFigures.white, figureOnLand],
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
      setMoveOrder(moveOrder === "white" ? "black" : "white");
    }
  }

  return {
    knightMoves,
  };
}
