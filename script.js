function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openPDF(path) {
  document.getElementById("pdfFrame").src = path;
  document.getElementById("pdfModal").style.display = "block";
}

function closePDF() {
  document.getElementById("pdfModal").style.display = "none";
  document.getElementById("pdfFrame").src = "";
}
