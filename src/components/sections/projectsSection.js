function renderProject(project, index) {
  return `
    <article class="proj-card fade-up">
      <div class="proj-body">
        <div class="proj-num">Project ${String(index + 1).padStart(2, "0")}</div>
        <div class="proj-date">${project.period}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="proj-tags">
          ${project.stack.map(item => `<span class="ptag">${item}</span>`).join("")}
        </div>
        <div class="project-impact">${project.impact}</div>
        <div class="project-links">
          ${project.href ? `<a href="${project.href}" target="_blank" rel="noopener noreferrer" class="pl" aria-label="View ${project.title} source code">Source</a>` : ""}
          ${project.liveHref ? `<a href="${project.liveHref}" target="_blank" rel="noopener noreferrer" class="pl" aria-label="Open ${project.title} live demo">Live Demo</a>` : ""}
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
            <div class="s-label">Selected Work</div>
            <h2 class="s-title fade-up" style="margin-bottom:0">AI Systems, Measured Results</h2>
          </div>
          <a href="https://github.com/Chandra142" target="_blank" rel="noopener noreferrer" class="view-all">Explore GitHub</a>
        </div>
        <div class="proj-grid">
          ${projects.map(renderProject).join("")}
        </div>
      </div>
    </section>
  `;
}
