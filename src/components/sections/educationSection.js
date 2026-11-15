export function renderEducationSection(education) {
  return `
    <section id="education">
      <div class="mw">
        <div class="s-label">Education</div>
        <h2 class="s-title fade-up">Computer Science Foundations</h2>
        <div class="education-grid">
          ${education.map(item => `
            <article class="education-card fade-up">
              ${item.period ? `<div class="education-period">${item.period}</div>` : ""}
              <div>
                <h3>${item.degree}</h3>
                <p class="education-institution">${item.institution}</p>
                ${item.location ? `<p class="education-location">${item.location}</p>` : ""}
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}
