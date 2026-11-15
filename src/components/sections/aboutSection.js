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
            <div class="about-network" role="img" aria-label="Neural network diagram with aligned input, hidden, and output nodes">
              <div class="network-shell">
                <svg class="network-lines" viewBox="0 0 320 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <defs>
                    <radialGradient id="network-node-fill" cx="35%" cy="30%" r="75%">
                      <stop offset="0%" stop-color="#ecfeff"></stop>
                      <stop offset="45%" stop-color="#67e8f9"></stop>
                      <stop offset="100%" stop-color="#14b8a6"></stop>
                    </radialGradient>
                  </defs>
                  <circle class="network-orbit" cx="270" cy="120" r="24"></circle>
                  <line class="network-link link-1" x1="50" y1="52" x2="150" y2="78"></line>
                  <line class="network-link link-2" x1="50" y1="52" x2="150" y2="158"></line>
                  <line class="network-link link-3" x1="50" y1="120" x2="150" y2="78"></line>
                  <line class="network-link link-4" x1="50" y1="120" x2="150" y2="158"></line>
                  <line class="network-link link-5" x1="50" y1="188" x2="150" y2="78"></line>
                  <line class="network-link link-6" x1="50" y1="188" x2="150" y2="158"></line>
                  <line class="network-link link-7" x1="150" y1="78" x2="270" y2="120"></line>
                  <line class="network-link link-8" x1="150" y1="158" x2="270" y2="120"></line>
                  <circle class="network-node n1" cx="50" cy="52" r="8"></circle>
                  <circle class="network-node n2" cx="50" cy="120" r="8"></circle>
                  <circle class="network-node n3" cx="50" cy="188" r="8"></circle>
                  <circle class="network-node n4" cx="150" cy="78" r="8"></circle>
                  <circle class="network-node n5" cx="150" cy="158" r="8"></circle>
                  <circle class="network-node n6" cx="270" cy="120" r="9"></circle>
                  <text class="network-layer-label" x="50" y="230" text-anchor="middle">INPUT</text>
                  <text class="network-layer-label" x="150" y="230" text-anchor="middle">HIDDEN</text>
                  <text class="network-layer-label" x="270" y="230" text-anchor="middle">OUTPUT</text>
                </svg>
              </div>
              <div class="about-focus-metrics">
                ${about.metrics.map(item => `
                  <div class="about-focus-metric">
                    <strong>${item.value}</strong>
                    <span>${item.label}</span>
                  </div>
                `).join("")}
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
