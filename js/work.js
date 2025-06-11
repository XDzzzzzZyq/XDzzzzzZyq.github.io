const data = [
  {
    title: "Nature Walk",
    thumbnail: "https://placehold.co/400x200?text=Nature",
    creator: "Jane Doe",
  },
  {
    title: "City Drone",
    thumbnail: "https://placehold.co/400x200?text=City",
    creator: "John Smith",
  },
  {
    title: "Underwater World",
    thumbnail: "https://placehold.co/400x200?text=Ocean",
    creator: "AquaVision",
  },
{
    title: "Underwater World",
    thumbnail: "https://placehold.co/400x200?text=Ocean",
    creator: "AquaVision",
  },
  // ... Add more items
];

const board = document.getElementById("board");

data.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";
  
  card.innerHTML = `
    <img src="${item.thumbnail}" alt="${item.title}">
    <div class="card-content">
      <h3 class="card-title">${item.title}</h3>
      <div class="card-meta">by ${item.creator}</div>
    </div>
  `;

  board.appendChild(card);
});