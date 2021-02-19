import Parse from 'parse';

export const createReport = async (userId) => {
  return await Parse.Cloud.run('createRequest', { to: userId });
};

export const acceptRequest = async (requestId) => {
  return await Parse.Cloud.run('acceptRequest', { requestId });
};

export const getRequestSubscription = async () => {
  const query = new Parse.Query('Request');
  query.equalTo('user2', new Parse.User.current());
  return await query.subscribe();
};

export const getAcceptSubscription = async () => {
  const query = new Parse.Query('Game');
  query.equalTo('user1', new Parse.User.current());
  return await query.subscribe();
};
