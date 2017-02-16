//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'app';

// Amerikaans Rammen
export const ADD_NEW_PLAYER = `${NAME}/NEW_PLAYER`;
export const UPDATE_PLAYER = `${NAME}/UPDATE_PLAYER`;
export const REMOVE_PLAYER = `${NAME}/REMOVE_PLAYER`;
export const ADD_SCORES = `${NAME}/ADD_SCORES`;
export const GET_GAMES = `${NAME}/GET_GAMES`;
export const RESET_GAME = `${NAME}/RESET_GAME`;
export const CHANGE_DEALER = `${NAME}/CHANGE_DEALER`;