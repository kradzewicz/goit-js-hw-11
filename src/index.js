// 42678880-eadc4e4c35901791582abd4fa
import axios from 'axios';
import Notiflix from 'notiflix';
// import Notiflix from 'notiflix';
// import simpleLightbox from 'simplelightbox';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('[name="searchQuery"]');
const loadBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  if (searchInput.value.trim() === '') {
    Notiflix.Notify.failure('Fill search input with at least one word', {
      timeout: 3000,
    });
    return;
  }
  renderImages();
});

async function renderImages() {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42678880-eadc4e4c35901791582abd4fa',
      q: searchInput.value.trim(),
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: 1,
    },
  });

  const hitsArray = await response.data.hits;
  const markupArray = hitsArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
      </div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markupArray);
}
