import '../css/index.css';
import axios, { isCancel, AxiosError } from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ImageApiService } from './image-service';

// Новий екземпляр класу
const imageApiService = new ImageApiService();

// Налаштування сповіщень
export const notiflixOptions = {
  width: '330px',
  fontSize: '16px',
  position: 'right-top',
  timeout: 2500,
};

// Посилання на елементи
const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// Слухачі подій
refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// Пошук картинки
function onSearch(e) {
  e.preventDefault();

  removeMarkup();

  imageApiService.query = e.target.elements.searchQuery.value.trim();
  imageApiService.resetPage();

  if (imageApiService.query !== '') {
    imageApiService
      .fetchImages()
      .then(data => {
        if (data.hits.length === 0) {
          onSearchError();
        } else {
          onSearchSucces(data);
          renderImageCard(data.hits);
        }
      })
      .catch(onFetchError);
  } else {
    removeMarkup();
  }
}

// Завантаженн більшої кількості картинок
function onLoadMore() {
  imageApiService
    .fetchImages()
    .then(data => renderImageCard(data.hits))
    .catch(onFetchError);
}

// Стварення та рендеринг розмітки
function renderImageCard(array) {
  const imageCardMarkup = array
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`
    )
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', imageCardMarkup);
}

// Сповіщення про загальну помилку
function onFetchError() {
  Notify.failure(
    'Oooops! Something went wrong. Please try again later.',
    notiflixOptions
  );
}

// Сповіщення про помилку пошуку
function onSearchError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    notiflixOptions
  );
}

// Сповіщення про результат пошуку
function onSearchSucces({ totalHits }) {
  Notify.success(`Hooray! We found ${totalHits} images.`, notiflixOptions);
}

// Динамічне видалення розмітки
function removeMarkup() {
  refs.galleryEl.innerHTML = '';
}
