// createElement.js
// Responsible ONLY for creating elements on canvas

import { getActiveTool, clearActiveTool } from "./selectTool.js";

let isCreating = false;
let startX = 0;
let startY = 0;
let previewEl = null;

function initElementCreation(canvas) {
  canvas.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {
  const activeTool = getActiveTool();
  if (activeTool !== "rectangle") return;

  const rect = e.currentTarget.getBoundingClientRect();

  isCreating = true;
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;

  // create preview rectangle
  previewEl = document.createElement("div");
  previewEl.classList.add("rectangle-element");
  previewEl.style.position = "absolute";
  previewEl.style.left = `${startX}px`;
  previewEl.style.top = `${startY}px`;
  previewEl.style.width = "0px";
  previewEl.style.height = "0px";
  previewEl.style.opacity = "0.5";

  e.currentTarget.appendChild(previewEl);
}

function onMouseMove(e) {
  if (!isCreating || !previewEl) return;

  const canvas = previewEl.parentElement;
  const rect = canvas.getBoundingClientRect();

  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);

  previewEl.style.width = `${width}px`;
  previewEl.style.height = `${height}px`;
  previewEl.style.left = `${Math.min(startX, currentX)}px`;
  previewEl.style.top = `${Math.min(startY, currentY)}px`;
}

function onMouseUp() {
  if (!isCreating) return;

  isCreating = false;

  if (previewEl) {
    previewEl.style.opacity = "1";
    previewEl = null;
  }

  clearActiveTool();
}

export { initElementCreation };
