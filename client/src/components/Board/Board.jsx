import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { numMap } from "../../utils/numMap";
import styles from "./styles/Board.module.scss";
import loading from "../../assets/loading.svg";

const image_host =
  "https://raw.githubusercontent.com/luciannt/galaxy-party/main/client/src/assets/cards";

const Board = ({ ctx, G, moves, events }) => {
  const game = useSelector((state) => state.game);
  const gameChannel = useSelector((state) => state.connections.game);

  const { code } = useParams();

  useEffect(() => {
    if (G.turn === 1) {
      if (!game?.players[0]?.active_hand) {
      }
    }
  }, [ctx]);

  const getCardImage = (rank, suit) => {
    return `${image_host}/${numMap[rank]}_${suit}.png`;
  };

  const takeHit = () => {
    gameChannel?.hit();
  };

  const takeStand = () => {
    gameChannel?.stand();
  };

  const get_win = () => {
    if (game?.hand_score > 21) {
      return "BUST";
    } else if (game?.rival_score > 21) {
      return "WIN";
    } else {
      return game?.rival_score > game?.hand_score ? "BUST" : "WIN";
    }
  };

  const newGame = () => {
    gameChannel?.new_game();
  };

  return (
    <div className={styles.container}>
      {!game?.end && (game?.loading || game.is_turn === false) && (
        <div className={styles.loading}>
          <img src={loading} />
          {!game?.is_turn && <p>Wait for your turn...</p>}
        </div>
      )}

      {game?.end && (
        <div
          className={`${styles.end} ${get_win() === "BUST" ? styles.loss : ""}`}
        >
          <p>{get_win()}</p>
          <div className={styles.controls}>
            <button onClick={newGame}>New Game</button>
            <Link to="/menu">Menu</Link>
          </div>
        </div>
      )}
      <div className={styles["rival-cards"]}>
        {Array(game?.rival_hand_count)
          .fill(null)
          .map((card) => (
            <img
              className={styles["card-image"]}
              src={`${image_host}/back.png`}
            />
          ))}
      </div>
      <div className={styles["player-cards"]}>
        {game?.is_turn && !game?.end && (
          <div className={styles.control}>
            <button onClick={takeHit}>Hit</button>
            <button onClick={takeStand}>Stand</button>
          </div>
        )}
        {game?.hand?.map((card) => (
          <img
            className={styles["card-image"]}
            src={getCardImage(card.rank, card.suit)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
