function renderTags(items, className) {
  return items.map(item => `<span class="${className}">${item}</span>`).join("");
}

export function renderSkillsSection(skills) {
  const marqueeItems = [...skills.marquee, ...skills.marquee];

  return `
    <section id="skills">
      <div class="mw">
        <div class="s-label">Inventory</div>
        <h2 class="s-title fade-up">The Tech Stack</h2>
        <div class="ticker-wrap fade-up" aria-label="Tech stack marquee">
          <div class="ticker ticker-track">
            ${marqueeItems.map(item => `<span class="ti"><span class="d"></span>${item}</span>`).join("")}
          </div>
        </div>
        <div class="skills-compact fade-up">
          <div class="skills-compact-group">
            <h3>Tech Stack</h3>
            <div class="tags">${renderTags(skills.techStack, "tag")}</div>
          </div>
          <div class="skills-compact-group">
            <h3>Focus Areas</h3>
            <div class="tags">${renderTags(skills.focusAreas, "tag")}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
