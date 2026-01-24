// penTool.js
// Pure DOM-based pen tool (no canvas, no svg)

import { getActiveTool } from "./selectTool.js";
import { interactionMode, setInteraction, clearInteraction } from "./interactionState.js";

let isDrawing = false;
let penLayer = null;
let lastX = null;
let lastY = null;


const PEN_COLOR = "#d83535";
const PEN_SIZE = 4;

function initPenTool(canvas) {
  penLayer = canvas.querySelector(".pen-layer");

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  document.addEventListener("mouseup", stopDraw);
}

function startDraw(e) {
  if (getActiveTool() !== "pen") return;
  if (interactionMode) return;

  setInteraction("pen");
  isDrawing = true;

  penLayer.style.pointerEvents = "auto";

  const pos = getRelativePos(e);
  lastX = pos.x;
  lastY = pos.y;

  drawDot(pos.x, pos.y);
}

function draw(e) {
  if (!isDrawing) return;

  const pos = getRelativePos(e);
  drawLine(lastX, lastY, pos.x, pos.y);

  lastX = pos.x;
  lastY = pos.y;
}

function drawLine(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const step = 2; // smaller = smoother (1–3 best)
  const steps = distance / step;

  for (let i = 0; i < steps; i++) {
    const x = x1 + (dx * i) / steps;
    const y = y1 + (dy * i) / steps;
    drawDot(x, y);
  }
}


function stopDraw() {
  if (!isDrawing) return;

  isDrawing = false;
  lastX = null;
  lastY = null;

  penLayer.style.pointerEvents = "none";
  clearInteraction();
}

function getRelativePos(e) {
  const rect = penLayer.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}


function drawDot(x, y) {
  const dot = document.createElement("div");
  dot.classList.add("pen-dot");

  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.width = `${PEN_SIZE}px`;
  dot.style.height = `${PEN_SIZE}px`;
  dot.style.backgroundColor = PEN_COLOR;
  dot.style.borderRadius = "50%";
  dot.style.position = "absolute";
  dot.style.pointerEvents = "none";

  penLayer.appendChild(dot);
}



export { initPenTool };
