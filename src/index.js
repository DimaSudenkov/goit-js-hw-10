import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";


const selectors = {
  selectBreed: document.querySelector('.breed-select'),
  loaderText: document.querySelector('.loader'),
  errorText: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info')
}

selectors.selectBreed.style.visibility = 'hidden';
selectors.loaderText.style.visibility = 'visible';
selectors.errorText.style.visibility = 'hidden';

fetchBreeds()
  .then(data => {
    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      selectors.selectBreed.appendChild(option);
    });
  }).then(() => {
    selectors.selectBreed.style.visibility = 'visible';
    selectors.loaderText.style.visibility = 'hidden';
  })
  .catch(() => {
    selectors.selectBreed.style.visibility = 'hidden';
    selectors.loaderText.style.visibility = 'hidden';
    selectors.errorText.style.visibility = 'visible';
  })

selectors.selectBreed.addEventListener('change', handlerChange)

function handlerChange(evt) {
  const breedId = evt.target.value;
  selectors.loaderText.style.visibility = 'visible';
  fetchCatByBreed(breedId)
    .then((data) => selectors.catInfo.innerHTML = markupBreed(data))
    .then(() => selectors.loaderText.style.visibility = 'hidden')
    .catch(err => console.log(err))
}

function markupBreed(arr) {
  return arr.map(({ url, breeds: { [0]: { name, description, temperament } } }) =>
    `<img src="${url}" alt="${name}" width = '300'/>
        <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament:</b>${temperament}</p>
      `
  ).join('')
}

