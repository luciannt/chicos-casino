import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InviteScreen from "../../layout/InviteScreen/InviteScreen";
import Cable from "actioncable";
import { LOGIN, SET_GAME_SUBSCRIPTIONS } from "../../reducers/constants";

import { useParams } from "react-router-dom";

const GameCode = () => {
  const dispatch = useDispatch();
  const gameChannel = useSelector((state) => state.connections.game);
  const session = useSelector((state) => state.sessions);

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
            console.log("DATA", data);
            if (data.action) {
              dispatch(JSON.parse(data));
            }
          },
          game_check: () => {
            gameConnection.perform("game_check", {
              user_id: session?.id,
              code,
            });
          },
          new_game: () => {
            gameConnection.perform("new_game", {
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
      gameChannel?.game_check();
    }, 5000);

    console.log(code, session);

    return () => clearInterval(intervalId);
  }, [gameChannel]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!session.id || !session.current_game_code !== code) {
        axios.get("/me").then((res) => {
          console.log(res.data);
          dispatch({ type: LOGIN, payload: res.data });
        });
      }
    }, 5000);

    console.log(code, session);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {session?.current_game_code !== code && (
        <h1>Attempting to join game...</h1>
      )}
      {session?.current_game_code === code && <InviteScreen />}
    </div>
  );
};

export default GameCode;
