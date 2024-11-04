// JavaScript for theme toggle (optional)
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector("#themeToggle");
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });
});
