Understood. Below is a **clean, professional, recruiter-grade `README.md`** tailored exactly to your project, constraints, and the **Sheryians Coding School Figma-Style Design Tool challenge**.

You can copy-paste this directly as `README.md`.

---

# Figma-Style Design Tool (DOM-Only)

A Figma-inspired visual design editor built **entirely using HTML, CSS, and Vanilla JavaScript**, without relying on Canvas, SVG engines, or external frameworks.
This project focuses on **core frontend engineering fundamentals**: DOM manipulation, event handling, coordinate math, and state management.

🔗 **Live Demo (Vercel):**
[https://figma-style-design.vercel.app/](https://figma-style-design.vercel.app/)

---

## 📌 Project Context

This project was developed as part of a **Sheryians Coding School frontend challenge**.
The objective was **not** to replicate Figma’s performance or complexity, but to demonstrate a strong grasp of:

* DOM-based rendering
* Interaction design
* Editor-style state handling
* Clean, modular JavaScript architecture

All features are implemented using **standard DOM elements only**.

---

## 🎯 Core Features Implemented

### 1. Element Creation

* Rectangle
* Circle
* Text
* Each element:

  * Is a `<div>` in the DOM
  * Has a unique ID
  * Has default size and position
  * Stores metadata for future operations

---

### 2. Single Element Selection

* Only one element can be selected at a time
* Visual selection indicator (outline)
* Resize handles appear on selection
* Clicking on empty canvas deselects the element
* Centralized selection state shared across tools

---

### 3. Drag, Resize & Rotate

* **Dragging**

  * Mouse-based drag
  * Boundary-restricted (cannot leave canvas)
* **Resizing**

  * Corner-only resize handles
  * Live width/height updates
  * Minimum size constraints
* **Rotation**

  * CSS `transform: rotate()`
  * Rotation state preserved during save/load

---

### 4. Layers Panel

* Lists all elements on the canvas
* Click a layer → selects the element
* Move Up / Move Down controls
* Layer order synced with `z-index`

---

### 5. Properties Panel

Editable properties (context-aware):

* Width
* Height
* Background color
* Text content (for text elements only)

Changes reflect **in real time** on the selected element.

---

### 6. Keyboard Interactions

* `Delete` → removes selected element
* Arrow keys → move element by 5px
* Boundary-aware keyboard movement
* Active only when an element is selected

---

### 7. Save & Load (Persistence)

* Uses `localStorage`
* Canvas state saved as an array of objects
* On page refresh:

  * Elements are reconstructed
  * Position, size, style, rotation, and layer order preserved

---

### 8. Export Functionality

* **JSON Export**

  * Downloads internal layout data
* **HTML Export**

  * Generates basic HTML with inline styles
  * Visually reproduces the canvas design

---

## 🖥️ Responsive Support

The application is responsive and tested across:

* ✅ Desktop (Laptop)
* ✅ Tablet
* ✅ Mobile
### preview of laptop 
#### Landing Page & Canvas Page
<img width="1919" height="1076" alt="image" src="https://github.com/user-attachments/assets/8ad3a914-bf87-454a-afba-7ea5d67aedec" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/574abaa8-083d-49db-be82-f1c69e9e8652" />

### preview of Tablet 
#### Landing Page & Canvas Page
<img width="607" height="801" alt="image" src="https://github.com/user-attachments/assets/ed54b591-ac44-4712-8ee6-c955e9b7e970" />
<img width="612" height="803" alt="image" src="https://github.com/user-attachments/assets/42c20589-cd5a-435e-a039-411436daa98e" />

### preview of Mobile 
#### Landing Page & Canvas Page
<img width="371" height="811" alt="image" src="https://github.com/user-attachments/assets/60fdfc42-f504-43bd-bccf-add3d7b3f526" />

<img width="364" height="811" alt="image" src="https://github.com/user-attachments/assets/0e2f1a70-bbdd-4e7c-8a76-e1b796f42171" />


Both:

* **Landing Page (`index.html`)**
* **Editor Canvas (`canvas.html`)**

are fully responsive.

---

## 🛠️ Tech Stack

* **HTML5**
* **CSS3**
* **Vanilla JavaScript (ES6+)**
* No Canvas API
* No SVG
* No external libraries or frameworks

---

## 🧠 Engineering Focus

This project intentionally prioritizes:

* Clarity over abstraction
* Readable, modular JavaScript
* Explicit state handling
* Correctness over shortcuts

Advanced rendering optimizations were deliberately avoided to stay aligned with the challenge intent.

---

## 🚀 Future Improvements (Optional)

* Multi-select support
* Snap-to-grid
* Undo / Redo history
* Grouping elements
* Zoom & pan canvas

---

## 📄 License

This project is for **educational and demonstration purposes**.

---

If you want next:

* GitHub **project description**
* **Resume bullet points**
* **Interview explanation (how to defend architecture choices)**

say the word.
