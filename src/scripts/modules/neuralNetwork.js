import { qs } from "../../utils/dom.js";

export function initNeuralNetwork() {
  const canvas = qs("#nn-canvas");
  if (!canvas) {
    return () => {};
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return () => {};
  }

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let canvasWidth = 0;
  let canvasHeight = 0;
  let nodes = [];
  let edges = [];
  let pulses = [];
  let animationFrameId = null;
  let lastPulseTimestamp = 0;
  let isVisible = true;

  function isDarkTheme() {
    return document.documentElement.getAttribute("data-theme") !== "light";
  }

  function buildNetwork() {
    nodes = [];
    edges = [];
    pulses = [];
    const layers = [4, 6, 8, 6, 4];
    const networkWidth = canvasWidth * 0.55;
    const startX = canvasWidth * 0.3;
    const nodesByLayer = new Map();

    layers.forEach((count, layerIndex) => {
      const x = startX + (layerIndex / (layers.length - 1)) * networkWidth;
      const layerNodes = [];
      for (let nodeIndex = 0; nodeIndex < count; nodeIndex += 1) {
        const y = canvasHeight * 0.15 + (nodeIndex / (count - 1 || 1)) * (canvasHeight * 0.7);
        layerNodes.push({
          x,
          y,
          layerIndex,
          radius: 3 + Math.random() * 2,
          glowPhase: Math.random() * Math.PI * 2,
        });
      }
      nodesByLayer.set(layerIndex, layerNodes);
      nodes.push(...layerNodes);
    });

    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex += 1) {
      nodesByLayer.get(layerIndex).forEach(startNode => {
        nodesByLayer.get(layerIndex + 1).forEach(endNode => {
          if (Math.random() < 0.5) {
            edges.push({ startNode, endNode });
          }
        });
      });
    }

    for (let index = 0; index < 28; index += 1) {
      nodes.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        radius: 1.5 + Math.random() * 1.5,
        glowPhase: Math.random() * Math.PI * 2,
        isScatter: true,
      });
    }
  }

  function createPulse() {
    const activeNode = nodes[Math.floor(Math.random() * (nodes.length - 28))];
    const connectedEdges = edges.filter(edge => edge.startNode === activeNode || edge.endNode === activeNode);
    if (!activeNode || !connectedEdges.length) {
      return;
    }

    const edge = connectedEdges[Math.floor(Math.random() * connectedEdges.length)];
    pulses.push({ edge, progress: 0, speed: 0.007 + Math.random() * 0.012, forward: edge.startNode === activeNode });
  }

  function drawScene(timestamp, animate) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    const dark = isDarkTheme();
    const edgeColor = dark ? "rgba(94,234,212,0.13)" : "rgba(15,118,110,0.12)";
    const glowColorPrefix = dark ? "rgba(94,234,212," : "rgba(15,118,110,";

    edges.forEach(({ startNode, endNode }) => {
      context.beginPath();
      context.moveTo(startNode.x, startNode.y);
      context.lineTo(endNode.x, endNode.y);
      context.strokeStyle = edgeColor;
      context.lineWidth = 0.7;
      context.stroke();
    });

    pulses = pulses.filter(pulse => {
      pulse.progress += animate ? pulse.speed : 0;
      if (pulse.progress > 1) {
        return false;
      }
      const { startNode, endNode } = pulse.edge;
      const from = pulse.forward ? startNode : endNode;
      const to = pulse.forward ? endNode : startNode;
      const x = from.x + (to.x - from.x) * pulse.progress;
      const y = from.y + (to.y - from.y) * pulse.progress;
      const gradient = context.createRadialGradient(x, y, 0, x, y, 7);
      gradient.addColorStop(0, `${glowColorPrefix}0.9)`);
      gradient.addColorStop(1, `${glowColorPrefix}0)`);
      context.beginPath();
      context.arc(x, y, 7, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();
      return true;
    });

    nodes.forEach(node => {
      if (animate) {
        node.glowPhase = (node.glowPhase + 0.007) % (Math.PI * 2);
      }
      const alpha = node.isScatter ? 0.12 + 0.08 * Math.sin(node.glowPhase) : 0.38 + 0.22 * Math.sin(node.glowPhase);
      const radius = node.radius * (node.isScatter ? 1 : 1 + 0.12 * Math.sin(node.glowPhase));
      const gradient = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4);
      gradient.addColorStop(0, `${glowColorPrefix}${alpha * 0.3})`);
      gradient.addColorStop(1, `${glowColorPrefix}0)`);
      context.beginPath();
      context.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();
      context.beginPath();
      context.arc(node.x, node.y, radius, 0, Math.PI * 2);
      context.fillStyle = `${glowColorPrefix}${alpha})`;
      context.fill();
    });

    if (animate && timestamp - lastPulseTimestamp > 220) {
      createPulse();
      createPulse();
      lastPulseTimestamp = timestamp;
    }
  }

  function stopAnimation() {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  function renderNetwork(timestamp) {
    animationFrameId = null;
    if (!isVisible || document.hidden || motionPreference.matches) {
      return;
    }
    drawScene(timestamp, true);
    animationFrameId = window.requestAnimationFrame(renderNetwork);
  }

  function syncPlayback() {
    stopAnimation();
    if (isVisible && !document.hidden) {
      animationFrameId = window.requestAnimationFrame(renderNetwork);
    }
  }

  function resizeCanvas() {
    canvasWidth = Math.max(canvas.clientWidth, 1);
    canvasHeight = Math.max(canvas.clientHeight, 1);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvasWidth * pixelRatio);
    canvas.height = Math.round(canvasHeight * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    buildNetwork();
    if (motionPreference.matches) {
      drawScene(0, false);
    }
  }

  const resizeObserver = new ResizeObserver(resizeCanvas);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    syncPlayback();
  });
  resizeObserver.observe(canvas);
  visibilityObserver.observe(canvas);
  motionPreference.addEventListener("change", syncPlayback);
  document.addEventListener("visibilitychange", syncPlayback);
  resizeCanvas();
  syncPlayback();

  return () => {
    stopAnimation();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    motionPreference.removeEventListener("change", syncPlayback);
    document.removeEventListener("visibilitychange", syncPlayback);
  };
}
