export function renderAboutSection(about) {
  return `
    <section id="about">
      <div class="mw">
        <div class="s-label">${about.label}</div>
        <div class="about-grid">
          <div class="about-copy fade-up">
            <h2 class="s-title">${about.title}</h2>
            ${about.summary.map(item => `<p>${item}</p>`).join("")}
          </div>
          <div class="about-metrics fade-up" style="transition-delay:.1s">
            <div class="about-network" aria-label="Animated neural network visualization">
              <div class="network-shell">
                <svg class="network-lines" viewBox="0 0 320 240" aria-hidden="true">
                  <line class="network-link link-1" x1="50" y1="52" x2="150" y2="78"></line>
                  <line class="network-link link-2" x1="50" y1="52" x2="150" y2="158"></line>
                  <line class="network-link link-3" x1="50" y1="120" x2="150" y2="78"></line>
                  <line class="network-link link-4" x1="50" y1="120" x2="150" y2="158"></line>
                  <line class="network-link link-5" x1="50" y1="188" x2="150" y2="78"></line>
                  <line class="network-link link-6" x1="50" y1="188" x2="150" y2="158"></line>
                  <line class="network-link link-7" x1="150" y1="78" x2="270" y2="120"></line>
                  <line class="network-link link-8" x1="150" y1="158" x2="270" y2="120"></line>
                </svg>
                <span class="network-node n1"></span>
                <span class="network-node n2"></span>
                <span class="network-node n3"></span>
                <span class="network-node n4"></span>
                <span class="network-node n5"></span>
                <span class="network-node n6"></span>
              </div>
              <div class="network-caption">
                <div class="network-title">Neural Network</div>
                <div class="network-label">Signal flow, layered inference, continuous learning.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
