import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./styles/Board.module.scss";

const image_host = "https://raw.githubusercontent.com/luciannt/galaxy-party/main/client/src/assets/cards"

const Board = ({ ctx, G, moves, events }) => {
  const game = useSelector((state) => state.game);
  const gameChannel = useSelector((state) => state.connections.game);

  const { code } = useParams();

  useEffect(() => {
    if (ctx.turn === 1) {
      if (!game?.players[0]?.active_hand) {
      }
    }
  }, [ctx]);

  const getCardImage = (rank, suit) => {
    return `${image_host}/${}`
  }

  return <div className={styles.container}>{
    game.hand.map(card => (
      <img src={getCardImage(card.rank, card.suit)} />
    ))
  }</div>;
};

export default Board;
