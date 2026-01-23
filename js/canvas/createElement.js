// createElement.js
// Responsible ONLY for creating elements on canvas

import { getActiveTool, clearActiveTool } from "./selectTool.js";

function initElementCreation(canvas) {
  canvas.addEventListener("click", (e) => {
    const activeTool = getActiveTool();

    // For now, we ONLY support rectangle
    if (activeTool !== "rectangle") return;

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const element = document.createElement("div");
    element.classList.add("rectangle-element");

    element.style.position = "absolute";
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.width = "120px";
    element.style.height = "120px";

    canvas.appendChild(element);

    // IMPORTANT: remove active tool after creation
    clearActiveTool();
  });
}

export { initElementCreation };
