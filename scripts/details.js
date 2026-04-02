import { fetchCharacterById } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const loadSingleCharacter = async () => {
  try {
    const character = await fetchCharacterById(id);

    document.getElementById("char-name").textContent = character.name;
    document.getElementById("char-image").src = character.image;
    document.getElementById("char-status").textContent = character.status;
    document.getElementById("char-species").textContent = character.species;
    document.getElementById("char-gender").textContent = character.gender;
    document.getElementById("char-origin").textContent = character.origin.name;
  } catch (error) {
    console.error(error);
  }
};

loadSingleCharacter();

document.getElementById("back-btn").addEventListener("click", () => {
  window.history.back();
});
