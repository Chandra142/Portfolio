import { qs } from "../../utils/dom.js";

let canvas;
let context;
let canvasWidth;
let canvasHeight;
let nodes = [];
let edges = [];
let pulses = [];
let animationFrameId;
let lastPulseTimestamp = 0;

function isDarkTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function resizeCanvas() {
  if (!canvas) {
    return;
  }

  canvasWidth = canvas.width = canvas.offsetWidth;
  canvasHeight = canvas.height = canvas.offsetHeight;
}

function buildNodes() {
  nodes = [];
  const layers = [4, 6, 8, 6, 4];
  const networkWidth = canvasWidth * 0.55;
  const startX = canvasWidth * 0.3;

  layers.forEach((count, layerIndex) => {
    const x = startX + (layerIndex / (layers.length - 1)) * networkWidth;

    for (let nodeIndex = 0; nodeIndex < count; nodeIndex += 1) {
      const y = canvasHeight * 0.15 + (nodeIndex / (count - 1 || 1)) * (canvasHeight * 0.7);
      nodes.push({
        x,
        y,
        layerIndex,
        radius: 3 + Math.random() * 2,
        glowPhase: Math.random() * Math.PI * 2,
      });
    }
  });

  for (let index = 0; index < 28; index += 1) {
    nodes.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      layerIndex: -1,
      radius: 1.5 + Math.random() * 1.5,
      glowPhase: Math.random() * Math.PI * 2,
      isScatter: true,
    });
  }
}

function buildEdges() {
  edges = [];
  const layers = [4, 6, 8, 6, 4];
  const nodesByLayer = layerIndex => nodes.filter(node => node.layerIndex === layerIndex);

  for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex += 1) {
    const currentLayer = nodesByLayer(layerIndex);
    const nextLayer = nodesByLayer(layerIndex + 1);

    currentLayer.forEach(startNode => {
      nextLayer.forEach(endNode => {
        if (Math.random() < 0.5) {
          edges.push({ startNode, endNode });
        }
      });
    });
  }
}

function createPulse() {
  const primaryNodes = nodes.filter(node => !node.isScatter);

  if (!primaryNodes.length) {
    return;
  }

  const activeNode = primaryNodes[Math.floor(Math.random() * primaryNodes.length)];
  const connectedEdges = edges.filter(
    edge => edge.startNode === activeNode || edge.endNode === activeNode
  );

  if (!connectedEdges.length) {
    return;
  }

  const edge = connectedEdges[Math.floor(Math.random() * connectedEdges.length)];
  pulses.push({
    edge,
    progress: 0,
    speed: 0.007 + Math.random() * 0.012,
    forward: edge.startNode === activeNode,
  });
}

function drawPulse(pulse, glowColorPrefix) {
  pulse.progress += pulse.speed;

  if (pulse.progress > 1) {
    return false;
  }

  const { startNode, endNode } = pulse.edge;
  const fromX = pulse.forward ? startNode.x : endNode.x;
  const fromY = pulse.forward ? startNode.y : endNode.y;
  const toX = pulse.forward ? endNode.x : startNode.x;
  const toY = pulse.forward ? endNode.y : startNode.y;
  const x = fromX + (toX - fromX) * pulse.progress;
  const y = fromY + (toY - fromY) * pulse.progress;

  const gradient = context.createRadialGradient(x, y, 0, x, y, 7);
  gradient.addColorStop(0, `${glowColorPrefix}0.9)`);
  gradient.addColorStop(1, `${glowColorPrefix}0)`);

  context.beginPath();
  context.arc(x, y, 7, 0, Math.PI * 2);
  context.fillStyle = gradient;
  context.fill();

  context.beginPath();
  context.arc(x, y, 2.5, 0, Math.PI * 2);
  context.fillStyle = `${glowColorPrefix}1)`;
  context.fill();

  return true;
}

function drawNode(node, glowColorPrefix) {
  node.glowPhase = (node.glowPhase + 0.007) % (Math.PI * 2);

  const alpha = node.isScatter
    ? 0.12 + 0.08 * Math.sin(node.glowPhase)
    : 0.38 + 0.22 * Math.sin(node.glowPhase);
  const radius = node.radius * (node.isScatter ? 1 : 1 + 0.12 * Math.sin(node.glowPhase));

  context.beginPath();
  context.arc(node.x, node.y, radius, 0, Math.PI * 2);
  context.fillStyle = node.isScatter
    ? `${glowColorPrefix}${alpha * 0.5})`
    : `${glowColorPrefix}${alpha})`;
  context.fill();

  if (node.isScatter) {
    return;
  }

  const gradient = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4);
  gradient.addColorStop(0, `${glowColorPrefix}${alpha * 0.3})`);
  gradient.addColorStop(1, `${glowColorPrefix}0)`);

  context.beginPath();
  context.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
  context.fillStyle = gradient;
  context.fill();
}

function renderNetwork(timestamp) {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  const edgeColor = isDarkTheme()
    ? "rgba(124,58,237,0.13)"
    : "rgba(91,33,182,0.09)";
  const glowColorPrefix = isDarkTheme() ? "rgba(167,139,250," : "rgba(124,58,237,";

  edges.forEach(({ startNode, endNode }) => {
    context.beginPath();
    context.moveTo(startNode.x, startNode.y);
    context.lineTo(endNode.x, endNode.y);
    context.strokeStyle = edgeColor;
    context.lineWidth = 0.7;
    context.stroke();
  });

  pulses = pulses.filter(pulse => drawPulse(pulse, glowColorPrefix));
  nodes.forEach(node => drawNode(node, glowColorPrefix));

  if (timestamp - lastPulseTimestamp > 220) {
    createPulse();
    createPulse();
    lastPulseTimestamp = timestamp;
  }

  animationFrameId = requestAnimationFrame(renderNetwork);
}

export function initNeuralNetwork() {
  canvas = qs("#nn-canvas");

  if (!canvas) {
    return () => {};
  }

  context = canvas.getContext("2d");
  cancelAnimationFrame(animationFrameId);
  resizeCanvas();
  buildNodes();
  buildEdges();
  requestAnimationFrame(renderNetwork);

  window.addEventListener("resize", initNeuralNetwork);

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", initNeuralNetwork);
  };
}
