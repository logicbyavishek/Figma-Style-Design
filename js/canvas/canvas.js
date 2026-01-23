import { initToolSelection, getActiveTool } from "./selectTool.js";
import { initElementCreation } from "./createElement.js";

const canvas = document.querySelector(".canvas-content");

initToolSelection();
initElementCreation(canvas);