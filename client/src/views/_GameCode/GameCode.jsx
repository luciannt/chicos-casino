import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InviteScreen from "../../layout/InviteScreen/InviteScreen";
import Cable from "actioncable";
import { LOGIN, SET_GAME_SUBSCRIPTIONS } from "../../reducers/constants";
import styles from "./styles/GameCode.module.scss";
import { useParams } from "react-router-dom";
import Game from "../../components/Game/Game";
import loading from "../../assets/accessories/silver_coin_gif.gif";

const GameCode = () => {
  const dispatch = useDispatch();
  const gameChannel = useSelector((state) => state.connections.game);
  const session = useSelector((state) => state.sessions);
  const game = useSelector((state) => state.game);

  const { code } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const createSocket = () => {
      const cable = Cable.createConsumer("ws://localhost:3000/cable");

      const gameConnection = cable.subscriptions.create(
        {
          channel: "GameChannel",
        },
        {
          received: (data) => {
            if (data.type) {
              if (data.type === "CURRENT_PLAYERS") {
                dispatch({
                  type: data.type,
                  payload: { players: { ...data.payload }, me: session?.id },
                });
              } else {
                dispatch(data);
              }
            }
          },
          game_check: () => {
            gameConnection.perform("game_check", {
              user_id: session?.id,
              code,
            });
          },
          new_game: () => {
            dispatch({ type: "RESET_GAME", payload: {} });
            gameConnection.perform("new_game", {
              user_id: session?.id,
            });
          },
          start_game: () => {
            gameConnection.perform("start_game", {
              code,
            });
          },
          hit: () => {
            gameConnection.perform("hit", {
              code,
              user_id: session?.id,
            });
          },
          stand: () => {
            gameConnection.perform("stand", {
              code,
              user_id: session?.id,
            });
          },
        }
      );

      dispatch({ type: SET_GAME_SUBSCRIPTIONS, payload: gameConnection });
    };

    createSocket();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!game?.end) {
        gameChannel?.game_check();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [gameChannel]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!session.id || !session.current_game_code !== code) {
        axios.get("/me").then((res) => {
          dispatch({ type: LOGIN, payload: res.data });
        });
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {session?.current_game_code === code && !game?.started && (
        <InviteScreen />
      )}
      {session?.current_game_code === code &&
      game?.is_viable &&
      game?.started ? (
        <Game />
      ) : (
        <div className={styles["join-attempt"]}>
          <p>Attempting to join game...</p>
          <img src={loading} />
        </div>
      )}
    </div>
  );
};

export default GameCode;
