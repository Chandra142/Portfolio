import { qs, qsa } from "../../utils/dom.js";

export function initNavigation() {
  const mobileNav = qs("#mobNav");
  const menuButton = qs("#hamBtn");
  const scrollTopButton = qs("#scrollTop");
  const navEmailCta = qs("#navEmailCta");
  const navigationLinks = qsa(".nav-links a, #mobNav a");
  const mobileLinks = qsa("#mobNav a");
  const sections = qsa("main section[id]");
  const mobileBreakpoint = window.matchMedia("(max-width: 640px)");
  let isMenuOpen = false;

  function setMenuState(open) {
    isMenuOpen = open;
    mobileNav?.classList.toggle("open", open);
    menuButton?.classList.toggle("open", open);
    menuButton?.setAttribute("aria-expanded", String(open));
    menuButton?.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    if (mobileNav) {
      mobileNav.inert = !open;
      mobileNav.setAttribute("aria-hidden", String(!open));
    }
    document.body.style.overflow = open ? "hidden" : "";
  }

  setMenuState(false);
  menuButton?.addEventListener("click", () => setMenuState(!isMenuOpen));
  mobileLinks.forEach(link => link.addEventListener("click", () => setMenuState(false)));
  mobileBreakpoint.addEventListener("change", event => {
    if (!event.matches) {
      setMenuState(false);
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && isMenuOpen) {
      setMenuState(false);
      menuButton?.focus();
    }
  });

  scrollTopButton?.addEventListener("click", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  });

  if (navEmailCta) {
    const defaultLabel = navEmailCta.textContent;
    const emailAddress = navEmailCta.href.replace(/^mailto:/, "").split("?")[0];
    navEmailCta.addEventListener("click", () => {
      if (!navigator.clipboard?.writeText) {
        return;
      }
      navigator.clipboard.writeText(decodeURIComponent(emailAddress)).then(() => {
        navEmailCta.textContent = "Email copied";
        window.setTimeout(() => {
          navEmailCta.textContent = defaultLabel;
        }, 1800);
      }).catch(() => {
        navEmailCta.textContent = defaultLabel;
      });
    });
  }

  let activeSectionId = "";
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSectionId = entry.target.id;
      }
    });
    navigationLinks.forEach(link => {
      const isActive = link.getAttribute("href") === `#${activeSectionId}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));

  let scrollScheduled = false;
  window.addEventListener("scroll", () => {
    if (scrollScheduled) {
      return;
    }
    scrollScheduled = true;
    window.requestAnimationFrame(() => {
      scrollTopButton?.classList.toggle("show", window.scrollY > 400);
      scrollScheduled = false;
    });
  }, { passive: true });
  scrollTopButton?.classList.toggle("show", window.scrollY > 400);
}
