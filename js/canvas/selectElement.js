// selectElement.js
// Responsible ONLY for selecting/deselecting canvas elements

let selectedElement = null;

function initElementSelection(canvas) {
  // Click on element → select
  canvas.addEventListener("click", (e) => {
    const target = e.target;

    // Only selectable elements
    if (!target.classList.contains("rectangle-element")) {
      clearSelection();
      return;
    }

    selectElement(target);
    e.stopPropagation();
  });

  // Click on empty canvas → deselect
  canvas.addEventListener("mousedown", (e) => {
    if (e.target === canvas) {
      clearSelection();
    }
  });
}

function selectElement(el) {
  clearSelection();
  el.classList.add("selected");
  selectedElement = el;
}

function clearSelection() {
  if (selectedElement) {
    selectedElement.classList.remove("selected");
    selectedElement = null;
  }
}

function getSelectedElement() {
  return selectedElement;
}

export {
  initElementSelection,
  getSelectedElement,
  clearSelection
};
