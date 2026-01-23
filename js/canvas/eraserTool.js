// eraserTool.js
// Removes pen dots by proximity (pure DOM)

import { getActiveTool } from "./selectTool.js";
import { interactionMode, setInteraction, clearInteraction } from "./interactionState.js";

let isErasing = false;
let penLayer = null;

const ERASER_RADIUS = 20; // px

function initEraserTool(canvas) {
  penLayer = canvas.querySelector(".pen-layer");

  canvas.addEventListener("mousedown", startErase);
  canvas.addEventListener("mousemove", erase);
  document.addEventListener("mouseup", stopErase);
}

function startErase(e) {
  if (getActiveTool() !== "eraser") return;
  if (interactionMode) return;

  setInteraction("eraser");
  isErasing = true;

  eraseAt(e);
}

function erase(e) {
  if (!isErasing) return;
  eraseAt(e);
}

function stopErase() {
  if (!isErasing) return;

  isErasing = false;
  clearInteraction();
}

function eraseAt(e) {
  const rect = penLayer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const dots = penLayer.querySelectorAll(".pen-dot");

  dots.forEach(dot => {
    const dx = parseFloat(dot.style.left) - x;
    const dy = parseFloat(dot.style.top) - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= ERASER_RADIUS) {
      dot.remove();
    }
  });
}

export { initEraserTool };
