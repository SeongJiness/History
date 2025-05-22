document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const toggleBtn = document.getElementById("toggleBtn");

  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggleBtn.textContent = menu.classList.contains("open") ? "◀" : "▶";
  });
});
