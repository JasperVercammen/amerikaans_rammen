import * as firebase from 'firebase';
import {isEmpty} from 'lodash';

import {createHash, validateHash} from './password';

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
    .equalTo(username)
    .once('value');
};

const searchUser = (username) => {
  return firebaseApp.database()
    .ref()
    .child('users')
    .orderByChild('username')
    .equalTo(username)
    .once('value');
};

const register = (username, password) => {
  let key = '';
  return searchUser(username).then((users) => {
    if (!isEmpty(users.val())) {
      return {
        error: true,
        message: 'Er bestaat al een speler met deze gebruikersnaam. Kies een andere.'
      };
    }
    const hash = createHash(password);

    key = firebaseApp.database().ref().child('games').push().key;
    return firebaseApp.database().ref().update(
      {
        [`/users/${key}`]: {
          username,
          password: hash,
          dateRegister: new Date().getTime()
        }
      });
  }).then((res) => {
    if (res && res.error) {
      return res;
    }
    return {
      userId: key,
      username
    };
  }).catch((error) => {
    return {
      error: true,
      message: error
    };
  });
};

const login = (username, password) => {
  return searchUser(username).then((users) => {
    const usersObj = users.val();
    if (isEmpty(usersObj)) {
      return {
        error: true,
        message: 'Geen speler gevonden met deze gebruikersnaam. Probeer opnieuw'
      };
    }
    const firstIndex = Object.keys(usersObj)[0];
    const validPassword = validateHash(usersObj[firstIndex].password, password);
    if (!validPassword) {
      return {
        error: true,
        message: 'Wachtwoord komt niet overeen voor ingegeven gebruikersnaam.'
      };
    }
    return {
      userId: firstIndex,
      username
    }
  }).catch((error) => {
    return {
      error: true,
      message: error
    };
  });
};

export {
  saveGame,
  getGames,
  register,
  login
};