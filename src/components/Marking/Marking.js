import React from "react";
import "./Marking.css";
function Marking({ direction, inner }) {
  return (
    <div className={`mark-line ${direction}`}>
      {inner.map((mark) => {
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
