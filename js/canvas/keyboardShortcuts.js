// keyboardShortcuts.js
import { getSelectedElement, clearSelection } from "./selectElement.js";
import { saveCanvasState } from "./storage.js";

function initKeyboardShortcuts(canvas) {
  document.addEventListener("keydown", (e) => {
    const el = getSelectedElement();
    if (!el) return;

    // ❌ Ignore typing inside inputs / textarea
    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    // 🗑 DELETE
    if (e.key === "Delete") {
      e.preventDefault();
      el.remove();
      clearSelection();
      saveCanvasState(canvas);
      return;
    }

    // 🔼 MOVE UP (bring forward)
    if (e.key === "ArrowUp") {
      e.preventDefault();
      moveLayerUp(el, canvas);
      saveCanvasState(canvas);
      return;
    }

    // 🔽 MOVE DOWN (send backward)
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveLayerDown(el, canvas);
      saveCanvasState(canvas);
      return;
    }
  });
}

/* ---------- helpers ---------- */

function moveLayerUp(el, canvas) {
  const next = el.nextElementSibling;
  if (next) {
    canvas.insertBefore(next, el);
  }
}

function moveLayerDown(el, canvas) {
  const prev = el.previousElementSibling;
  if (prev) {
    canvas.insertBefore(el, prev);
  }
}

export { initKeyboardShortcuts };
