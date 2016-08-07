import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyByqDAh0diNXRUAIWsMLH8RSGS9fV97F70',
  authDomain: 'amerikaans-rammen.firebaseapp.com',
  databaseURL: 'https://amerikaans-rammen.firebaseio.com',
  storageBucket: 'amerikaans-rammen.appspot.com'
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const saveGame = (username, players, scores, start) => {
  const key = firebaseApp.database().ref().child('games').push().key;
  return firebaseApp.database().ref().update(
    {
      [`/games/${key}`]: {
      username,
      players,
      scores,
      gameStart: start,
      gameEnd: new Date().getTime()
    }
  });
};

const getGames = (username) => {
  return firebaseApp.database()
                    .ref()
                    .child('games')
                    .orderByChild('username')
                    .equalTo('Jasper')
                    .once('value');
};

export {
  saveGame,
  getGames
};