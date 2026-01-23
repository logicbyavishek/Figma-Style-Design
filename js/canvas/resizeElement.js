// resizeElement.js
// Responsible ONLY for resizing selected element

import { getSelectedElement } from "./selectElement.js";

let isResizing = false;
let activeHandle = null;
let startX, startY;
let startWidth, startHeight;
let startLeft, startTop;

function initResize() {
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseDown(e) {
  if (!e.target.classList.contains("resize-handle")) return;

  const el = getSelectedElement();
  if (!el) return;

  isResizing = true;
  activeHandle = e.target.dataset.handle;

  const rect = el.getBoundingClientRect();
  const parentRect = el.parentElement.getBoundingClientRect();

  startX = e.clientX;
  startY = e.clientY;
  startWidth = rect.width;
  startHeight = rect.height;
  startLeft = rect.left - parentRect.left;
  startTop = rect.top - parentRect.top;

  e.preventDefault();
}

function onMouseMove(e) {
  if (!isResizing) return;

  const el = getSelectedElement();
  if (!el) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  let newWidth = startWidth;
  let newHeight = startHeight;
  let newLeft = startLeft;
  let newTop = startTop;

  if (activeHandle.includes("e")) newWidth = startWidth + dx;
  if (activeHandle.includes("s")) newHeight = startHeight + dy;
  if (activeHandle.includes("w")) {
    newWidth = startWidth - dx;
    newLeft = startLeft + dx;
  }
  if (activeHandle.includes("n")) {
    newHeight = startHeight - dy;
    newTop = startTop + dy;
  }

  if (newWidth < 20 || newHeight < 20) return;

  el.style.width = `${newWidth}px`;
  el.style.height = `${newHeight}px`;
  el.style.left = `${newLeft}px`;
  el.style.top = `${newTop}px`;
}

function onMouseUp() {
  isResizing = false;
  activeHandle = null;
}

export { initResize };
