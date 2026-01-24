// propertiesPanel.js
import { getSelectedElement } from "./selectElement.js";

function initPropertiesPanel() {
  const panel = document.querySelector(".right-sidebar");
  const content = document.querySelector(".properties-content");
  const canvas = document.querySelector(".canvas-content");

  // ===== EMPTY STATE =====
  const empty = document.createElement("div");
  empty.className = "properties-empty";
  empty.textContent = "Select an element to edit properties";
  panel.appendChild(empty);

  content.style.display = "none";
  empty.style.display = "block";

  // ===== INPUT REFERENCES =====
  const typeEl = document.getElementById("prop-type");

  const xInput = document.getElementById("prop-x");
  const yInput = document.getElementById("prop-y");
  const wInput = document.getElementById("prop-width");
  const hInput = document.getElementById("prop-height");
  const rotInput = document.getElementById("prop-rotation");

  const bgInput = document.getElementById("prop-bg");
  const radiusInput = document.getElementById("prop-radius");
  const swatch = document.querySelector(".color-swatch");

  const textSection = document.getElementById("text-section");
  const textInput = document.getElementById("prop-text");

  // ===== COLOR PICKER =====
  const hiddenColorPicker = document.createElement("input");
  hiddenColorPicker.type = "color";
  hiddenColorPicker.style.display = "none";
  panel.appendChild(hiddenColorPicker);

  swatch.addEventListener("click", () => {
    hiddenColorPicker.value = bgInput.value || "#ffffff";
    hiddenColorPicker.click();
  });

  hiddenColorPicker.addEventListener("input", () => {
    bgInput.value = hiddenColorPicker.value;
    bgInput.dispatchEvent(new Event("input"));
  });

  // ===== SELECTION EVENTS =====
  document.addEventListener("element:selected", () => {
    content.style.display = "block";
    empty.style.display = "none";
    syncFromCanvas();
    startLiveSync();
  });

  document.addEventListener("element:deselected", () => {
    content.style.display = "none";
    empty.style.display = "block";
    stopLiveSync();
  });

  // ✅ CORRECT BLANK CANVAS DESELECT (CAPTURE PHASE)
  canvas.addEventListener(
    "mousedown",
    (e) => {
      const clickedElement = e.target.closest(".editor-element");
      if (!clickedElement) {
        content.style.display = "none";
        empty.style.display = "block";
        stopLiveSync();
      }
    },
    true // 🔴 capture phase — critical
  );

  // ===== READ FROM CANVAS =====
  function syncFromCanvas() {
    const el = getSelectedElement();
    if (!el) return;

    typeEl.textContent = getTypeName(el);

    xInput.value = parseInt(el.style.left) || 0;
    yInput.value = parseInt(el.style.top) || 0;

    wInput.value = el.offsetWidth;
    hInput.value = el.offsetHeight;

    rotInput.value = getRotation(el);

    const bg = getComputedStyle(el).backgroundColor;
    bgInput.value = rgbToHex(bg);
    swatch.style.backgroundColor = bg;

    radiusInput.value =
      parseInt(getComputedStyle(el).borderRadius) || 0;

    if (el.classList.contains("text-element")) {
      textSection.style.display = "block";
      textInput.value = el.textContent || "";
    } else {
      textSection.style.display = "none";
      textInput.value = "";
    }
  }

  // ===== WRITE BACK (CLAMPED) =====
  xInput.addEventListener("input", () => applyNumber(xInput, "left", 0));
  yInput.addEventListener("input", () => applyNumber(yInput, "top", 0));
  wInput.addEventListener("input", () => applyNumber(wInput, "width", 1));
  hInput.addEventListener("input", () => applyNumber(hInput, "height", 1));

  rotInput.addEventListener("input", () => {
    const el = getSelectedElement();
    if (!el) return;
    const val = clamp(rotInput.value, 0);
    rotInput.value = val;
    el.style.transform = `rotate(${val}deg)`;
  });

  bgInput.addEventListener("input", () => {
    const el = getSelectedElement();
    if (!el) return;
    el.style.backgroundColor = bgInput.value;
    swatch.style.backgroundColor = bgInput.value;
  });

  radiusInput.addEventListener("input", () => {
    const el = getSelectedElement();
    if (!el) return;
    const val = clamp(radiusInput.value, 0);
    radiusInput.value = val;
    el.style.borderRadius = `${val}px`;
  });

  textInput.addEventListener("input", () => {
    const el = getSelectedElement();
    if (!el || !el.classList.contains("text-element")) return;
    el.textContent = textInput.value;
  });

  // ===== LIVE SYNC =====
  let rafId = null;

  function startLiveSync() {
    if (rafId) return;
    const loop = () => {
      if (getSelectedElement()) {
        syncFromCanvas();
        rafId = requestAnimationFrame(loop);
      }
    };
    loop();
  }

  function stopLiveSync() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function applyNumber(input, prop, min) {
    const el = getSelectedElement();
    if (!el) return;
    const val = clamp(input.value, min);
    input.value = val;
    el.style[prop] = `${val}px`;
  }
}

// ===== HELPERS =====
function getTypeName(el) {
  if (el.classList.contains("rectangle-element")) return "Rectangle";
  if (el.classList.contains("circle-element")) return "Circle";
  if (el.classList.contains("triangle-element")) return "Triangle";
  if (el.classList.contains("text-element")) return "Text";
  if (el.classList.contains("image-element")) return "Image";
  return "Element";
}

function getRotation(el) {
  const transform = getComputedStyle(el).transform;
  if (transform === "none") return 0;

  const [a, b] = transform
    .split("(")[1]
    .split(")")[0]
    .split(",");

  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}

function rgbToHex(rgb) {
  if (!rgb) return "#000000";
  if (rgb.startsWith("#")) return rgb;

  const nums = rgb.match(/\d+/g);
  if (!nums) return "#000000";

  return (
    "#" +
    nums.slice(0, 3)
      .map(n => parseInt(n).toString(16).padStart(2, "0"))
      .join("")
  );
}

function clamp(value, min = 0) {
  const num = Number(value);
  if (isNaN(num)) return min;
  return Math.max(min, num);
}

export { initPropertiesPanel };
