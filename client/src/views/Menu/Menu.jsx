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

import NavBar from "../../components/NavBar/NavBar";

const Menu = () => {
  const dispatch = useDispatch();
  const gameChannel = useSelector((state) => state.connections.game);
  const session = useSelector((state) => state.sessions.id);
  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState("");

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
      <NavBar />
      <div className={styles.menu}>
        <button
          className={styles.settings}
          onClick={() => navigate("/settings")}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/561/561196.png" />
        </button>
        <h3>{session?.username}</h3>
        <div className={styles.createGame}>
          <h2>Create Game</h2>
          <h4>Two players are required</h4>
          <button onClick={onCreateGame}>Create</button>
        </div>
        <form className={styles.joinGame} onSubmit={onJoinGame}>
          <h2>Join Game</h2>
          <h4>Input game code to join an existing match</h4>
          <div>
            <input
              type="text"
              placeholder="Enter game code"
              onChange={onChangeHandler}
            />
            <button type="submit">Join</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Menu;
