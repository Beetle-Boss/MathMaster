function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------------------------
   PDF VIEWER MODAL FUNCTIONS
---------------------------- */

function openPDF(url) {
  const modal = document.getElementById("pdfModal");
  const frame = document.getElementById("pdfFrame");

  frame.src = url;
  modal.style.display = "flex";
}

function closePDF() {
  const modal = document.getElementById("pdfModal");
  const frame = document.getElementById("pdfFrame");

  modal.style.display = "none";
  frame.src = ""; // unload PDF
}

// Close modal when clicking outside content
window.onclick = function(e) {
  const modal = document.getElementById("pdfModal");
  if (e.target === modal) {
    closePDF();
  }
};
