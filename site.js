const topbar = document.querySelector(".topbar");
const contactForm = document.querySelector(".contact-form");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

function updateHeaderState() {
  if (!topbar) return;
  topbar.classList.toggle("is-scrolled", window.scrollY > 8);
}

function activateConfiguredImages() {
  document.querySelectorAll(".media-slot img").forEach((image) => {
    const source = image.getAttribute("data-src") || image.getAttribute("src");

    if (!source) return;

    image.hidden = false;
    image.closest(".media-slot")?.classList.add("has-image");
  });
}

function initCarousel(carousel) {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const intervalMs = Number(carousel.dataset.interval || 6500);
  let activeIndex = 0;
  let autoTimer = null;
  let touchStartX = 0;

  if (slides.length === 0) return;

  carousel.classList.add("has-image");
  carousel.setAttribute("tabindex", "0");

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function stopAutoPlay() {
    if (!autoTimer) return;
    window.clearInterval(autoTimer);
    autoTimer = null;
  }

  function startAutoPlay() {
    if (prefersReducedMotion.matches || slides.length < 2 || autoTimer) return;
    autoTimer = window.setInterval(() => showSlide(activeIndex + 1), intervalMs);
  }

  previous?.addEventListener("click", () => {
    stopAutoPlay();
    showSlide(activeIndex - 1);
    startAutoPlay();
  });

  next?.addEventListener("click", () => {
    stopAutoPlay();
    showSlide(activeIndex + 1);
    startAutoPlay();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      stopAutoPlay();
      showSlide(Number(dot.dataset.carouselDot));
      startAutoPlay();
    });
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    stopAutoPlay();
    showSlide(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
    startAutoPlay();
  });

  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);
  carousel.addEventListener("focusin", stopAutoPlay);
  carousel.addEventListener("focusout", startAutoPlay);

  carousel.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
      stopAutoPlay();
    },
    { passive: true },
  );

  carousel.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0]?.clientX || 0;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) > 42) {
        showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
      }

      startAutoPlay();
    },
    { passive: true },
  );

  showSlide(0);
  startAutoPlay();
}

function handleContactSubmit(event) {
  if (!(event.target instanceof HTMLFormElement)) return;

  event.preventDefault();

  const data = new FormData(event.target);
  const subject = "Richiesta dal sito Tosca Bistrot";
  const body = [
    `Nome: ${data.get("nome") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Telefono: ${data.get("telefono") || ""}`,
    "",
    `${data.get("messaggio") || ""}`,
  ].join("\n");

  window.location.href = `mailto:toscabistrotmonterosso@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
contactForm?.addEventListener("submit", handleContactSubmit);

updateHeaderState();
activateConfiguredImages();
document.querySelectorAll("[data-carousel]").forEach(initCarousel);
