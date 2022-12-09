import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { numMap } from "../../utils/numMap";
import styles from "./styles/Board.module.scss";

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
    console.log("RANK", rank);
    return `${image_host}/${numMap[rank]}_${suit}.png`;
  };

  console.log(game);

  return (
    <div className={styles.container}>
      <div className={styles["rival-cards"]}>
        {Array.from(String(game?.rival_card_count || 0), Number).map((card) => (
          <img
            className={styles["card-image"]}
            src={`${image_host}/back.png`}
          />
        ))}
      </div>
      <div className={styles["player-cards"]}>
        {game?.hand.map((card) => (
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
