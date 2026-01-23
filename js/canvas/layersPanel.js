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

  // Topmost element first
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

    // Stop canvas capture-phase mousedown
    item.addEventListener("mousedown", (e) => {
      e.stopPropagation();
    });

    // Click layer → select element (NO drag)
    item.addEventListener("click", () => {
      selectElement(el);
    });

    // 🔼 Move Up (bring forward)
    item.querySelector(".move-up").addEventListener("click", (e) => {
      e.stopPropagation();
      if (el.nextElementSibling) {
        canvas.insertBefore(el.nextElementSibling, el);
        syncLayers();
      }
    });

    // 🔽 Move Down (send backward)
    item.querySelector(".move-down").addEventListener("click", (e) => {
      e.stopPropagation();
      if (el.previousElementSibling) {
        canvas.insertBefore(el, el.previousElementSibling);
        syncLayers();
      }
    });

    // 🗑 Delete
    item.querySelector(".delete").addEventListener("click", (e) => {
      e.stopPropagation();
      el.remove();
      clearSelection();
      syncLayers();
    });

    layerList.appendChild(item);
  });

  // Re-apply active layer after rebuild
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

function moveNode(node, direction) {
  if (!node) return;

  if (direction === "up" && node.nextElementSibling) {
    node.parentNode.insertBefore(node.nextElementSibling, node);
  }

  if (direction === "down" && node.previousElementSibling) {
    node.parentNode.insertBefore(node, node.previousElementSibling);
  }
}



export { initLayersPanel };
