document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modern features
  initializeSmoothScrolling();
  initializeDarkMode();
  initializeMobileMenu();
  initializeScrollToTop();
  initializeLoadingAnimation();
  initializeScrollAnimations();
  initializeParallaxEffects();
  initializeSkillAnimations();
  initializeTimelineAnimations();
  initializeContactForm();
});

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute("href"));
      const offset = 80;
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
        document.getElementById("hamburger").classList.remove("active");
      }
    });
  });
}

// Dark mode toggle with smooth transitions
function initializeDarkMode() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const darkModeIcon = darkModeToggle.querySelector("i");

  // Check for saved dark mode preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkModeIcon.classList.remove("fa-moon");
    darkModeIcon.classList.add("fa-sun");
  }

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Save preference
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Toggle between moon and sun icons with animation
    if (isDark) {
      darkModeIcon.style.transform = "rotate(180deg)";
      setTimeout(() => {
        darkModeIcon.classList.remove("fa-moon");
        darkModeIcon.classList.add("fa-sun");
        darkModeIcon.style.transform = "rotate(0deg)";
      }, 150);
    } else {
      darkModeIcon.style.transform = "rotate(180deg)";
      setTimeout(() => {
        darkModeIcon.classList.remove("fa-sun");
        darkModeIcon.classList.add("fa-moon");
        darkModeIcon.style.transform = "rotate(0deg)";
      }, 150);
    }
  });
}

// Enhanced mobile menu with smooth animations
function initializeMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Add body scroll lock when menu is open
    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Enhanced scroll to top with smooth animations
function initializeScrollToTop() {
  const scrollToTopButton = document.getElementById("scroll-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopButton.classList.add("visible");
    } else {
      scrollToTopButton.classList.remove("visible");
    }
  });

  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Loading animation with fade out
function initializeLoadingAnimation() {
  window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    loading.style.opacity = "0";
    setTimeout(() => {
      loading.style.display = "none";
    }, 500);
  });
}

// Intersection Observer for scroll animations
function initializeScrollAnimations() {
  const sections = document.querySelectorAll(".section");
  const skillCards = document.querySelectorAll(".skill-card");
  const projectCards = document.querySelectorAll(".project-card");
  const documentCards = document.querySelectorAll(".document-card");
  const contactItems = document.querySelectorAll(".contact-item");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  };

  // Add different animation classes to sections
  sections.forEach((section, index) => {
    const animations = [
      "fade-in-up",
      "slide-in-left",
      "slide-in-right",
      "scale-in",
    ];
    const animationClass = animations[index % animations.length];
    section.classList.add(animationClass);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add entrance animation for section content
        const cards = entry.target.querySelectorAll(
          ".skill-card, .project-card, .document-card, .contact-item, .education-card, .timeline-card"
        );
        cards.forEach((card, cardIndex) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, cardIndex * 150);
        });
      }
    });
  }, observerOptions);

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe sections
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Observe cards with staggered animation
  [...skillCards, ...projectCards, ...documentCards, ...contactItems].forEach(
    (card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition =
        "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      cardObserver.observe(card);
    }
  );
}

// Parallax effects for header
function initializeParallaxEffects() {
  const header = document.querySelector("header");
  const profile = document.querySelector(".profile");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (profile) {
      profile.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Animated skill progress bars
function initializeSkillAnimations() {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Timeline animations
function initializeTimelineAnimations() {
  const timelineCards = document.querySelectorAll(".timeline-card");

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 200);
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineCards.forEach((card) => {
    timelineObserver.observe(card);
  });
}

// Add floating particles effect
function createFloatingParticles() {
  const header = document.querySelector("header");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
    header.appendChild(particle);
  }
}

// Add CSS for floating particles
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
    }
    
    .floating-particle {
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Initialize floating particles
setTimeout(createFloatingParticles, 1000);

// Add typing effect for the name
function initializeTypingEffect() {
  const nameElement = document.querySelector(".profile h1");
  if (nameElement) {
    const text = nameElement.textContent;
    nameElement.textContent = "";
    nameElement.style.borderRight = "2px solid white";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        nameElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        nameElement.style.borderRight = "none";
      }
    };

    setTimeout(typeWriter, 500);
  }
}

// Initialize typing effect
setTimeout(initializeTypingEffect, 1500);

// Add smooth reveal animations for buttons
function initializeButtonAnimations() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button, index) => {
    button.style.opacity = "0";
    button.style.transform = "translateY(20px)";

    setTimeout(() => {
      button.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      button.style.opacity = "1";
      button.style.transform = "translateY(0)";
    }, 1000 + index * 100);
  });
}

// Initialize button animations
setTimeout(initializeButtonAnimations, 2000);

// Add scroll-triggered navbar background
function initializeNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  function updateNavbarBackground() {
    if (document.body.classList.contains("dark-mode")) {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(26, 32, 44, 0.98)";
        navbar.style.backdropFilter = "blur(25px)";
      } else {
        navbar.style.background = "rgba(26, 32, 44, 0.95)";
        navbar.style.backdropFilter = "blur(20px)";
      }
    } else {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.backdropFilter = "blur(25px)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.backdropFilter = "blur(20px)";
      }
    }
  }

  window.addEventListener("scroll", updateNavbarBackground);

  // Also update on theme change
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("click", () => {
    setTimeout(updateNavbarBackground, 150); // Wait for theme transition
  });

  // Initial call
  updateNavbarBackground();
}

