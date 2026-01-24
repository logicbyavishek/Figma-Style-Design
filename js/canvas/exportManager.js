// exportManager.js
import { saveCanvasState, getCanvasState } from "./storage.js";

/* ===============================
   EXPORT JSON
================================ */

function exportJSON() {
  const data = getCanvasState();
  if (!data) return;

  downloadFile(
    JSON.stringify(data, null, 2),
    "canvas-layout.json",
    "application/json"
  );
}

/* ===============================
   EXPORT HTML
================================ */

function exportHTML() {
  const data = getCanvasState();
  if (!data) return;

  const html = generateHTML(data);

  downloadFile(
    html,
    "canvas-layout.html",
    "text/html"
  );
}

/* ===============================
   HTML GENERATOR
================================ */

function generateHTML(elements) {
  const body = elements
    .map(el => {
      const style = `
        position:absolute;
        left:${el.x}px;
        top:${el.y}px;
        width:${el.width}px;
        height:${el.height}px;
        transform:${el.transform || "none"};
        background:${el.styles.backgroundColor || "transparent"};
        border-radius:${el.styles.borderRadius || "0"};
        z-index:${el.zIndex || 1};
      `.replace(/\s+/g, " ");

      if (el.classes.includes("text-element")) {
        return `<div style="${style}">${el.text || ""}</div>`;
      }

      if (el.classes.includes("image-element")) {
        return `<img src="${el.src || ""}" style="${style}" />`;
      }

      return `<div style="${style}"></div>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Exported Canvas</title>
<style>
  body {
    margin:0;
    position:relative;
    width:100vw;
    height:100vh;
    background:#0a0a0a;
  }
</style>
</head>
<body>
${body}
</body>
</html>`;
}

/* ===============================
   UTIL
================================ */

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export { exportJSON, exportHTML };
