// selectElement.js
// Responsible ONLY for selection lifecycle

import { interactionMode } from "./interactionState.js";

let selectedElement = null;

function initElementSelection(canvas) {
  /**
   * CANVAS HANDLER (capture phase)
   * - select element
   * - deselect on blank canvas
   */
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

      // ✅ Click on blank canvas → deselect
      clearSelection();
    },
    true // 🔴 capture phase is REQUIRED
  );

  /**
   * GLOBAL HANDLER
   * - deselect ONLY if clicking outside canvas AND outside panels
   */
  document.addEventListener("mousedown", (e) => {
    const insideCanvas = e.target.closest(".canvas-content");
    const insideRightPanel = e.target.closest(".right-sidebar");
    const insideLeftPanel = e.target.closest(".left-sidebar");

    // ❌ Ignore clicks inside UI panels
    if (insideRightPanel || insideLeftPanel) return;

    // ❌ Ignore clicks inside canvas (handled above)
    if (insideCanvas) return;

    // ✅ Truly outside editor → deselect
    clearSelection();
  });
}

/* =========================
   Selection API
   ========================= */

function selectElement(el) {
  clearSelection();

  el.classList.add("selected");
  selectedElement = el;

  addResizeHandles(el);
  addRotateHandle(el);

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

  document.dispatchEvent(new CustomEvent("element:deselected"));
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
