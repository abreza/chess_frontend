import Parse from 'parse';

import handleParseError from './handleParseError';

const getGamesQuery = ({ mode }) => {
  const query = new Parse.Query('Game');
  if (mode === 'play') {
    query.doesNotExist('user2');
  } else if (mode === 'watch') {
    query.equalTo('state', 'ON_GOING');
  } else if (mode === 'old') {
    query.notContainedIn('state', ['NOT_STARTED', 'ON_GOING']);
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
  try {
    return await Parse.Cloud.run('createGame');
  } catch (err) {
    handleParseError(err);
  }
};

export const joinGame = async ({ gameId }) => {
  try {
    await Parse.Cloud.run('joinGame', { gameId });
  } catch (err) {
    handleParseError(err);
  }
};

export const move = async (move, gameId) => {
  try {
    await Parse.Cloud.run('move', { move, gameId });
  } catch (err) {
    handleParseError(err);
  }
};

export const resignGame = async (gameId) => {
  try {
    await Parse.Cloud.run('resignGame', { gameId });
  } catch (err) {
    handleParseError(err);
  }
};
