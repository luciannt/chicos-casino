import React, { useContext } from "react";
import { useEffect } from "react";
import { CableContext } from "../../context/cable";

const Menu = () => {
  const cableContext = useContext(CableContext);

  useEffect(() => {
    console.log(cableContext.cable.connections);
    const game = cableContext.cable.subscriptions.create(
      {
        channel: "GameChannel",
      },
      {
        received: (data) => console.log(data),
      }
    );
  }, []);

  const onCreateGame = () => {};
  return (
    <div>
      <button onClick={onCreateGame()}>Create Game</button>
    </div>
  );
};

export default Menu;
