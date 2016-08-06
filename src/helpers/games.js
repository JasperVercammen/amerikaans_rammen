const games = ['3', '4', '33', '34', '44', '333', '334', '344', '444', '3333'];

const getNextGame = (current = '3') => {
  const currentIndex = games.indexOf(current);
  if (currentIndex < 0 || currentIndex === (games.length - 1)) {
    return false;
  }
  return games[currentIndex + 1];
};

const getPrevGame = (current = '3') => {
  const currentIndex = games.indexOf(current);
  if (currentIndex <= 0) {
    return false;
  }
  return games[currentIndex - 1];
};

export {
  games,
  getNextGame,
  getPrevGame
};