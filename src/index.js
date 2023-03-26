import './css/index.css';
// Додатковий імпорт стилів для SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { ImagePixabayService } from './js/requests/images';
import { renderImageCard, removeMarkup } from './js/services/markup-image';
import { onSearchError, onSearchSucces } from './js/notify/notification'; //onFetchError,

// Новий екземпляр класу
const imagePixabayService = new ImagePixabayService();

// Посилання на елементи
export const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// Слухачі подій
refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// Пошук картинки
async function onSearch(e) {
  e.preventDefault();

  removeMarkup();

  imagePixabayService.query = e.target.elements.searchQuery.value.trim();
  imagePixabayService.resetPage();

  // if (imagePixabayService.query !== '') {
  //   getImages()
  //     .then(data => {
  //       if (data.hits.length === 0) {
  //         throw new Error();
  //         // onSearchError();
  //       } else {
  //         onSearchSucces(data);
  //         renderImageCard(data.hits);
  //       }
  //     })
  //     .catch(onSearchError);
  // } else {
  //   removeMarkup();
  // }

  // if (imagePixabayService.query !== '') {
  //   imagePixabayService
  //     .fetchImages()
  //     .then(data => {
  //       if (data.hits.length === 0) {
  //         throw new Error();
  //         // onSearchError();
  //       } else {
  //         onSearchSucces(data);
  //         renderImageCard(data.hits);
  //       }
  //     })
  //     .catch(onSearchError);
  // } else {
  //   removeMarkup();
  // }

  if (imagePixabayService.query !== '') {
    try {
      const data = await imagePixabayService.fetchImages();

      if (data.hits.length === 0) {
        throw new Error();
        // onSearchError();
      } else {
        onSearchSucces(data);
        renderImageCard(data.hits);
      }
    } catch {
      onSearchError;
    }
  } else {
    removeMarkup();
  }
}

// Завантаження більшої кількості картинок
async function onLoadMore() {
  try {
    const data = await imagePixabayService.fetchImages();
    return renderImageCard(data.hits);
  } catch {
    onSearchError;
  }
}

// // Динамічне видалення розмітки
// function removeMarkup() {
//   refs.galleryEl.innerHTML = '';
// }

// -------
// Стварення та рендеринг розмітки
// function renderImageCard(array) {
//   const imageCardMarkup = array
//     .map(
//       ({
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${downloads}
//     </p>
//   </div>
// </div>`
//     )
//     .join('');

//   // refs.galleryEl.insertAdjacentHTML('beforeend', imageCardMarkup);
// }

// // Пошук картинки
// function onSearch(e) {
//   e.preventDefault();

//   removeMarkup();

//   imageApiService.query = e.target.elements.searchQuery.value.trim();
//   imageApiService.resetPage();

//   if (imageApiService.query !== '') {
//     imageApiService
//       .fetchImages()
//       .then(data => {
//         if (data.hits.length === 0) {
//           throw new Error();
//           // onSearchError();
//         } else {
//           onSearchSucces(data);
//           renderImageCard(data.hits);
//         }
//       })
//       .catch(onSearchError);
//   } else {
//     removeMarkup();
//   }
// }

// // Завантаженн більшої кількості картинок
// function onLoadMore() {
//   imageApiService
//     .fetchImages()
//     .then(data => renderImageCard(data.hits))
//     .catch(onFetchError);
// }

// // -------
// // Стварення та рендеринг розмітки
// function renderImageCard(array) {
//   const imageCardMarkup = array
//     .map(
//       ({
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${downloads}
//     </p>
//   </div>
// </div>`
//     )
//     .join('');

//   refs.galleryEl.insertAdjacentHTML('beforeend', imageCardMarkup);
// }

// // Динамічне видалення розмітки
// function removeMarkup() {
//   refs.galleryEl.innerHTML = '';
// }

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Налаштування сповіщень
// export const notiflixOptions = {
//   width: '330px',
//   fontSize: '16px',
//   position: 'right-top',
//   timeout: 2500,
// };

// // Сповіщення про загальну помилку
// function onFetchError() {
//   // Notify.failure(`Error! Status ${status}`, notiflixOptions);

//   Notify.failure(
//     'Oooops! Something went wrong. Please try again later.',
//     notiflixOptions
//   );
// }

// // Сповіщення про помилку пошуку
// function onSearchError() {
//   Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.',
//     notiflixOptions
//   );
// }

// // Сповіщення про результат пошуку
// function onSearchSucces({ totalHits }) {
//   Notify.success(`Hooray! We found ${totalHits} images.`, notiflixOptions);
// }
