const toggle = document.querySelector("[data-debug-toggle]");
const panel = document.querySelector("[data-debug-panel]");
const info = document.querySelector("[data-debug-info]");

const readVar = (name, fallback) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

const readNumber = (name, fallback) => {
  const value = parseFloat(readVar(name, fallback));
  return Number.isNaN(value) ? fallback : value;
};

const gridPx = () => {
  const grid = readNumber("--grid-size", 0);
  return grid;
};

const updatePanel = () => {
  if (!info) return;
  const columns = readNumber("--grid-columns", 0);
  const size = gridPx();
  const width = window.innerWidth;
  const height = window.innerHeight;
  info.textContent = `Grid: ${columns} cols | ${size.toFixed(2)}px | ${width}x${height}`;
};

const setDebugMode = (enabled) => {
  document.body.classList.toggle("debug-mode", enabled);
  if (toggle) {
    toggle.textContent = enabled ? "Debug On" : "Debug Grid";
  }
  updatePanel();
};

if (toggle) {
  toggle.addEventListener("click", () => {
    const enabled = !document.body.classList.contains("debug-mode");
    setDebugMode(enabled);
  });
}

window.addEventListener("resize", () => {
  updatePanel();
});

updatePanel();
