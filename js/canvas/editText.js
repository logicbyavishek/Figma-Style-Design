// editText.js
// Handles text edit mode on double click

import { interactionMode, setInteraction, clearInteraction } from "./interactionState.js";

function initTextEditing(canvas) {
  canvas.addEventListener("dblclick", (e) => {
    const textEl = e.target.closest(".text-element");
    if (!textEl) return;

    enterEditMode(textEl);
  });
}

function enterEditMode(el) {
  if (interactionMode) return;

  setInteraction("text-edit");

  el.contentEditable = "true";
  el.focus();

  // Select all text
  document.execCommand("selectAll", false, null);

  el.classList.add("editing");

  el.addEventListener("blur", () => exitEditMode(el), { once: true });
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      el.blur();
    }
  });
}

function exitEditMode(el) {
  el.contentEditable = "false";
  el.classList.remove("editing");
  clearInteraction();
}

export { initTextEditing };
