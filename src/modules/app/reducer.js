import {handleActions} from 'redux-actions'
import {ADD_NEW_PLAYER, UPDATE_PLAYER, REMOVE_PLAYER, ADD_SCORES, SAVE_GAME, GET_GAMES} from './constants'
import {clone, filter} from 'lodash';
import {games, getNextGame} from '../../helpers/games';

const initialState = {
  savedGames: [],
  playerCount: 2,
  players: [{name: ''}, {name: ''}],
  scores: {
    [games[0]]: [],
    [games[1]]: [],
    [games[2]]: [],
    [games[3]]: [],
    [games[4]]: [],
    [games[5]]: [],
    [games[6]]: [],
    [games[7]]: [],
    [games[8]]: [],
    [games[9]]: []
  },
  currentGame: games[0],
  finished: false,
  saved: false
};

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions({
  [ADD_NEW_PLAYER]: (state, action) => {
    const {playerCount} = state;
    const newPlayerCount = playerCount + 1;

    return {
      ...state,
      playerCount: newPlayerCount,
      players: [
        ...state.players,
        {name: ''}
      ]
    }
  },
  [UPDATE_PLAYER]: (state, action) => {
    const {payload: {id, field, data}} = action;

    //because payload contains the id target that one and update it
    const newPlayers = clone(state.players);
    newPlayers[id][field] = data;
    return {
      ...state,
      players: newPlayers
    }
  },
  [REMOVE_PLAYER]: (state, action) => {
    const {payload: {id}} = action;
    const newPlayers = filter(state.players, (player, i) => i !== id);
    return {
      ...state,
      players: newPlayers
    }
  },
  [ADD_SCORES]: (state, action) => {
    const {payload: {game, scores}} = action;

    const stateScores = clone(state.scores);
    stateScores[game] = scores;

    const nextGame = getNextGame(state.currentGame);

    return {
      ...state,
      scores: stateScores,
      currentGame: nextGame ? nextGame : state.currentGame,
      finished: nextGame ? false : true
    }
  },
  [SAVE_GAME]: (state, action) => {
    return {
      ...state,
      saved: true
    }
  },
  [GET_GAMES]: (state, action) => {
    const {payload: {result}} = action;

    return {
      ...state,
      savedGames: result
    }
  }
}, initialState)
