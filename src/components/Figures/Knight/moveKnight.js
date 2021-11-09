export function moveKnight({
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
        if (moveCheck(endCellId, grabbedFigure)) {
            setBoard(cells, setCells, grabbedFigure.figure, grabbedFigure, setNextMove, coordinates, setCoordinates, endCellId);
        } else {
            alert("Wrong move");
            setGrabbedFigure(null);
        }
    } else if (figureOnLand.color === color) {
        alert("Can't take");
        setGrabbedFigure(null);
    } else {
        setTakenFigures({
            ...takenFigures,
            [color]: [...takenFigures[color], figureOnLand],
        });
        setBoard(cells, setCells, grabbedFigure.figure, grabbedFigure, setNextMove, coordinates, setCoordinates, endCellId);
    }
}

function moveCheck(endCellID, grabbedFigure) {
    return (
        endCellID === grabbedFigure.id - 10 ||
        endCellID === grabbedFigure.id - 6 ||
        endCellID === grabbedFigure.id + 6 ||
        endCellID === grabbedFigure.id + 10 ||
        endCellID === grabbedFigure.id - 15 ||
        endCellID === grabbedFigure.id - 17 ||
        endCellID === grabbedFigure.id + 17 ||
        endCellID === grabbedFigure.id + 15
    );
}
