import { apiPixabayJson } from '../services/image-api';

const KEY = '34648094-ca1417e5f0eb28e7a5cc77423';

export class ImagePixabayService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      key: `${KEY}`,
      q: `${this.searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: `true`,
      page: `${this.page}`,
      per_page: '40',
    });

    const { data } = await apiPixabayJson.get(`?${searchParams}`);
    this.incrementPage();

    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  } // скидаємо номер сторінки під час нового запиту

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
