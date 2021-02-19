import Parse from 'parse';

import handleParseError from './handleParseError';

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
  return await Parse.Cloud.run('createGame');
};

export const joinGame = async ({ gameId }) => {
  await Parse.Cloud.run('joinGame', { gameId });
};

export const move = async (move, gameId) => {
  await Parse.Cloud.run('move', { move, gameId });
};
