
import axios from 'axios';

const rapidApiKey = '0624a11197msh87eab60639dc52dp14ae0bjsn01a8e48343fc';

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