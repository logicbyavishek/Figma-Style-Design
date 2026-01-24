// rotateElement.js
// Responsible ONLY for rotating selected element

import { getSelectedElement } from "./selectElement.js";
import {
  interactionMode,
  setInteraction,
  clearInteraction
} from "./interactionState.js";

let isRotating = false;
let centerX = 0;
let centerY = 0;
let onActionComplete = null;

function initRotate(onCanvasActionComplete) {
  onActionComplete = onCanvasActionComplete;

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {
  if (!e.target.classList.contains("rotate-handle")) return;
  if (interactionMode) return;

  const el = getSelectedElement();
  if (!el) return;

  setInteraction("rotate");
  isRotating = true;

  const rect = el.getBoundingClientRect();
  centerX = rect.left + rect.width / 2;
  centerY = rect.top + rect.height / 2;

  e.preventDefault();
}

function onMouseMove(e) {
  if (!isRotating) return;

  const el = getSelectedElement();
  if (!el) return;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  el.style.transform = `rotate(${angle}deg)`;
}

function onMouseUp() {
  if (!isRotating) return;

  isRotating = false;
  clearInteraction();

  // ✅ ROTATION COMPLETE → notify canvas
  if (typeof onActionComplete === "function") {
    onActionComplete();
  }
}

export { initRotate };
