import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InviteScreen from "../../layout/InviteScreen/InviteScreen";
import Cable from "actioncable";
import { LOGIN, SET_GAME_SUBSCRIPTIONS } from "../../reducers/constants";

const GameCode = () => {
  const dispatch = useDispatch();
  const gameChannel = useSelector((state) => state.connections.game);
  const session = useSelector((state) => state.sessions.id);

  const navigate = useNavigate();

  useEffect(() => {
    const createSocket = () => {
      if (!session?.id) {
        axios.get("/me").then((res) => {
          console.log(res.data);
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
          },
          game_check: () => {
            gameConnection.perform("game_check", {
              user_id: session?.id || session,
            });
          },
          new_game: () => {
            gameConnection.perform("new_game", {
              user_id: session?.id || session,
            });
          },
        }
      );

      console.log(session?.current_game_code);
      console.log("session", session);

      dispatch({ type: SET_GAME_SUBSCRIPTIONS, payload: gameConnection });
    };

    createSocket();
  }, []);

  useEffect(() => {
    gameChannel.game_check();
  }, [gameChannel]);

  return (
    <div>
      <InviteScreen />
    </div>
  );
};

export default GameCode;
