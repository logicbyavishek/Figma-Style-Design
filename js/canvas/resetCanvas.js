// resetCanvas.js
// Handles reset button animation + canvas clearing + save wiring

import { clearSelection } from "./selectElement.js";
import { clearInteraction } from "./interactionState.js";

function initResetButton(resetBtn, canvas, onCanvasActionComplete) {
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

    // 3️⃣ Save cleared state
    if (typeof onCanvasActionComplete === "function") {
      onCanvasActionComplete();
    }
  });
}

function clearEditor(canvas) {
  // Stop interactions
  clearInteraction();
  clearSelection();

  // Remove all editor elements
  canvas.querySelectorAll(".editor-element").forEach((el) => el.remove());

  // Clear pen drawings
  const penLayer = canvas.querySelector(".pen-layer");
  if (penLayer) {
    penLayer.innerHTML = "";
  }
}

export { initResetButton };
