// Додатковий імпорт стилів для SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { refs } from '../../index';

// Створення модалки
// const simpleLightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

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
                    <b>Likes</b> ${likes}
                  </p>
                  <p class="info-item">
                    <b>Views</b> ${views}
                  </p>
                  <p class="info-item">
                    <b>Comments</b> ${comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b> ${downloads}
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