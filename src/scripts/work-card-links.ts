const cards = document.querySelectorAll<HTMLElement>("[data-card-link]");

for (const card of cards) {
  const href = card.dataset.cardLink;
  if (!href) continue;

  card.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest("a,button,input,select,textarea,label")) return;
    window.location.href = href;
  });

  card.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest("a,button,input,select,textarea,label")) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = href;
    }
  });
}
