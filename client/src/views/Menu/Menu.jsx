import React from "react";
import { useEffect } from "react";

import styles from "./styles/Menu.module.scss";
import Cable from "actioncable";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  GAME_CREATED,
  LOGIN,
  SET_GAME_SUBSCRIPTIONS,
} from "../../reducers/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Menu = () => {
  const dispatch = useDispatch();
  const gameChannel = useSelector((state) => state.connections.game);
  const session = useSelector((state) => state.sessions.id);

  const [inviteCode, setInviteCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const createSocket = () => {
      if (!session?.id) {
        axios.get("/me").then((res) => {
          dispatch({ type: LOGIN, payload: { ...res.data } });
        });
      }

      const cable = Cable.createConsumer("ws://localhost:3000/cable");

      const gameConnection = cable.subscriptions.create(
        {
          channel: "GameChannel",
        },
        {
          received: (data) => {
            if (data.action) {
              dispatch(JSON.parse(data));
            }

            if (data.type === GAME_CREATED) {
              navigate(`/game/${data.payload}`);
            }
          },
          new_game: () => {
            gameConnection.perform("new_game", {
              user_id: session?.id || session,
            });
          },
        }
      );

      dispatch({ type: SET_GAME_SUBSCRIPTIONS, payload: gameConnection });
    };

    createSocket();
  }, []);

  const onCreateGame = () => {
    gameChannel?.new_game();
  };

  const onChangeHandler = (e) => {
    setInviteCode(e.target.value);
  };

  const onJoinGame = () => {
    navigate(`/game/${inviteCode}`);
  };

  return (
    <div>
      <div className={styles.menu}>
        <div className={styles.createGame}>
          <h2>Create Game</h2>
          <h4>Must have two players to start, max four players</h4>
          <button onClick={onCreateGame}>Create</button>
        </div>
        <div className={styles.joinGame}>
          <h2>Join Game</h2>
          <h4>Input game code to join an existing match</h4>
          <input
            type="text"
            placeholder="Enter game code"
            onChange={onChangeHandler}
          />
          <button onClick={onJoinGame}>Join</button>
        </div>
      </div>
      <div className={styles.scores}>
        <button onClick={onJoinGame}>Your Scores</button>
      </div>
    </div>
  );
};

export default Menu;
