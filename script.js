document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute("href"));
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    });
  });
});
