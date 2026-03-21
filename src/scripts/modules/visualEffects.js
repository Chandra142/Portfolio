import { qs, qsa } from "../../utils/dom.js";

export function initVisualEffects() {
  const photoCard = qs(".photo-card");

  if (photoCard) {
    const resetPhotoTilt = () => {
      photoCard.style.setProperty("--mx", "50%");
      photoCard.style.setProperty("--my", "50%");
      photoCard.style.setProperty("--rx", "0deg");
      photoCard.style.setProperty("--ry", "0deg");
      photoCard.style.setProperty("--lift", "0px");
    };

    photoCard.addEventListener("mousemove", event => {
      const rect = photoCard.getBoundingClientRect();
      const xRatio = (event.clientX - rect.left) / rect.width;
      const yRatio = (event.clientY - rect.top) / rect.height;

      photoCard.style.setProperty("--mx", `${(xRatio * 100).toFixed(1)}%`);
      photoCard.style.setProperty("--my", `${(yRatio * 100).toFixed(1)}%`);
      photoCard.style.setProperty("--rx", `${((0.5 - yRatio) * 14).toFixed(2)}deg`);
      photoCard.style.setProperty("--ry", `${((xRatio - 0.5) * 16).toFixed(2)}deg`);
      photoCard.style.setProperty("--lift", "-4px");
    });

    photoCard.addEventListener("mouseleave", resetPhotoTilt);
    resetPhotoTilt();
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  qsa(".fade-up").forEach(element => observer.observe(element));
}
