const modal = document.getElementById("loginModal");
const btn = document.getElementById("openLoginBtn");
const span = document.getElementsByClassName("close")[0];

// Open modal
btn.onclick = function () {
  modal.style.display = "block";
}

// Close modal
span.onclick = function () {
  modal.style.display = "none";
}

// Close when clicking outside the modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}