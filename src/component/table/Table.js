import React from "react";

const Table = ({ children }) => {
  return (
    <div className="tableStyle">
      <table>{children}</table>
    </div>
  );
};

export default Table;
