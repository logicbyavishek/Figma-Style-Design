// selectTool.js
// Responsible ONLY for tool selection logic

let activeTool = null;

// tools that are allowed to be selected
const selectableTools = [
  "rectangle",
  "triangle",
  "circle",
  "text",
  "pen",
  "image",
  "eraser",
];

function initToolSelection() {
  const toolButtons = document.querySelectorAll(".tool-btn");

  toolButtons.forEach((btn) => {
    const toolType = btn.getAttribute("title");

    if (!selectableTools.includes(toolType)) return;

    btn.addEventListener("click", () => {
      toolButtons.forEach((b) => b.classList.remove("active-tool-select"));

      btn.classList.add("active-tool-select");
      activeTool = toolType;

      //cursor change logic when tools active (Rectangle)
      document.body.style.cursor =
        toolType === "rectangle" ? "crosshair" : "default";

      document.body.classList.add("tool-create-mode"); // when tool is selected
    });
  });
}

function clearActiveTool() {
  const toolButtons = document.querySelectorAll(".tool-btn");
  toolButtons.forEach((btn) => btn.classList.remove("active-tool-select"));

  activeTool = null;
  document.body.style.cursor = "default"; // when tool is cleared
  document.body.classList.remove("tool-create-mode");
}

// getter (read-only access)
function getActiveTool() {
  return activeTool;
}

export { initToolSelection, getActiveTool, clearActiveTool };
