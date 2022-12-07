import React from "react";

import styles from "./styles/Board.module.scss";

import board from "../../assets/board.png";

export function Board({ ctx, G, moves }) {
  return (
    <div className={styles["board-container"]}>
      {G.cells.map((cell, i) => (
        <div
          className={`${styles.cell} ${styles[cell.type]} ${
            styles[`cell-${i}`]
          }`}
        ></div>
      ))}
      <img src={board} className={styles.board} />
    </div>
  );
}

export default Board;
