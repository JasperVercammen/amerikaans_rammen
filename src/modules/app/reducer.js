import {handleActions} from 'redux-actions'
import {INCREMENT, DECREMENT, ADD_NEW_PLAYER, UPDATE_PLAYER, REMOVE_PLAYER} from './constants'
import {clone, filter} from 'lodash';

const initialState = {
  playerCount: 2,
  players: [{name: ''}, {name: ''}],
  counters: {}
};

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions({
  [ADD_NEW_PLAYER]: (state, action) => {
    const { playerCount } = state;
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
  [DECREMENT]: (state, action) => {
    const {payload: {id}} = action;

    //this is exatcly similar as previous reducer, except we are decrementing

    return {
      ...state,
      counters: {
        ...state.counters,
        [id]: state.counters[id] - 1
      }
    }
  }
}, initialState)
