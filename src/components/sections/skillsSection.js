export function renderSkillsSection(skills) {
  const marqueeItems = [...skills.marquee, ...skills.marquee];

  return `
    <section id="skills">
      <div class="mw">
        <div class="s-label">Technical Toolkit</div>
        <h2 class="s-title fade-up">Built for Applied AI</h2>
        <div class="ticker-wrap fade-up">
          <div class="ticker ticker-track" aria-hidden="true">
            ${marqueeItems.map(item => `<span class="ti"><span class="d"></span>${item}</span>`).join("")}
          </div>
          <span class="sr-only">${skills.marquee.join(", ")}</span>
        </div>
        <div class="skills-compact fade-up">
          ${skills.groups.map(group => `
            <div class="skills-compact-group">
              <h3>${group.title}</h3>
              <div class="tags">${group.items.map(item => `<span class="tag">${item}</span>`).join("")}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}
