
import axios from 'axios';

const rapidApiKey = 'c674a89694mshf25209a7a9ba5e7p10164cjsnc88b4361f204';


// export const exerciseOptions = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': rapidApiKey,
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//   }
// };

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': 'workoutdb1.p.rapidapi.com'
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