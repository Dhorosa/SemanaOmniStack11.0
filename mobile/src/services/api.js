import axios from 'axios';
import Constants from 'expo-constants';

const manifest = Constants.manifest || Constants.expoConfig || {};
const baseURL =
  manifest.extra?.apiUrl ||
  process.env.API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  'http://localhost:3333';

const api = axios.create({
  baseURL,
});

export default api;
