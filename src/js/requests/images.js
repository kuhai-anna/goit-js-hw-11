// import { apiPixabayJson } from '../services/image-api';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34648094-ca1417e5f0eb28e7a5cc77423';

// export class ImagePixabayService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   getImages() {
//     const searchParams = {
//       key: `${KEY}`,
//       q: `${this.searchQuery}`,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: `true`,
//       page: `${this.page}`,
//       per_page: '40',
//     };

//     return apiPixabayJson.get(`?${searchParams}`).then(data => {
//       this.incrementPage();

//       return data;
//     });

//     // return fetch(`${BASE_URL}?${searchParams}`)
//     //   .then(response => {
//     //     // if (!response.ok) {
//     //     //   throw new Error(response.status);
//     //     // }
//     //     return response.json();
//     //   })
//     //   .then(data => {
//     //     this.incrementPage();

//     //     return data;
//     //   });
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   } // скидаєио номер сторінки під час нового запиту

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

export class ImagePixabayService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // fetchImages() {
  //   const searchParams = new URLSearchParams({
  //     key: `${KEY}`,
  //     q: `${this.searchQuery}`,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: `true`,
  //     page: `${this.page}`,
  //     per_page: '40',
  //   });

  //   return fetch(`${BASE_URL}?${searchParams}`)
  //     .then(response => {
  //       // if (!response.ok) {
  //       //   throw new Error(response.status);
  //       // }
  //       return response.json();
  //     })
  //     .then(data => {
  //       this.incrementPage();

  //       return data;
  //     });
  // }

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

    const response = await fetch(`${BASE_URL}?${searchParams}`);
    const data = await response.json();
    this.incrementPage();

    return data;

    // return fetch(`${BASE_URL}?${searchParams}`)
    //   .then(response => {
    //     // if (!response.ok) {
    //     //   throw new Error(response.status);
    //     // }
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.incrementPage();

    //     return data;
    //   });
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

// export const apiPixabayJson = axios.create({
//   baseURL: 'https://pixabay.com/api/',

//   params: new URLSearchParams({
//     key: `${KEY}`,
//     q: `${this.searchQuery}`,
//     image_type: 'photo',
//     orientation: 'horizonta',
//     safesearch: `true`,
//     page: `${this.page}`,
//     per_page: '40',
//   }),
// });
