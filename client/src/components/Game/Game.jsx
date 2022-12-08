import React from "react";
import { Client } from "boardgame.io/react";
import { Blackjack } from "./GameSetup";
import Board from "../Board/Board";

const Game = Client({
  game: Blackjack,
  board: Board,
});

export default Game;
