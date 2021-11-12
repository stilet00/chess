import { QUEEN, WHITE } from "../../../constants/constants";
import { CellInterface } from "../../../interfaces/interfaces";

export function movePawn({
  cells,
  setCells,
  grabbedFigure,
  setGrabbedFigure,
  takenFigures,
  setTakenFigures,
  setNextMove,
  coordinates,
  setCoordinates,
  setBoard,
  endCellId,
}: any) {
  const color = grabbedFigure.figure.color;
  const figureOnEndCell = cells.find(
    (item: CellInterface) => item.id === endCellId
  ).figure;
  const isAnAttack =
    figureOnEndCell &&
    figureOnEndCell.color !== color &&
    (color === WHITE
      ? grabbedFigure.id - 9 === endCellId || grabbedFigure.id - 7 === endCellId
      : grabbedFigure.id + 9 === endCellId ||
        grabbedFigure.id + 7 === endCellId);
  const isOneCellMove =
    color === WHITE ? grabbedFigure.id - 8 : grabbedFigure.id + 8;
  const isTwoCellsMove =
    color === WHITE
      ? grabbedFigure.id - 16 === endCellId
      : grabbedFigure.id + 16 === endCellId;
  const isQueenTransformation = cells
    .map((cell: CellInterface, index: number) => {
      if (color === WHITE) {
        return index < 8 ? index : null;
      }
      return index > 55 ? index : null;
    })
    .includes(endCellId);
  const figureToLand = isQueenTransformation
    ? { ...grabbedFigure.figure, name: QUEEN }
    : grabbedFigure.figure;

  if (figureOnEndCell) {
    if (isAnAttack) {
      setBoard(
        cells,
        setCells,
        figureToLand,
        grabbedFigure,
        setNextMove,
        coordinates,
        setCoordinates,
        endCellId
      );
      setTakenFigures({
        ...takenFigures,
        [color]: [...takenFigures[color], figureOnEndCell],
      });
    } else {
      alert("Can't take");
    }
  } else if (
    isOneCellMove === endCellId ||
    (isTwoCellsMove &&
      !grabbedFigure.figure.isTouched &&
      !cells.find((item: CellInterface) => item.id === isOneCellMove).figure)
  ) {
    setBoard(
      cells,
      setCells,
      figureToLand,
      grabbedFigure,
      setNextMove,
      coordinates,
      setCoordinates,
      endCellId
    );
  } else {
    alert("Wrong move");
    setGrabbedFigure(null);
  }
}
