// selectElement.js
import { interactionMode } from "./interactionState.js";

let selectedElement = null;

function initElementSelection(canvas) {
  //  CAPTURE PHASE selection
  canvas.addEventListener(
    "mousedown",
    (e) => {
      if (interactionMode) return;

      const element = e.target.closest(".editor-element");

      if (!element) {
        clearSelection();
        return;
      }

      if (element !== selectedElement) {
        selectElement(element);
      }
    },
    true //  CAPTURE PHASE (CRITICAL)
  );
}

function selectElement(el) {
  clearSelection();
  el.classList.add("selected");
  selectedElement = el;

  addResizeHandles(el);
  addRotateHandle(el);
}

function clearSelection() {
  if (!selectedElement) return;

  selectedElement.classList.remove("selected");
  removeResizeHandles(selectedElement);
  removeRotateHandle(selectedElement);
  selectedElement = null;
}

function getSelectedElement() {
  return selectedElement;
}

/* helpers unchanged */
function addResizeHandles(el) {
  ["nw", "ne", "sw", "se"].forEach((pos) => {
    const h = document.createElement("div");
    h.classList.add("resize-handle", pos);
    h.dataset.handle = pos;
    el.appendChild(h);
  });

  const rotate = document.createElement("div");
  rotate.classList.add("rotate-handle");
  el.appendChild(rotate);
}

function removeResizeHandles(el) {
  el.querySelectorAll(".resize-handle").forEach((h) => h.remove());
}
function removeRotateHandle(el) {
  el.querySelectorAll(".rotate-handle").forEach((h) => h.remove());
}

export { initElementSelection, getSelectedElement, clearSelection };
