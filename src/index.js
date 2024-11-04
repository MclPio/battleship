import "./css/style.css";
import { boardsDisplay } from "./ui/boardsDisplay";
import { Game } from "./modules/game";

const container = document.getElementById("container");
container.append(boardsDisplay());
new Game("real", "computer").start()
