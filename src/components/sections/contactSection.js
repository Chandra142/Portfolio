export function renderContactSection(contact) {
  return `
    <section id="contact">
      <div class="mw">
        <div class="contact-compact fade-up">
          <div>
            <div class="s-label">Communication</div>
            <h2>${contact.title}</h2>
            <p>${contact.summary}</p>
            <div class="contact-direct">
              <div><strong>Email</strong><a href="mailto:${contact.email}">${contact.email}</a></div>
              <div><strong>Phone</strong><a href="tel:${contact.phone.replace(/[^+\d]/g, "")}">${contact.phone}</a></div>
              <div><strong>Location</strong><span>${contact.location}</span></div>
            </div>
            <div class="contact-links">
              ${contact.links.map(link => `<a class="soc-btn" href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join("")}
            </div>
          </div>
          <form class="form" action="mailto:${contact.email}" method="post">
            <div><label for="contact-name">Your Name</label><input id="contact-name" name="name" type="text" placeholder="Your name" autocomplete="name" required /></div>
            <div><label for="contact-email">Your Email</label><input id="contact-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" required /></div>
            <div><label for="contact-message">Your Message</label><textarea id="contact-message" name="message" placeholder="Tell me about your project..." required></textarea></div>
            <button id="sendBtn" type="submit">Send Message</button>
            <p id="contact-form-status" class="form-status" role="status" aria-live="polite">Opens your email app with this message. No message is sent automatically.</p>
          </form>
        </div>
      </div>
    </section>
  `;
}
