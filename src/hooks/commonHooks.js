export function getOppositeColor(color) {
  return color === "white" ? "black" : "white";
}
export function getVerticalLineCells(cells, currentID) {
  return cells.map((cell) => {
    return (cell.id < currentID && !((currentID - cell.id) % 8)) ||
      (cell.id > currentID && !((currentID - cell.id) % 8))
      ? cell.id
      : null;
  });
}
export function getHorizontalLineCells(cells, currentID) {
  let horizontalArray = [];
  for (let i = 1; i <= 57 && !horizontalArray.length; i += 8) {
    let endBorder = i + 7;
    let collectedArray = [];
    for (let arrayItem = i; arrayItem <= endBorder; arrayItem++) {
      collectedArray.push(arrayItem);
    }
    horizontalArray = collectedArray.includes(currentID) ? collectedArray : [];
  }
  return horizontalArray;
}
export function getRightDiagonalCells(cells, currentID) {
  return cells.map((cell) => {
    return (cell.id < currentID && !((currentID - cell.id) % 9)) ||
      (cell.id > currentID && !((cell.id - currentID) % 9))
      ? cell.id
      : null;
  });
}
export function getLeftDiagonalCheck(currentID, endCellID) {
  return (
    endCellID === currentID - 7 ||
    endCellID === currentID + 7 ||
    endCellID === currentID - 14 ||
    endCellID === currentID + 14 ||
    endCellID === currentID - 21 ||
    endCellID === currentID + 21 ||
    endCellID === currentID - 28 ||
    endCellID === currentID + 28 ||
    endCellID === currentID - 36 ||
    endCellID === currentID + 36 ||
    endCellID === currentID - 43 ||
    endCellID === currentID + 43 ||
    endCellID === currentID - 50 ||
    endCellID === currentID + 50
  );
}
