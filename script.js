function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* --- Year switching for Past Tests --- */
document.addEventListener("click", function (e) {
  // Year buttons
  if (e.target.classList.contains("year-btn")) {
    const year = e.target.getAttribute("data-year");

    document.querySelectorAll(".year-btn").forEach(btn =>
      btn.classList.remove("active")
    );
    e.target.classList.add("active");

    document.querySelectorAll(".year-panel").forEach(panel =>
      panel.classList.remove("active")
    );
    const panel = document.getElementById("year-" + year);
    if (panel) {
      panel.classList.add("active");
    }
  }
});

/* --- PDF viewer modal logic --- */
const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const pdfModalTitle = document.getElementById("pdfModalTitle");
const pdfModalClose = document.getElementById("pdfModalClose");

// Open modal when clicking a PDF link
document.addEventListener("click", function (e) {
  const link = e.target.closest(".pdf-link");
  if (!link) return;

  e.preventDefault();
  const pdfUrl = link.getAttribute("data-pdf");
  const label = link.textContent.trim();

  pdfFrame.src = pdfUrl;
  pdfModalTitle.textContent = label;
  pdfModal.classList.add("open");
});

// Close modal (X button)
pdfModalClose.addEventListener("click", function () {
  pdfModal.classList.remove("open");
  pdfFrame.src = "";
});

// Close modal when clicking outside content
pdfModal.addEventListener("click", function (e) {
  if (e.target === pdfModal) {
    pdfModal.classList.remove("open");
    pdfFrame.src = "";
  }
});

// Optional: close with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && pdfModal.classList.contains("open")) {
    pdfModal.classList.remove("open");
    pdfFrame.src = "";
  }
});
