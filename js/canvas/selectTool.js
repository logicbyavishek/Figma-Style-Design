// selectTool.js
// Responsible ONLY for tool selection logic

let activeTool = null;

// tools that are allowed to be selected
const selectableTools = ["rectangle", "triangle", "circle", "text", "pen", "image"];

function initToolSelection() {
  const toolButtons = document.querySelectorAll(".tool-btn");

  toolButtons.forEach((btn) => {
    const toolType = btn.getAttribute("title");

    if (!selectableTools.includes(toolType)) return;

    btn.addEventListener("click", () => {
      toolButtons.forEach((b) =>
        b.classList.remove("active-tool-select")
      );

      btn.classList.add("active-tool-select");
      activeTool = toolType;
    });
  });
}

// getter (read-only access)
function getActiveTool() {
  return activeTool;
}

export { initToolSelection, getActiveTool };
