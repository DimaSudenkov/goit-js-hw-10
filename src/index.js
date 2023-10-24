import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './style.css';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectors = {
  selectBreed: document.querySelector('.breed-select'),
  loaderText: document.querySelector('.loader'),
  errorText: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
}

selectors.selectBreed.style.display = 'none';
selectors.loaderText.style.display = 'block';
selectors.errorText.style.display = 'none';

let arrBreedsId = [];

fetchBreeds()
  .then(data => {
    data.forEach(breed => {
      arrBreedsId.push({ text: breed.name, value: breed.id });
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      selectors.selectBreed.appendChild(option);
    });
  }).then(() => {
    selectors.selectBreed.style.display = 'inline-block';
    new SlimSelect({
      select: '.breed-select',
      data: arrBreedsId,
    });
    selectors.loaderText.style.display = 'none';
  })
  .catch(() => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      width: '400px',
      position: 'center-center',
      timeout: '5000'
    })
    selectors.selectBreed.style.display = 'none';
    selectors.loaderText.style.display = 'none';
    selectors.errorText.style.display = 'block';
  })

selectors.selectBreed.addEventListener('change', handlerChange)

function handlerChange(evt) {
  const breedId = evt.target.value;
  selectors.loaderText.style.display = 'block';
  fetchCatByBreed(breedId)
    .then((data) => selectors.catInfo.innerHTML = markupBreed(data))
    .then(() => selectors.loaderText.style.display = 'none')
    .catch(err => console.log(err))
}

function markupBreed(arr) {
  return arr.map(({ url, breeds: { [0]: { name, description, temperament } } }) =>
    `<img src="${url}" alt="${name}" width = '350'/>
        <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament:</b>${temperament}</p>`
  ).join('')
}

