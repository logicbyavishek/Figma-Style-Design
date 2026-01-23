import { initToolSelection, getActiveTool } from "./selectTool.js";
import { initElementCreation } from "./createElement.js";
import { initElementSelection } from "./selectElement.js";
import { initDrag } from "./dragElement.js";
import { initResize } from "./resizeElement.js";
import { initRotate } from "./rotateElement.js";
import { initTextEditing } from "./editText.js";
import { initPenTool } from "./penTool.js";
import { initEraserTool } from "./eraserTool.js";
import { initResetButton } from "./resetCanvas.js";
import { initImageTool } from "./imageTool.js";





const canvas = document.querySelector(".canvas-content");
const resetBtn = document.querySelector(".reset-btn");




initToolSelection();
initElementCreation(canvas);
initElementSelection(canvas);
initDrag(canvas);
initResize();
initRotate();
initTextEditing(canvas);
initPenTool(canvas);
initEraserTool(canvas);
initResetButton(resetBtn,canvas);
initImageTool(canvas);

