// Додатковий імпорт стилів для SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { refs } from '../../index';

// Створення модалки
const simpleLightbox = new SimpleLightbox('.gallery a');

// Стварення та рендеринг розмітки
export function renderImageCard(array) {
  const imageCardMarkup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="image-link link" href="${largeImageURL}">
              <div class="photo-card">
                <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                  <p class="info-item">
                    <b>Likes</b> <span>${likes}</span>
                  </p>
                  <p class="info-item">
                    <b>Views</b> <span>${views}</span>
                  </p>
                  <p class="info-item">
                    <b>Comments</b> <span>${comments}</span>
                  </p>
                  <p class="info-item">
                    <b>Downloads</b> <span>${downloads}</span>
                  </p>
                </div>
              </div></a>`
    )
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', imageCardMarkup);
  simpleLightbox.refresh();
}

// Динамічне видалення розмітки
export function removeMarkup() {
  refs.galleryEl.innerHTML = '';
}
