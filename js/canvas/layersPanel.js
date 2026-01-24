// layersPanel.js
// Canvas ↔ Layers sync + save wiring

import {
  getSelectedElement,
  selectElement,
  clearSelection
} from "./selectElement.js";

let onActionComplete = null;

function initLayersPanel(canvas, onCanvasActionComplete) {
  onActionComplete = onCanvasActionComplete;

  const layerList = document.querySelector(".layer-list");
  const layerEmpty = document.querySelector(".layer-empty");
  const layerCount = document.querySelector(".layer-count");

  function syncLayers() {
    const elements = canvas.querySelectorAll(".editor-element");

    layerCount.textContent = `(${elements.length})`;

    if (elements.length === 0) {
      layerEmpty.style.display = "block";
      layerList.style.display = "none";
      layerList.innerHTML = "";
      return;
    }

    layerEmpty.style.display = "none";
    layerList.style.display = "block";
    layerList.innerHTML = "";

    [...elements].reverse().forEach((el) => {
      const type = getElementType(el);
      const id = el.dataset.id;

      const item = document.createElement("div");
      item.className = "layer-item";
      item.dataset.id = id;

      item.innerHTML = `
        <span class="layer-icon">${getIcon(type)}</span>
        <span class="layer-name">${formatName(type)}</span>
        <div class="layer-actions">
          <button class="layer-action-btn move-up">
            <i class="ri-arrow-up-s-line"></i>
          </button>
          <button class="layer-action-btn move-down">
            <i class="ri-arrow-down-s-line"></i>
          </button>
          <button class="layer-action-btn delete">
            <i class="ri-delete-bin-7-line"></i>
          </button>
        </div>
      `;

      // prevent canvas capture mousedown
      item.addEventListener("mousedown", (e) => e.stopPropagation());

      // select element
      item.addEventListener("click", () => {
        selectElement(el);
      });

      // 🔼 Move up
      item.querySelector(".move-up").addEventListener("click", (e) => {
        e.stopPropagation();
        if (el.nextElementSibling) {
          canvas.insertBefore(el.nextElementSibling, el);
          afterChange();
        }
      });

      // 🔽 Move down
      item.querySelector(".move-down").addEventListener("click", (e) => {
        e.stopPropagation();
        if (el.previousElementSibling) {
          canvas.insertBefore(el, el.previousElementSibling);
          afterChange();
        }
      });

      // 🗑 Delete
      item.querySelector(".delete").addEventListener("click", (e) => {
        e.stopPropagation();
        el.remove();
        clearSelection();
        afterChange();
      });

      layerList.appendChild(item);
    });

    const selectedEl = getSelectedElement();
    if (selectedEl) {
      setActiveLayer(selectedEl.dataset.id);
    }
  }

  function afterChange() {
    syncLayers();
    save();
  }

  function save() {
    if (typeof onActionComplete === "function") {
      onActionComplete();
    }
  }

  // observe add/remove
  const observer = new MutationObserver(syncLayers);
  observer.observe(canvas, { childList: true });

  syncLayers();

  document.addEventListener("element:selected", (e) => {
    setActiveLayer(e.detail.id);
  });

  document.addEventListener("element:deselected", clearActiveLayer);
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
