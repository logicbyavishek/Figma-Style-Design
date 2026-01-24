// dragElement.js
// Responsible ONLY for dragging selected element

import { getSelectedElement } from "./selectElement.js";
import {
  interactionMode,
  setInteraction,
  clearInteraction,
} from "./interactionState.js";

let isDragging = false;
let startX = 0;
let startY = 0;
let startMouseX = 0;
let startMouseY = 0;

// 🔗 store callback safely
let onActionComplete = null;

function initDrag(canvas, onCanvasActionComplete) {
  onActionComplete = onCanvasActionComplete;

  canvas.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {
  const selectedEl = getSelectedElement();

  // drag only if clicking the selected element
  if (!selectedEl || e.target !== selectedEl) return;
  if (interactionMode) return;

  setInteraction("drag");
  isDragging = true;

  const rect = selectedEl.getBoundingClientRect();
  const canvasRect = selectedEl.parentElement.getBoundingClientRect();

  startX = rect.left - canvasRect.left;
  startY = rect.top - canvasRect.top;

  startMouseX = e.clientX;
  startMouseY = e.clientY;

  e.preventDefault();
}

function onMouseMove(e) {
  if (!isDragging) return;

  const dx = e.clientX - startMouseX;
  const dy = e.clientY - startMouseY;

  const selectedEl = getSelectedElement();
  if (!selectedEl) return;

  selectedEl.style.left = `${startX + dx}px`;
  selectedEl.style.top = `${startY + dy}px`;
}

function onMouseUp() {
  if (!isDragging) return; // ✅ IMPORTANT

  isDragging = false;
  clearInteraction();

  // ✅ save ONLY after real drag
  if (typeof onActionComplete === "function") {
    onActionComplete();
  }
}

export { initDrag };
