import {
    getHorizontalLineCells,
    getLeftDiagonalCheck,
    getRightDiagonalCells,
    getVerticalLineCells,
} from "../../../utils/utils";

export function moveQueen({
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
                              endCellId
                          }) {
    const figureOnLand = cells.find((item) => item.id === endCellId).figure;
    const color = grabbedFigure.figure.color;

    if (!figureOnLand) {
        if (moveCheck(cells, grabbedFigure.id, endCellId)) {
            setBoard(cells, setCells, grabbedFigure.figure, grabbedFigure, setNextMove, coordinates, setCoordinates, endCellId);
        } else {
            alert("Wrong move");
            setGrabbedFigure(null);
        }
    } else if (figureOnLand.color === color) {
        alert("Can't take");
        setGrabbedFigure(null);
    } else if (moveCheck(cells, grabbedFigure.id, endCellId)) {
        setTakenFigures({
            ...takenFigures,
            [color]: [...takenFigures[color], figureOnLand],
        });
        setBoard(cells, setCells, grabbedFigure.figure, grabbedFigure, setNextMove, coordinates, setCoordinates, endCellId);
    } else {
        alert("Wrong move!");
    }
}

function moveCheck(cells, currentID, endCellId) {
    const verticalArray = getVerticalLineCells(cells, currentID);
    const horizontalArray = getHorizontalLineCells(cells, currentID);
    const rightDiagonalArray = getRightDiagonalCells(cells, currentID);

    return (
        verticalArray.includes(endCellId) ||
        horizontalArray.includes(endCellId) ||
        rightDiagonalArray.includes(endCellId) ||
        getLeftDiagonalCheck(currentID, endCellId)
    );
}
