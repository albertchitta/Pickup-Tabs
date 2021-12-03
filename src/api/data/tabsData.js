import axios from 'axios';

const dbUrl = 'http://www.songsterr.com/a/ra/';

const getTabs = (input) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/songs.json?pattern=${input}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getTabs;
