// imageTool.js
// Handles image import and placement (DOM-based)

import { clearActiveTool } from "./selectTool.js";
import { interactionMode } from "./interactionState.js";

function initImageTool(canvas) {
  const fileInput = document.getElementById("image-input");

  // Select the image tool button directly
  const imageToolBtn = document.querySelector(
    '.tool-btn[title="image"]'
  );

  if (!imageToolBtn) {
    console.error("Image tool button not found");
    return;
  }

  // Click image tool → open file picker
  imageToolBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // File selected
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      createImageElement(reader.result, canvas);
      clearActiveTool(); // image tool is one-time action
    };

    reader.readAsDataURL(file);
    fileInput.value = "";
  });
}

function createImageElement(src, canvas) {
  if (interactionMode) return;

  const el = document.createElement("div");
  el.classList.add("editor-element", "image-element");

  el.style.left = "100px";
  el.style.top = "100px";
  el.style.width = "240px";
  el.style.height = "160px";

  const img = document.createElement("img");
  img.src = src;
  img.draggable = false;

  el.appendChild(img);
  canvas.appendChild(el);
}

export { initImageTool };
