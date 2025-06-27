import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL do seu Back-end
});
