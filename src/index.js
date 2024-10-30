import "./css/style.css";
import { boardsDisplay } from "./ui/boardsDisplay";

const container = document.getElementById("container");
container.append(boardsDisplay());
