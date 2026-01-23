// dragElement.js
// Responsible ONLY for dragging selected element

import { getSelectedElement } from "./selectElement.js";

let isDragging = false;
let startX = 0;
let startY = 0;
let startMouseX = 0;
let startMouseY = 0;

function initDrag(canvas) {
  canvas.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {
  const selectedEl = getSelectedElement();

  // drag only if clicking the selected element
  if (!selectedEl || e.target !== selectedEl) return;

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

  const newX = startX + dx;
  const newY = startY + dy;

  const selectedEl = getSelectedElement();
  if (!selectedEl) return;

  selectedEl.style.left = `${newX}px`;
  selectedEl.style.top = `${newY}px`;
}

function onMouseUp() {
  isDragging = false;
}

export { initDrag };
