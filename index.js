//toggle menu
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}
//close menu if clicked outside
document.addEventListener("click", function (event) {
  const menu = document.getElementById("menu");
  const toggleButton = document.getElementById("menu-icon");

  //if menu is hidden or clicked on menu or toggle button
  if (
    menu.classList.contains("hidden") ||
    menu.contains(event.target) ||
    toggleButton.contains(event.target)
  ) {
    return;
  }
  //otherwise hide menu
  menu.classList.toggle("hidden");
});
//toggle faq
function toggleFAQ(icon) {
  const faqItem = icon.closest(".faq-item");
  const answer = faqItem.querySelector(".faq-answer");

  const isOpen = answer.classList.contains("max-h-[300px]");

  // Toggle classes for animation
  if (isOpen) {
    answer.classList.remove("max-h-[300px]", "opacity-100");
    answer.classList.add("max-h-0", "opacity-0");
    icon.src = "./public/assest/faq-add-icon.svg";
  } else {
    answer.classList.remove("max-h-0", "opacity-0");
    answer.classList.add("max-h-[300px]", "opacity-100");
    icon.src = "./public/assest/faq-minus-icon.svg";
  }
}

// --- Scroll-in Animation ---
document.addEventListener("DOMContentLoaded", function () {
  // --- Scroll-in Animation ---
  const animatedElements = document.querySelectorAll(".scroll-animate");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: Stop observing the element once it's visible
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Fallback for older browsers that don't support IntersectionObserver
    animatedElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // --- Card Slider Control ---
  window.scrollCards = function (direction) {
    const container = document.getElementById("card-container");
    const scrollAmount = container.offsetWidth * 0.8; // Scroll by 80% of the container's width

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
});
