function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const API_KEY = 'live_YvBUC7pNaVN9iFaNNxOzRzSiJlefW0E3guhFWu0uXRwmA951TzOxA00DwbPam2pW';

  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
      return resp.json()
    })
}

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const API_KEY = 'live_YvBUC7pNaVN9iFaNNxOzRzSiJlefW0E3guhFWu0uXRwmA951TzOxA00DwbPam2pW';

  return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(resp => {
      console.log(resp)
      if (!resp.ok) {
        throw new Error(resp.statusText)
      };
      return resp.json()
    })
}

export { fetchCatByBreed }
export { fetchBreeds }

