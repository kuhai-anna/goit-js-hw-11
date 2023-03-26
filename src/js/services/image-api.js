import axios from 'axios';

export const apiPixabayJson = axios.create({
  baseURL: 'https://pixabay.com/api/',
});
