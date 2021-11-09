import {CellFields, COORDINATES, KNIGHT, PAWN, QUEEN, WHITE} from "../../constants/constants";
import {useState} from "react";
import {moveKnight} from "../Figures/Knight/moveKnight";
import {movePawn} from "../Figures/Pawn/movePawn";
import {moveQueen} from "../Figures/Queen/moveQueen";
import {getOppositeColor} from "../../utils/utils";

export function useBoard() {
    const [cells, setCells] = useState(CellFields);
    const [coordinates, setCoordinates] = useState(COORDINATES);
    const [takenFigures, setTakenFigures] = useState({
        white: [],
        black: [],
    });
    const [grabbedFigure, setGrabbedFigure] = useState(null);
    const [nextMove, setNextMove] = useState(WHITE);

    function moveFigure(id) {
        const state = {
            cells,
            setCells,
            grabbedFigure,
            setGrabbedFigure,
            setTakenFigures,
            takenFigures,
            setNextMove,
            coordinates,
            setCoordinates,
            setBoard,
            endCellId: id
        };

        switch (grabbedFigure.figure.name) {
            case KNIGHT:
                moveKnight(state);
                break;
            case PAWN:
                movePawn(state);
                break;
            case QUEEN:
                moveQueen(state);
                break;
            default:
                break;
        }
    }

    function setBoard(
        cells,
        setCells,
        figure,
        currentCell,
        setNextMove,
        coordinates,
        setCoordinates,
        endCellID) {
        setCells(cells.map(item => item.id === endCellID
            ? {...item, figure: {...figure, isTouched: true}}
            : item.id === currentCell.id
                ? {...item, figure: null}
                : {...item})
        );
        setNextMove(getOppositeColor(currentCell.figure.color));
        setCoordinates({
            letters: coordinates.letters.reverse(),
            numbers: coordinates.numbers.reverse(),
        });
    }

    return {
        moveFigure,
        coordinates,
        takenFigures,
        cells,
        setGrabbedFigure,
        nextMove
    };
}
