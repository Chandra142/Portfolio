export function renderResearchFocusSection(researchFocus) {
  return `
    <section id="research-focus">
      <div class="mw">
        <div class="s-label">Research Focus</div>
        <h2 class="s-title fade-up">What I Work On</h2>
        <div class="focus-grid">
          ${researchFocus
            .map(
              item => `
                <article class="focus-card fade-up">
                  <h3>${item.title}</h3>
                  <p>${item.summary}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
