import { initToolSelection, getActiveTool } from "./selectTool.js";
import { initElementCreation } from "./createElement.js";
import { initElementSelection } from "./selectElement.js";


const canvas = document.querySelector(".canvas-content");

initToolSelection();
initElementCreation(canvas);
initElementSelection(canvas);