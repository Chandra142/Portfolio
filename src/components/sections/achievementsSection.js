export function renderAchievementsSection(achievements) {
  return `
    <section id="achievements">
      <div class="mw">
        <div class="s-label">Achievements</div>
        <h2 class="s-title fade-up">Milestones and Signals</h2>
        <div class="achievement-list">
          ${achievements.map(item => `
            <article class="achievement-item fade-up">
              <div class="achievement-period">${item.period}</div>
              <div class="achievement-body">
                <h3>${item.title}</h3>
                ${item.href ? `<a class="achievement-link" href="${item.href}" target="_blank" rel="noopener noreferrer">${item.linkLabel || "View evidence"}</a>` : ""}
                <div class="achievement-org">${item.organization}</div>
                <ul>
                  ${item.bullets.map(bullet => `<li>${bullet}</li>`).join("")}
                </ul>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}
