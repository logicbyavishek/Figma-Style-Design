const closeBtn = document.querySelector('.close-canvas');
closeBtn.addEventListener('click', () => {
  console.log('Close button clicked!');
  window.location.href = "./index.html"; // Navigate to index.html
});