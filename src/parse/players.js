import Parse from 'parse';

export const getAnotherPlayersUsername = async (myId) => {
  const query = new Parse.Query('User');
  query.notEqualTo('objectId', myId);
  query.select('username');
  return await query.find();
};
