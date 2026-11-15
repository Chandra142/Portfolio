export function renderExperienceSection(experience) {
  return `
    <section id="experience">
      <div class="mw">
        <div class="s-label">Experience</div>
        <h2 class="s-title fade-up">Relevant ML Experience</h2>
        ${experience
          .map(
            role => `
              <div class="exp-wrap fade-up">
                <div>
                  <div class="exp-badge"><span class="blink"></span>${role.period}</div>
                  <div class="exp-role">${role.role}</div>
                  <div class="exp-company">${role.company}</div>
                  ${role.href ? `<a class="pl experience-link" href="${role.href}" target="_blank" rel="noopener noreferrer">View internship work</a>` : ""}
                  ${role.proofHref ? `<a class="pl experience-link" href="${role.proofHref}" target="_blank" rel="noopener noreferrer">View certificate</a>` : ""}
                </div>
                <div class="exp-right">
                  <ul>
                    ${role.bullets.map(item => `<li>${item}</li>`).join("")}
                  </ul>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}
