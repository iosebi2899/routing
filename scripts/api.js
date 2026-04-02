const BASE_URL = `https://rickandmortyapi.com/api/character/`;

export const fetchCharacters = async (page = 1, name) => {
  try {
    let url = `${BASE_URL}?page=${page}`;
    if (name) {
      url += `&name=${name}`;
    }
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}${id}`);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
