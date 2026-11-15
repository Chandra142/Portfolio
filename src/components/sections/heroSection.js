function renderCta({ href, label, variant, external = false }) {
  const className = variant === "glow" ? "btn-glow" : "btn-ghost";
  const target = external ? ' target="_blank" rel="noreferrer"' : "";
  return `<a href="${href}" class="${className}"${target}>${label}</a>`;
}

export function renderHeroSection(hero) {
  return `
    <section id="hero">
      <canvas id="nn-canvas"></canvas>
      <div class="hero-overlay"></div>
      <div class="hero-left fade-up">
        <div class="hero-tag"><span class="blink"></span>${hero.role}</div>
        <h1>
          <span class="welcome">${hero.eyebrow}</span>
          <span class="hero-identity">${hero.name}</span>
          <span class="name">${hero.headline[0]}<br>${hero.headline[1]}</span>
          <span class="title" id="typed-title">${hero.role}</span>
        </h1>
        <p class="hero-desc">${hero.valueProposition}</p>
        <div class="hero-btns">
          ${hero.ctas.map(renderCta).join("")}
        </div>
        <div class="hero-stats" aria-label="Portfolio highlights">
          ${hero.highlights.map(item => `
            <div class="hstat">
              <div class="n">${item.value}</div>
              <div class="l">${item.label}</div>
            </div>
          `).join("")}
        </div>
        <div class="hero-code">
          <div class="hero-code-title">${hero.codeTitle}</div>
          <pre class="hero-code-body"><code>${hero.codeSnippet.map((line, index) => `<span class="hero-code-line"><span class="line-no" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><span>${line}</span></span>`).join("")}</code></pre>
        </div>
      </div>
      <div class="hero-right fade-up" style="transition-delay:.15s">
        <div class="photo-card">
          <div class="photo-aura" aria-hidden="true"></div>
          <div class="photo-orb photo-orb-1" aria-hidden="true"></div>
          <div class="photo-orb photo-orb-2" aria-hidden="true"></div>
          <div class="photo-wrap">
            <img id="profile-photo" src="/assets/profile-pic-dark.png" alt="Portrait of ${hero.name}"
              data-dark-src="/assets/profile-pic-dark.png" data-light-src="/assets/profile-pic-light.png"
              width="380" height="646" fetchpriority="high" decoding="async" />
            <div class="photo-placeholder" id="ph-fb" hidden>
              <div class="ph-av">RC</div>
              <div class="ph-name">${hero.name}</div>
              <div class="ph-role">// ai_ml_engineer</div>
            </div>
          </div>
        </div>
        <aside class="hero-focus-panel" aria-label="Current focus">
          <div class="hero-focus-head">
            <span class="hero-focus-label">${hero.focus.label}</span>
            <span class="hero-focus-status"><span class="blink"></span>${hero.focus.status}</span>
          </div>
          <div class="hero-focus-items">
            ${hero.focus.items.map((item, index) => `
              <div class="hero-focus-item">
                <span class="hero-focus-index">${String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>${item.title}</strong>
                  <span>${item.detail}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </aside>
      </div>
    </section>
  `;
}
