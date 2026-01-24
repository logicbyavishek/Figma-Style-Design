import { initToolSelection } from "./selectTool.js";
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
import { initLayersPanel } from "./layersPanel.js";
import { initPropertiesPanel } from "./propertiesPanel.js";
import { saveCanvasState, loadCanvasState } from "./storage.js";
import { initKeyboardShortcuts } from "./keyboardShortcuts.js";
import { exportJSON, exportHTML } from "./exportManager.js";



const canvas = document.querySelector(".canvas-content");
const resetBtn = document.querySelector(".reset-btn");

loadCanvasState(canvas);

/**
 * CENTRAL SAVE HOOK
 * Call this ONLY when an action is finished
 */
function onCanvasActionComplete() {
  saveCanvasState(canvas);
}

/* ---------- INIT WIRES ---------- */

initToolSelection();

initElementCreation(canvas, onCanvasActionComplete);
initElementSelection(canvas);

initDrag(canvas, onCanvasActionComplete);
initResize(onCanvasActionComplete);
initRotate(onCanvasActionComplete);

initTextEditing(canvas, onCanvasActionComplete);

initPenTool(canvas, onCanvasActionComplete);
initEraserTool(canvas, onCanvasActionComplete);

initResetButton(resetBtn, canvas, onCanvasActionComplete);

initImageTool(canvas, onCanvasActionComplete);

initLayersPanel(canvas, onCanvasActionComplete);

initPropertiesPanel(onCanvasActionComplete);
initKeyboardShortcuts(canvas);

/* ---------- EXPORT & CLOSE ---------- */

document
  .querySelector(".export-json")
  .addEventListener("click", () => {
    exportJSON();
  });

document
  .querySelector(".export-html")
  .addEventListener("click", () => {
    exportHTML();
  });

document
  .querySelector(".close-canvas")
  .addEventListener("click", () => {
    // save before leaving
    saveCanvasState(canvas);

    // redirect
    window.location.href = "index.html";
  });
