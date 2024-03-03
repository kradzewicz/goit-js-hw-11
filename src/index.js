import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('[title="breed-selector"]');
breedSelect.classList.add('hidden');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

try {
  loader.classList.remove('hidden');
  fetchBreeds().then(breedList => {
    new SlimSelect({
      select: '.breed-select',
      settings: {
        showSearch: false,
        placeholder: 'Choose breed',
      },
      data: breedList,
    });
    loader.classList.add('hidden');
    breedSelect.classList.remove('hidden');
  });
} catch (error) {
  console.log(error);
}

breedSelect.addEventListener('change', event => {
  if (catInfo.hasChildNodes()) {
    const child = catInfo.firstElementChild;
    child.remove();
  }

  fetchCatByBreed(event.target.value).then(data => renderCat(data[0]));
  loader.classList.remove('hidden');
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="catBox">
        <img src="${url}" alt="${name}" width=500/>
        <div class="catBox--description">
            <h2>${name}</h2>
            <p>${description}</p>
            <p><strong>Temperament:</strong> ${temperament}</p>
        </div>
    </div>`
  );
  loader.classList.add('hidden');
}