// Initialize navbar scroll effects
initializeNavbarScroll();

// Add smooth scroll behavior for the entire page
document.documentElement.style.scrollBehavior = "smooth";

// Add scroll progress indicator
function addScrollProgressIndicator() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
}

// Initialize scroll progress indicator
addScrollProgressIndicator();

// Contact Form Functionality
function initializeContactForm() {
  const form = document.getElementById("contact-form");
  const statusDiv = document.getElementById("form-status");

  if (!form) return;

  // Initialize EmailJS
  emailjs.init("y25HF1Bnk0Db4rSq3"); // You'll need to replace this with your actual EmailJS public key

  // Real-time validation
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  // Set initial border colors to neutral
  [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
    input.style.borderColor = "rgba(102, 126, 234, 0.2)";
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Phone validation regex (optional field)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

  // Validate name
  nameInput.addEventListener("blur", function () {
    const nameError = document.getElementById("name-error");
    if (this.value.trim().length < 2) {
      showError(nameError, "Name must be at least 2 characters long");
      this.style.borderColor = "#e53e3e";
    } else {
      clearError(nameError);
      this.style.borderColor = "#38a169";
    }
  });

  // Validate email
  emailInput.addEventListener("blur", function () {
    const emailError = document.getElementById("email-error");
    if (!emailRegex.test(this.value)) {
      showError(emailError, "Please enter a valid email address");
      this.style.borderColor = "#e53e3e";
    } else {
      clearError(emailError);
      this.style.borderColor = "#38a169";
    }
  });

  // Validate phone (optional)
  phoneInput.addEventListener("blur", function () {
    const phoneError = document.getElementById("phone-error");
    if (this.value.trim() && !phoneRegex.test(this.value.replace(/\s/g, ""))) {
      showError(phoneError, "Please enter a valid phone number");
      this.style.borderColor = "#e53e3e";
    } else {
      clearError(phoneError);
      this.style.borderColor = this.value.trim()
        ? "#38a169"
        : "rgba(102, 126, 234, 0.2)";
    }
  });

  // Validate message
  messageInput.addEventListener("blur", function () {
    const messageError = document.getElementById("message-error");
    if (this.value.trim().length < 10) {
      showError(messageError, "Message must be at least 10 characters long");
      this.style.borderColor = "#e53e3e";
    } else {
      clearError(messageError);
      this.style.borderColor = "#38a169";
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous status
    clearStatus();

    // Validate all fields
    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
      showError(
        document.getElementById("name-error"),
        "Name must be at least 2 characters long"
      );
      nameInput.style.borderColor = "#e53e3e";
      isValid = false;
    }

    // Validate email
    if (!emailRegex.test(emailInput.value)) {
      showError(
        document.getElementById("email-error"),
        "Please enter a valid email address"
      );
      emailInput.style.borderColor = "#e53e3e";
      isValid = false;
    }

    // Validate phone (optional)
    if (
      phoneInput.value.trim() &&
      !phoneRegex.test(phoneInput.value.replace(/\s/g, ""))
    ) {
      showError(
        document.getElementById("phone-error"),
        "Please enter a valid phone number"
      );
      phoneInput.style.borderColor = "#e53e3e";
      isValid = false;
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      showError(
        document.getElementById("message-error"),
        "Message must be at least 10 characters long"
      );
      messageInput.style.borderColor = "#e53e3e";
      isValid = false;
    }

    if (!isValid) {
      showStatus("Please fix the errors above", "error");
      return;
    }

    // Show loading state
    showStatus("Sending message...", "loading");
    const submitBtn = form.querySelector(".btn-submit");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Prepare form data
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim() || "Not provided",
      message: messageInput.value.trim(),
    };

    // Send email using EmailJS (you'll need to set this up)
    sendEmail(formData)
      .then(() => {
        showStatus(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );
        form.reset();
        // Reset border colors
        [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
          input.style.borderColor = "rgba(102, 126, 234, 0.2)";
        });
        // Clear all error messages
        document
          .querySelectorAll(".error-message")
          .forEach((error) => clearError(error));
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        showStatus(
          "Failed to send message. Please try again or contact me directly at kishor.p97@gmail.com",
          "error"
        );
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      });
  });
}

// Email sending function using EmailJS
async function sendEmail(formData) {
  try {
    // EmailJS service configuration
    const serviceID = "service_90y8tx5"; // Replace with your EmailJS service ID
    const templateID = "template_elcd5ko"; // Replace with your EmailJS template ID

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: "kishor.p97@gmail.com",
    };

    // Send email using EmailJS
    const response = await emailjs.send(serviceID, templateID, templateParams);

    if (response.status === 200) {
      return Promise.resolve();
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw error;
  }
}

// Helper functions
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.style.display = "none";
}

function showStatus(message, type) {
  const statusDiv = document.getElementById("form-status");
  statusDiv.textContent = message;
  statusDiv.className = `form-status ${type}`;
}

function clearStatus() {
  const statusDiv = document.getElementById("form-status");
  statusDiv.textContent = "";
  statusDiv.className = "form-status";
}
