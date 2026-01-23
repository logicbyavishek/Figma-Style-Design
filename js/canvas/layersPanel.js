// layersPanel.js
// Phase 2: Canvas ↔ Layers selection sync (corrected)

import { getSelectedElement , selectElement } from "./selectElement.js";

function initLayersPanel(canvas) {
  const layerList = document.querySelector(".layer-list");
  const layerEmpty = document.querySelector(".layer-empty");
  const layerCount = document.querySelector(".layer-count");

  function syncLayers() {
    const elements = canvas.querySelectorAll(".editor-element");

    layerCount.textContent = `(${elements.length})`;

    // Empty state
    if (elements.length === 0) {
      layerEmpty.style.display = "block";
      layerList.style.display = "none";
      layerList.innerHTML = "";
      return;
    }

    layerEmpty.style.display = "none";
    layerList.style.display = "block";
    layerList.innerHTML = "";

    // Topmost first
    [...elements].reverse().forEach((el) => {
      const type = getElementType(el);
      const id = el.dataset.id;

      const item = document.createElement("div");
      item.className = "layer-item";
      item.dataset.id = id;

      item.innerHTML = `
        <span class="layer-icon">${getIcon(type)}</span>
        <span class="layer-name">${formatName(type)}</span>
      `;

      // 🔴 IMPORTANT: stop canvas CAPTURE mousedown
      item.addEventListener("mousedown", (e) => {
        e.stopPropagation();
      });

      // Click layer → select canvas element
      item.addEventListener("click", () => {
        selectElement(el);
      });

      layerList.appendChild(item);
    });

    // 🔁 Re-apply active layer AFTER rebuild
    const selectedEl = getSelectedElement();
    if (selectedEl) {
      setActiveLayer(selectedEl.dataset.id);
    }
  }

  // Observe canvas element changes
  const observer = new MutationObserver(syncLayers);
  observer.observe(canvas, { childList: true });

  // Initial render
  syncLayers();

  // Canvas → Layers selection sync
  document.addEventListener("element:selected", (e) => {
    setActiveLayer(e.detail.id);
  });

  document.addEventListener("element:deselected", () => {
    clearActiveLayer();
  });
}

/* ---------- helpers ---------- */

function getElementType(el) {
  if (el.classList.contains("rectangle-element")) return "rectangle";
  if (el.classList.contains("circle-element")) return "circle";
  if (el.classList.contains("triangle-element")) return "triangle";
  if (el.classList.contains("text-element")) return "text";
  if (el.classList.contains("image-element")) return "image";
  return "element";
}

function formatName(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getIcon(type) {
  const icons = {
    rectangle: `<i class="ri-checkbox-blank-line"></i>`,
    circle: `<i class="ri-checkbox-blank-circle-line"></i>`,
    triangle: `<i class="ri-triangle-line"></i>`,
    text: `<i class="ri-text"></i>`,
    image: `<i class="ri-image-line"></i>`,
  };
  return icons[type] || `<i class="ri-shape-line"></i>`;
}

function setActiveLayer(id) {
  document.querySelectorAll(".layer-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.id === id);
  });
}

function clearActiveLayer() {
  document.querySelectorAll(".layer-item").forEach((item) => {
    item.classList.remove("active");
  });
}

export { initLayersPanel };
