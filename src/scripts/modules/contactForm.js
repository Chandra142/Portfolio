import { qs } from "../../utils/dom.js";

export function initContactForm() {
  const form = qs(".form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();
    const recipient = form.getAttribute("action").replace(/^mailto:/, "");
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const status = qs("#contact-form-status", form);

    status.textContent = "Opening your email app. Review and send the message there.";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}
