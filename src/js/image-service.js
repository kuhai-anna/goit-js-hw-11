import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notiflixOptions } from './index';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34648094-ca1417e5f0eb28e7a5cc77423';

export class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const searchParams = new URLSearchParams({
      key: `${KEY}`,
      q: `${this.searchQuery}`,
      image_type: 'photo',
      orientation: 'horizonta',
      safesearch: `true`,
      page: `${this.page}`,
      per_page: '40',
    });

    return fetch(`${BASE_URL}?${searchParams}`)
      .then(response => {
        if (!response.ok) {
          throw Notify.failure(
            `Error! Status ${response.status}`,
            notiflixOptions
          );
        }

        return response.json();
      })
      .then(data => {
        this.incrementPage();

        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  } // скидаєио номер сторінки під час нового запиту

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
