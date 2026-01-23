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

  addResizeHandles(el);
}

function clearSelection() {
  if (!selectedElement) return;

  selectedElement.classList.remove("selected");
  removeResizeHandles(selectedElement);
  selectedElement = null;
}

function getSelectedElement() {
  return selectedElement;
}

function addResizeHandles(el) {
  const handles = ["nw", "ne", "sw", "se"];

  handles.forEach(pos => {
    const handle = document.createElement("div");
    handle.classList.add("resize-handle", pos);
    handle.dataset.handle = pos;
    el.appendChild(handle);
  });
}

function removeResizeHandles(el) {
  el.querySelectorAll(".resize-handle").forEach(h => h.remove());
}



export {
  initElementSelection,
  getSelectedElement,
  clearSelection
};
