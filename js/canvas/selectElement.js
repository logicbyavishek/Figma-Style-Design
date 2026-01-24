// selectElement.js
// Responsible ONLY for selection lifecycle

import { interactionMode } from "./interactionState.js";

let selectedElement = null;

function initElementSelection(canvas) {
  // Capture phase so selection wins over drag/resize
  canvas.addEventListener(
    "mousedown",
    (e) => {
      if (interactionMode) return;

      const element = e.target.closest(".editor-element");

      // ✅ Click on element → select
      if (element) {
        if (element !== selectedElement) {
          selectElement(element);
        }
        return;
      }

      // ✅ Click anywhere inside canvas but NOT on element → deselect
      clearSelection();
    },
    true // capture phase
  );

  // ✅ Click completely outside canvas → deselect
  document.addEventListener("mousedown", (e) => {
    const insideCanvas = e.target.closest(".canvas-content");
    const element = e.target.closest(".editor-element");

    if (!insideCanvas && !element) {
      clearSelection();
    }
  });
}


function selectElement(el) {
  // clear previous selection
  clearSelection();

  // mark selected
  el.classList.add("selected");
  selectedElement = el;

  // add UI handles
  addResizeHandles(el);
  addRotateHandle(el);

  // 🔔 notify rest of system
  document.dispatchEvent(
    new CustomEvent("element:selected", {
      detail: { id: el.dataset.id },
    })
  );
}

function clearSelection() {
  if (!selectedElement) return;

  selectedElement.classList.remove("selected");
  removeResizeHandles(selectedElement);
  removeRotateHandle(selectedElement);
  selectedElement = null;

  document.dispatchEvent(
    new CustomEvent("element:deselected")
  );
}

function getSelectedElement() {
  return selectedElement;
}

/* =========================
   Helpers (LOCAL ONLY)
   ========================= */

function addResizeHandles(el) {
  ["nw", "ne", "sw", "se"].forEach((pos) => {
    const h = document.createElement("div");
    h.classList.add("resize-handle", pos);
    h.dataset.handle = pos;
    el.appendChild(h);
  });
}

function removeResizeHandles(el) {
  el.querySelectorAll(".resize-handle").forEach((h) => h.remove());
}

function addRotateHandle(el) {
  const handle = document.createElement("div");
  handle.classList.add("rotate-handle");
  el.appendChild(handle);
}

function removeRotateHandle(el) {
  el.querySelectorAll(".rotate-handle").forEach((h) => h.remove());
}

export {
  initElementSelection,
  getSelectedElement,
  clearSelection,
  selectElement,
};
