export const renderCharacters = (container, characters) => {
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
};

//
