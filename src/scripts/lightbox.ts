/**
 * Zoom view for the work images.
 *
 * Every image in a work's stack is wrapped in a `[data-lightbox]` button that
 * carries the full-size source. Clicking one fills the single overlay that
 * DesignLayout renders and fades it in over a dimmed page; clicking anywhere,
 * pressing Escape, or hitting the close button puts it away again.
 *
 * The overlay stays in the DOM `hidden` between openings so the transition has
 * something to animate and focus can move into it.
 */
const overlay = document.querySelector<HTMLElement>("[data-lightbox-root]");
const zoomImage = overlay?.querySelector<HTMLImageElement>("[data-lightbox-image]");
const zoomCaption = overlay?.querySelector<HTMLElement>("[data-lightbox-caption]");
const zoomClose = overlay?.querySelector<HTMLButtonElement>(".lightbox__close");

if (overlay && zoomImage && zoomCaption && zoomClose) {
  const OPEN_CLASS = "is-open";
  const BODY_CLASS = "lightbox-open";
  const styles = getComputedStyle(document.documentElement);
  const fadeOutMs = (Number(styles.getPropertyValue("--anim-lightbox-duration")) || 0.24) * 1000;
  let lastTrigger: HTMLElement | null = null;

  const open = (trigger: HTMLElement) => {
    const src = trigger.dataset.lightboxSrc;
    if (!src) return;

    lastTrigger = trigger;
    zoomImage.src = src;
    zoomImage.alt = trigger.querySelector("img")?.alt ?? "";
    zoomCaption.textContent = trigger.dataset.lightboxCaption ?? "";
    overlay.hidden = false;
    document.body.classList.add(BODY_CLASS);
    // Next frame, so the browser has a hidden->visible state to transition from.
    requestAnimationFrame(() => overlay.classList.add(OPEN_CLASS));
    zoomClose.focus();
  };

  const close = () => {
    if (overlay.hidden) return;

    overlay.classList.remove(OPEN_CLASS);
    document.body.classList.remove(BODY_CLASS);
    lastTrigger?.focus();
    lastTrigger = null;
    // Kept in the DOM until the fade-out has played; --anim-lightbox-duration
    // is the same value the stylesheet transitions on.
    window.setTimeout(() => {
      if (overlay.classList.contains(OPEN_CLASS)) return;
      overlay.hidden = true;
      zoomImage.removeAttribute("src");
    }, fadeOutMs);
  };

  document.addEventListener("click", (event) => {
    const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-lightbox]");
    if (trigger) {
      open(trigger);
      return;
    }
    if (!overlay.hidden && (event.target as HTMLElement | null)?.closest("[data-lightbox-root]")) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}
