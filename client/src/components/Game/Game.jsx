import React from "react";
import { Client } from "boardgame.io/react";
import { GameSetup } from "./GameSetup";
import Board from "../Board/Board";

const Game = Client({ game: GameSetup, board: Board });

export default Game;
