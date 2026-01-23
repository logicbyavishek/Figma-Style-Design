// resetCanvas.js
// Handles reset button animation + canvas clearing

import { clearSelection } from "./selectElement.js";
import { clearInteraction } from "./interactionState.js";

function initResetButton(resetBtn, canvas) {
  resetBtn.addEventListener("click", () => {
    // 1️⃣ Animate button
    resetBtn.classList.add("reset-rotate");

    resetBtn.addEventListener(
      "animationend",
      () => {
        resetBtn.classList.remove("reset-rotate");
      },
      { once: true }
    );

    // 2️⃣ Clear editor state
    clearEditor(canvas);
  });
}

function clearEditor(canvas) {
  // Stop any interaction
  clearInteraction();
  clearSelection();

  // Remove all shapes
  canvas.querySelectorAll(".editor-element").forEach(el => el.remove());

  // Remove pen drawings
  const penLayer = canvas.querySelector(".pen-layer");
  if (penLayer) {
    penLayer.innerHTML = "";
  }
}

export { initResetButton };
