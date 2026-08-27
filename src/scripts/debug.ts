const toggle = document.querySelector("[data-debug-toggle]");
const info = document.querySelector("[data-debug-info]");

const readVar = (name: string, fallback: string): string => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

const readNumber = (name: string, fallback: number): number => {
  const value = parseFloat(readVar(name, String(fallback)));
  return Number.isNaN(value) ? fallback : value;
};

const updatePanel = () => {
  if (!info) return;
  const columns = readNumber("--grid-columns", 0);
  const size = readNumber("--grid-size", 0);
  const width = window.innerWidth;
  const height = window.innerHeight;
  info.textContent = `Grid: ${columns} cols | ${size.toFixed(2)}px | ${width}x${height}`;
};

const setDebugMode = (enabled: boolean) => {
  document.body.classList.toggle("debug-mode", enabled);
  if (toggle) {
    toggle.textContent = enabled ? "Debug On" : "Debug Grid";
  }
  updatePanel();
};

toggle?.addEventListener("click", () => {
  setDebugMode(!document.body.classList.contains("debug-mode"));
});

window.addEventListener("resize", updatePanel);
setDebugMode(true);
