import {padStart} from 'lodash';

const makeTimer = (time, colonSeparator = true) => {
  let delta = time / 1000;
  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  const seconds = Math.floor(delta % 60);  // in theory the modulus is not required

  const sep = colonSeparator ? [':', ':', ''] : ['u ', 'm ', 's '];
  return `${padStart(hours.toString(), 2, '0')}${sep[0]}${padStart(minutes.toString(), 2, '0')}${sep[1]}${padStart(seconds.toString(), 2, '0')}${sep[2]}`;
};

export {
  makeTimer
};