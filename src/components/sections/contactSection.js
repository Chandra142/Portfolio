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
              <div><strong>Email</strong><span>${contact.email}</span></div>
              <div><strong>Phone</strong><span>${contact.phone}</span></div>
              <div><strong>Location</strong><span>${contact.location}</span></div>
            </div>
            <div class="contact-links">
              <a class="soc-btn" href="mailto:${contact.email}">${contact.email}</a>
              ${contact.links.map(link => `<a class="soc-btn" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
            </div>
          </div>
          <div class="form">
            <div><label>Your Name</label><input type="text" placeholder="John Doe" /></div>
            <div><label>Your Email</label><input type="email" placeholder="john@example.com" /></div>
            <div><label>Your Message</label><textarea placeholder="Tell me about your project..."></textarea></div>
            <button id="sendBtn" type="button">Send Message -></button>
          </div>
        </div>
      </div>
    </section>
  `;
}
