import Parse from 'parse';

import handleParseError from './handleParseError';

const Game = Parse.Object.extend('Game');

const getGamesQuery = ({ mode }) => {
  const query = new Parse.Query('Game');
  if (mode === 'play') {
    query.doesNotExist('user2');
  }
  query.include(['user1', 'user2']);
  return query;
};

const getGameQuery = ({ gameId }) => {
  const query = new Parse.Query('Game');
  query.equalTo('objectId', gameId);
  return query;
};

export const getGames = async ({ mode }) => {
  try {
    return await getGamesQuery({ mode }).find();
  } catch (err) {
    handleParseError(err);
  }
};
export const getGame = async ({ gameId }) => {
  const query = getGameQuery({ gameId });
  try {
    return { subscription: await query.subscribe(), init: await query.first() };
  } catch (err) {
    handleParseError(err);
  }
};

export const createGame = async () => {
  const game = new Game();
  game.set('user1', Parse.User.current());
  try {
    const fetchedGame = await game.save();
    return fetchedGame.id;
  } catch (err) {
    handleParseError(err);
  }
};

export const joinGame = async ({ game }) => {
  game.set('user2', Parse.User.current());
  try {
    const fetchedGame = await game.save();
    return fetchedGame.id;
  } catch (err) {
    handleParseError(err);
  }
};
