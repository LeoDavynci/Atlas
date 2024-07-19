
import axios from 'axios';

const rapidApiKey = '0624a11197msh87eab60639dc52dp14ae0bjsn01a8e48343fc';
const rapidApiHost = 'exercisedb.p.rapidapi.com';

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': rapidApiHost
  }
};

export const fetchData = async (url, options) => {
  const response = await axios.get(url, options);
  return response.data;
};