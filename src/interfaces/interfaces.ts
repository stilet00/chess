export interface Figure {
  name: string;
  color: string;
  isTouched?: boolean;
}
export interface CellInterface {
  id: number;
  figure: Figure | null;
}
export interface Coordinates {
  letters: Array<string>;
  numbers: Array<string>;
}
// export interface CellProps {
// id: number;
// figure: Figure;
// onDragStart: any;
// onBoardDrop: any;
// onDrop: any;
// onDragEnd: any;
// onDragOver: any;
// onDragLeave: any;
// nextMove: string;
// victory: {
//     status: boolean;
//     winner: any;
// };

// }
export interface CellField extends Array<CellInterface> {}
