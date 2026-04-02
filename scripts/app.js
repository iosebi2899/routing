import { fetchCharacters } from "./api.js";
import { renderCharacters } from "./ui.js";

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
    const data = await fetchCharacters(currentPage, currentSearch);

    totalPages = data.info.pages;
    const characters = data.results;

    renderCharacters(container, characters);

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
  if (e.target.value === "Enter") {
    currentSearch = searchInput.value.trim();
    currentPage = 1;
    loadCharacters();
  }
});

const delayedTimeout = setTimeout(() => {
  console.log("Hello");
}, 1000);

clearTimeout(delayedTimeout);

const debounce = (fn, delay = 300) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};

searchInput.addEventListener(
  "input",
  debounce(() => {
    currentSearch = searchInput.value.trim();
    currentPage = 1;
    loadCharacters();
  }),
);

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
