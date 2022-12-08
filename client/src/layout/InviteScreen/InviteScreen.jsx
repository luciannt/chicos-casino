import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import loading from "../../assets/loading.svg";

import styles from "./styles/InviteScreen.module.scss";

const InviteScreen = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { code } = useParams();

  const game = useSelector((state) => state.game);

  console.log(game.players);

  return (
    <div className={styles["container"]}>
      <img src={loading} />
      <h2>Waiting for more players...</h2>
      <p
        className={styles["invite-code"]}
        onClick={() => {
          setShowAlert(true);
          navigator.clipboard.writeText(code);

          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }}
      >
        Invite Code: {showAlert ? "Copied!" : code}
      </p>
      {game?.players.map((player, i) => (
        <>
          <p className={styles.player}>{player?.username}</p>

          {game?.players.length > 1 && i !== 1 && (
            <p className={styles.versus}>VS</p>
          )}
        </>
      ))}
    </div>
  );
};

export default InviteScreen;
