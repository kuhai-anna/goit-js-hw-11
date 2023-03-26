import { refs } from '../../index';

// Стварення та рендеринг розмітки
export function renderImageCard(array) {
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
  <a class="image-link"><img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
</div>`
    )
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', imageCardMarkup);
}

// Динамічне видалення розмітки
export function removeMarkup() {
  refs.galleryEl.innerHTML = '';
}
