const SCROLLBAR_CLS = "custom-scrollbar";
const VISIBLE_CLS = "is-visible";
const DRAGGING_CLS = "is-dragging";

const root = document.createElement("div");
const track = document.createElement("div");
const thumb = document.createElement("div");

root.className = SCROLLBAR_CLS;
track.className = `${SCROLLBAR_CLS}__track`;
thumb.className = `${SCROLLBAR_CLS}__thumb`;

track.appendChild(thumb);
root.appendChild(track);
document.body.append(root);

const getMetrics = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = window.scrollY || 0;
  return { scrollHeight, clientHeight, scrollTop };
};

const update = () => {
  const { scrollHeight, clientHeight, scrollTop } = getMetrics();
  const scrollable = scrollHeight - clientHeight;

  if (scrollable <= 1) {
    root.classList.remove(VISIBLE_CLS);
    return;
  }

  root.classList.add(VISIBLE_CLS);

  const trackHeight = track.clientHeight;
  const thumbRatio = clientHeight / scrollHeight;
  const thumbHeight = Math.max(24, trackHeight * thumbRatio);
  const maxThumbTop = trackHeight - thumbHeight;
  const thumbTop = (scrollTop / scrollable) * maxThumbTop;

  thumb.style.height = `${thumbHeight}px`;
  thumb.style.transform = `translateY(${thumbTop}px)`;
};

let rafPending = false;
const scheduleUpdate = () => {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    rafPending = false;
    update();
  });
};

track.addEventListener("click", (event) => {
  if (event.target === thumb) return;
  const rect = track.getBoundingClientRect();
  const clickY = event.clientY - rect.top;
  const { scrollHeight, clientHeight } = getMetrics();
  const scrollable = scrollHeight - clientHeight;
  if (scrollable <= 0) return;
  window.scrollTo(0, (clickY / rect.height) * scrollable);
});

let dragging = false;
let dragStartY = 0;
let dragStartScrollY = 0;

thumb.addEventListener("mousedown", (event) => {
  dragging = true;
  dragStartY = event.clientY;
  dragStartScrollY = window.scrollY;
  root.classList.add(DRAGGING_CLS);
  document.body.style.userSelect = "none";
  document.body.style.cursor = "grabbing";
  event.preventDefault();
});

document.addEventListener("mousemove", (event) => {
  if (!dragging) return;
  const { scrollHeight, clientHeight } = getMetrics();
  const scrollable = scrollHeight - clientHeight;
  if (scrollable <= 0) return;

  const trackHeight = track.clientHeight;
  const thumbHeight = thumb.clientHeight;
  const maxThumbTop = trackHeight - thumbHeight;
  const trackPxPerScrollPx = maxThumbTop / scrollable;
  const scrollDelta = (event.clientY - dragStartY) / trackPxPerScrollPx;
  window.scrollTo(0, dragStartScrollY + scrollDelta);
});

document.addEventListener("mouseup", () => {
  if (!dragging) return;
  dragging = false;
  root.classList.remove(DRAGGING_CLS);
  document.body.style.userSelect = "";
  document.body.style.cursor = "";
});

window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate, { passive: true });
window.addEventListener("load", scheduleUpdate);
scheduleUpdate();
