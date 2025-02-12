document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute("href"));
      const offset = 60;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile menu after clicking a link
      const navLinks = document.getElementById("nav-links");
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const darkModeIcon = darkModeToggle.querySelector("i");

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Toggle between moon and sun icons
    if (document.body.classList.contains("dark-mode")) {
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");
    } else {
      darkModeIcon.classList.remove("fa-sun");
      darkModeIcon.classList.add("fa-moon");
    }
  });

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});
