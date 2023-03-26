import './css/index.css';
import { ImagePixabayService } from './js/requests/images';
import { renderImageCard, removeMarkup } from './js/services/markup-image';
import {
  searchError,
  searchSucces,
  searchResulEnd,
} from './js/notify/notification'; //fetchError,

// Новий екземпляр класу
const imagePixabayService = new ImagePixabayService();

// Посилання на елементи
export const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.display = 'none'; //приховуємо кнопку за замовчуванням

// Слухачі подій
refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// Пошук картинки
async function onSearch(e) {
  e.preventDefault();

  removeMarkup(); // видаляємо розмітку при повторному сабміті
  refs.loadMoreBtn.style.display = 'none'; // ховаємо кнопку при повторному сабміті

  imagePixabayService.query = e.target.elements.searchQuery.value.trim();
  imagePixabayService.resetPage();

  if (imagePixabayService.query !== '') {
    try {
      const data = await imagePixabayService.fetchImages();

      if (data.hits.length === 0) {
        throw new Error();
        // onSearchError();
      } else if (data.hits.length < 40) {
        searchSucces(data);
        renderImageCard(data.hits);
      } else {
        searchSucces(data);
        renderImageCard(data.hits);

        refs.loadMoreBtn.style.display = 'block'; //багато картинок, показуємо кнопку loadMoreBtn
      }
    } catch {
      searchError();
    }
  } else {
    removeMarkup();
  }
}

// Завантаження більшої кількості картинок
async function onLoadMore() {
  try {
    const data = await imagePixabayService.fetchImages();

    if (data.hits.length < 40) {
      searchResulEnd();
      refs.loadMoreBtn.style.display = 'none';
    }

    return renderImageCard(data.hits);
  } catch {
    searchError();
  }
}
