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
          <span class="name">${hero.headline[0]}<br>${hero.headline[1]}</span>
          <span class="title" id="typed-title">${hero.role}</span>
        </h1>
        <div class="hero-btns">
          ${hero.ctas.map(renderCta).join("")}
        </div>
      </div>
      <div class="hero-right fade-up" style="transition-delay:.15s">
        <div class="photo-card">
          <div class="photo-aura" aria-hidden="true"></div>
          <div class="photo-orb photo-orb-1" aria-hidden="true"></div>
          <div class="photo-orb photo-orb-2" aria-hidden="true"></div>
          <div class="photo-wrap">
            <img id="photo-dark" src="/public/assets/profile-pic-dark.png" alt="${hero.name}"
              onerror="this.style.display='none';document.getElementById('ph-fb').style.display='flex'" />
            <img id="photo-light" src="/public/assets/profile-pic-light.png" alt="${hero.name}" style="display:none"
              onerror="this.style.display='none';document.getElementById('ph-fb').style.display='flex'" />
            <div class="photo-placeholder" id="ph-fb">
              <div class="ph-av">RC</div>
              <div class="ph-name">${hero.name}</div>
              <div class="ph-role">// ai_ml_engineer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
