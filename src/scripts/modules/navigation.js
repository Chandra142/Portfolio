import { qs, qsa } from "../../utils/dom.js";

export function initNavigation() {
  const mobileNav = qs("#mobNav");
  const menuButton = qs("#hamBtn");
  const scrollTopButton = qs("#scrollTop");
  const navEmailCta = qs("#navEmailCta");
  const navLinks = qsa(".nav-links a");
  const mobileLinks = qsa("#mobNav a");
  const sections = qsa("section[id]");

  const closeMobileNav = () => {
    if (!mobileNav || !menuButton) {
      return;
    }

    mobileNav.classList.remove("open");
    menuButton.classList.remove("open");
    mobileNav.style.display = "none";
  };

  const openMobileNav = () => {
    if (!mobileNav || !menuButton) {
      return;
    }

    const isOpen = mobileNav.classList.toggle("open");
    menuButton.classList.toggle("open", isOpen);
    mobileNav.style.display = isOpen ? "flex" : "none";
  };

  if (mobileNav) {
    mobileNav.style.display = "none";
  }

  if (menuButton) {
    menuButton.addEventListener("click", openMobileNav);
  }

  mobileLinks.forEach(link => link.addEventListener("click", closeMobileNav));

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (navEmailCta) {
    const defaultLabel = navEmailCta.textContent;
    const emailAddress = "ramcgupta.ml@gmail.com";

    navEmailCta.addEventListener("click", () => {
      if (!navigator.clipboard?.writeText) {
        return;
      }

      navigator.clipboard.writeText(emailAddress).then(() => {
        navEmailCta.textContent = "Email Copied";
        window.setTimeout(() => {
          navEmailCta.textContent = defaultLabel;
        }, 1800);
      }).catch(() => {
        navEmailCta.textContent = defaultLabel;
      });
    });
  }

  const updateActiveSection = () => {
    let currentSectionId = "";

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 220) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
    });

    if (scrollTopButton) {
      scrollTopButton.classList.toggle("show", window.scrollY > 400);
    }
  };

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  updateActiveSection();
}
