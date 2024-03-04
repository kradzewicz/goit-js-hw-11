import axios from 'axios';
import Notiflix from 'notiflix';
// import simpleLightbox from 'simplelightbox';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('[name="searchQuery"]');
const loadBtn = document.querySelector('.load-more');

let currentInput;
let currentPage = 1;
let totalHits;
let perPage;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  if (searchInput.value.trim() === '') {
    Notiflix.Notify.failure('Fill search input with at least one word', {
      timeout: 3000,
    });
    return;
  }

  if (currentInput === searchInput.value.trim()) {
    loadMore();
  } else {
    gallery.innerHTML = '';
    currentPage = 1;
    await renderImages(currentPage);
  }

  currentInput = searchInput.value.trim();
});

async function renderImages(currentPage) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42678880-eadc4e4c35901791582abd4fa',
      q: searchInput.value.trim(),
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: currentPage,
    },
  });

  const hitsArray = await response.data.hits;
  perPage = hitsArray.length;

  if (currentPage === 1) {
    totalHits = await response.data.total;
    if (totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  totalHits -= perPage;

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
  loadBtn.classList.remove('hidden');
  if (totalHits <= 0) {
    loadBtn.classList.add('hidden');

    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function loadMore() {
  loadBtn.classList.add('hidden');
  currentPage += 1;
  renderImages(currentPage);
}

loadBtn.addEventListener('click', loadMore);
