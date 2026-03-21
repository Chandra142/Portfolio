function renderProject(project) {
  return `
    <article class="proj-card fade-up">
      <div class="proj-body">
        <div class="proj-num">${project.title}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="proj-tags">
          ${project.stack.map(item => `<span class="ptag">${item}</span>`).join("")}
        </div>
        <div class="project-impact">${project.impact}</div>
        <div class="project-links">
          <a href="${project.href}" target="_blank" rel="noreferrer" class="pl">Source</a>
        </div>
      </div>
    </article>
  `;
}

export function renderProjectsSection(projects) {
  return `
    <section id="projects">
      <div class="mw">
        <div class="ph">
          <div>
            <div class="s-label">Projects Showcase</div>
            <h2 class="s-title fade-up" style="margin-bottom:0">Featured Creations</h2>
          </div>
          <a href="https://github.com/Chandra142" target="_blank" rel="noreferrer" class="view-all">Explore Full Archive</a>
        </div>
        <div class="proj-grid">
          ${projects.map(renderProject).join("")}
        </div>
      </div>
    </section>
  `;
}
