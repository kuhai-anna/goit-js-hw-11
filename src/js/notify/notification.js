import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Налаштування сповіщень
const notiflixOptions = {
  width: '330px',
  fontSize: '16px',
  position: 'right-top',
  timeout: 2500,
};

// Сповіщення про помилку пошуку
export function onSearchError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    notiflixOptions
  );
}

// Сповіщення про результат пошуку
export function onSearchSucces({ totalHits }) {
  Notify.success(`Hooray! We found ${totalHits} images.`, notiflixOptions);
}

// // Сповіщення про загальну помилку
// function onFetchError({ status }) {
//   Notify.failure(`Error! Status ${status}!`, notiflixOptions);
// }

// export { onSearchError, onSearchSucces }; //onFetchError,
