// storage.js

const STORAGE_KEY = "canvas-editor-state";

/* ================= SAVE ================= */

function saveCanvasState(canvas) {
  const elements = canvas.querySelectorAll(".editor-element");

  const data = [...elements].map(el => ({
    id: el.dataset.id,
    classes: [...el.classList],
    x: parseInt(el.style.left) || 0,
    y: parseInt(el.style.top) || 0,
    width: el.offsetWidth,
    height: el.offsetHeight,
    transform: el.style.transform || "",
    zIndex: el.style.zIndex || "",
    styles: {
      backgroundColor: el.style.backgroundColor || "",
      borderRadius: el.style.borderRadius || ""
    },
    text: el.classList.contains("text-element")
      ? el.textContent
      : null
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ================= LOAD ================= */

function loadCanvasState(canvas) {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.warn("Invalid canvas storage data");
    return;
  }

  // 🔴 Clear existing canvas first
  canvas.querySelectorAll(".editor-element").forEach(el => el.remove());

  data.forEach(item => {
    const el = document.createElement("div");

    // Classes
    item.classes.forEach(cls => el.classList.add(cls));

    // Identity
    el.dataset.id = item.id;

    // Position & size
    el.style.position = "absolute";
    el.style.left = `${item.x}px`;
    el.style.top = `${item.y}px`;
    el.style.width = `${item.width}px`;
    el.style.height = `${item.height}px`;

    // Transform & order
    if (item.transform) el.style.transform = item.transform;
    if (item.zIndex) el.style.zIndex = item.zIndex;

    // Styles
    el.style.backgroundColor = item.styles.backgroundColor;
    el.style.borderRadius = item.styles.borderRadius;

    // Text
    if (item.text !== null) {
      el.textContent = item.text;
    }

    canvas.appendChild(el);
  });
}

export { saveCanvasState, loadCanvasState };
