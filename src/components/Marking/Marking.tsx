import React from "react";
import "./Marking.css";
function Marking({ direction, marks }: any) {
  return (
    <div className={`mark-line ${direction}`}>
      {marks.map((mark: string) => {
        return (
          <div className="mark" key={mark}>
            {mark}
          </div>
        );
      })}
    </div>
  );
}

export default Marking;
