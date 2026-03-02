import { worksData } from "./config/data.js";

const board = document.getElementById("board");

worksData.forEach(item => {
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
