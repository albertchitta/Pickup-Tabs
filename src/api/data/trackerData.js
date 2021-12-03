import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getTrackers = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/trackers.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getTracker = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/trackers/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createTracker = (tracker) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/trackers.json`, tracker)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/trackers/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getTrackers(tracker.uid).then(resolve);
        });
    })
    .catch(reject);
});

const updateTracker = (tracker) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/trackers/${tracker.firebaseKey}.json`, tracker)
    .then(() => getTrackers(tracker.uid).then(resolve))
    .catch(reject);
});

const deleteTracker = (tracker) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/trackers/${tracker.firebaseKey}.json`)
    .then(() => getTrackers(tracker.uid).then(resolve))
    .catch(reject);
});

export {
  getTrackers, getTracker, createTracker, updateTracker, deleteTracker,
};
