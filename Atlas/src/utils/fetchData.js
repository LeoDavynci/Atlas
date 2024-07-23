
import axios from 'axios';

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;


export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  const response = await axios.get(url, options);
  return response.data;
};