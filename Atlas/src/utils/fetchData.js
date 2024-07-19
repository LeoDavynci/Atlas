

export const exerciseOptions = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises',
  headers: {
    'x-rapidapi-key': "0624a11197msh87eab60639dc52dp14ae0bjsn01a8e48343fc",
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};


  export const fetchData = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();
  
    return data;
};
  
