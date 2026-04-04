function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* PDF VIEWER FUNCTIONS */
function openPDF(url) {
  document.getElementById("pdfFrame").src = url;
  document.getElementById("pdfModal").style.display = "flex";
}

function closePDF() {
  document.getElementById("pdfModal").style.display = "none";
  document.getElementById("pdfFrame").src = "";
}

/* Close modal with ESC key */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closePDF();
});
