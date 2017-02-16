import {ADD_NEW_PLAYER, UPDATE_PLAYER, REMOVE_PLAYER, ADD_SCORES, GET_GAMES, RESET_GAME, } from './constants'
import {saveGame as apiSaveGame, getGames as apiGetGames} from '../../helpers/api';

//each action should return the following signiture.
//  {
//     type: <type of action>,        type is required
//     payload: <the actual payload>  payload is optional. if you don't
//                                    have anything to send to reducer,
//                                    you don't need the payload. for example
//                                    newPlayer action
//  }

//this action tell the reducer to update the scores table with extra scores
export const addScores = (game, scores) => {
  return {
    type: ADD_SCORES,
    payload: {
      game,
      scores
    }
  }
};

//tells the reducer, we need a new player on the scene
export const newPlayer = () => {
  return {
    type: ADD_NEW_PLAYER
  }
};

//tells the reducer, we need a remove a player from the scene
export const removePlayer = (id) => {
  return {
    type: REMOVE_PLAYER,
    payload: {
      id
    }
  }
};

//tells the reducer, we need a to update a player on the scene
export const updatePlayer = (id, field, data) => {
  return {
    type: UPDATE_PLAYER,
    payload: {
      id,
      field,
      data
    }
  }
};

export const getGames = () => {
  return (dispatch, getState) => {
    apiGetGames('Jasper').then((result) => {
      dispatch({
        type: GET_GAMES,
        payload: {
          result
        }
      })
    });
  }
};

export const resetGame = (keepPlayers = false) => {
  return {
    type: RESET_GAME,
    payload: {
      keepPlayers
    }
  }
};

export const changeDealer = (dealer) => {
  return {
    type: CHANGE_DEALER,
    payload: {
      dealer
    }
  }
};