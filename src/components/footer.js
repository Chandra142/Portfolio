export function renderFooter({ hero, contact }) {
  return `
    <div class="footer-brand">
      <h2>${hero.name}</h2>
      <p>${hero.role} building practical intelligent systems.</p>
    </div>
    <div class="footer-col">
      <h3>Navigate</h3>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#experience">Experience</a>
      <a href="#education">Education</a>
      <a href="#contact">Contact</a>
    </div>
    <div class="footer-col">
      <h3>Connect</h3>
      <a href="mailto:${contact.email}">${contact.email}</a>
      ${contact.links.map(link => `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join("")}
      <a href="/documents/ram-chandra-gupta-resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
    </div>
    <p class="footer-copy">&copy; ${new Date().getFullYear()} ${hero.name}. Built with HTML, CSS, and JavaScript.</p>
  `;
}
