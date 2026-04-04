// Switch between main tabs
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Switch between years inside Past Tests
function showYear(year) {
  document.querySelectorAll(".year-block").forEach(div => div.classList.add("hidden"));
  document.getElementById(`year-${year}`).classList.remove("hidden");
}

// Open PDF inside modal viewer
function openPDF(path) {
  const frame = document.getElementById("pdfFrame");
  const modal = document.getElementById("pdfModal");

  frame.src = path;
  modal.style.display = "block";
}

// Close PDF modal
function closePDF() {
  const modal = document.getElementById("pdfModal");
  const frame = document.getElementById("pdfFrame");

  modal.style.display = "none";
  frame.src = ""; // clears PDF so audio/memory stops
}
