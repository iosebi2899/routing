const container = document.getElementById("character-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;
let totalPages = 1;
let currentSearch = "";

const loadCharacters = async () => {
  try {
    let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
    if (currentSearch) {
      url += `&name=${encodeURIComponent(currentSearch)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      container.innerHTML = "<p>No characters found.</p>";
      totalPages = 1;
      currentPage = 1;
      updatePagination();
      return;
    }

    const data = await response.json();
    totalPages = data.info.pages;
    const characters = data.results;

    container.innerHTML = "";

    characters.forEach((character) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${character.image}" alt="#">
        <h3>${character.name}</h3>
        <button id="${character.id}">View Details</button>
    `;
      container.appendChild(card);

      const button = document.getElementById(character.id);

      button.addEventListener("click", () => {
        window.location.href = `details.html?id=${character.id}`;
      });
    });

    updatePagination();
  } catch (error) {
    console.error(error);
  }
};

const updatePagination = () => {
  pageInfo.textContent = `${currentPage} / ${totalPages}`;
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;
};

searchBtn.addEventListener("click", () => {
  currentSearch = searchInput.value.trim();
  currentPage = 1;
  loadCharacters();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadCharacters();
  }
});

loadCharacters();
