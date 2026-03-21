import { qs } from "../../utils/dom.js";

export function initContactForm() {
  const sendButton = qs("#sendBtn");

  if (!sendButton) {
    return;
  }

  sendButton.addEventListener("click", () => {
    const form = sendButton.closest(".form");
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      sendButton.textContent = "Fill all fields first";
      sendButton.style.background = "linear-gradient(135deg, #ef4444, #f97316)";

      setTimeout(() => {
        sendButton.textContent = "Send Message ->";
        sendButton.style.background = "";
      }, 2500);

      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:ramcgupta.ml@gmail.com?subject=${subject}&body=${body}`;
    sendButton.textContent = "Opening email client...";
    sendButton.style.background = "linear-gradient(135deg, #10b981, #06b6d4)";

    setTimeout(() => {
      sendButton.textContent = "Send Message ->";
      sendButton.style.background = "";
    }, 3500);
  });
}
