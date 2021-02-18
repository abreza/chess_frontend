import Parse from 'parse';
import React, { useEffect } from 'react';

import AuthContext from './AuthContext';

export default function AuthContextProvider({ children }) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleParseError = (err) => {
    switch (err.code) {
      case Parse.Error.INVALID_SESSION_TOKEN:
        logout();
        break;
    }
  };

  useEffect(async () => {
    await Parse.Session.current().catch(handleParseError);
  });

  const logout = async () => {
    try {
      await Parse.User.logOut();
    } catch (error) {
      console.log(error);
    } finally {
      forceUpdate();
    }
  };

  const getUser = () => {
    const user = new Parse.User.current();
    try {
      return {
        id: user.id,
        username: user.get('username'),
      };
    } catch (error) {
      handleParseError(error);
    }
  };

  const loginOrSignUp = (username, password) =>
    Parse.User.logIn(username, password, {
      usePost: true,
    })
      .catch(() => {
        return new Parse.User({ username, password }).signUp();
      })
      .catch(handleParseError);

  const signUpAsRandomUser = async () => {
    const random = `p${Date.now()}${Math.floor(Math.random() * 100)}`;
    await new Parse.User({
      username: random,
      password: random,
    }).signUp();
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        getUser,
        loginOrSignUp,
        signUpAsRandomUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
