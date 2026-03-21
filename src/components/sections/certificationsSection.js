export function renderCertificationsSection(certifications) {
  return `
    <section id="certifications">
      <div class="mw">
        <div class="s-label">Certifications</div>
        <h2 class="s-title fade-up">Selected Credentials</h2>
        <div class="certifications-grid">
          ${certifications
            .map(
              item => `
                <article class="certification-card fade-up">
                  <div class="certification-period">${item.period}</div>
                  <h3>${item.title}</h3>
                  <p>${item.issuer}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
