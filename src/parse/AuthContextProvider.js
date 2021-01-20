import Parse from 'parse';
import React from 'react';

import AuthContext from './AuthContext';

export default function AuthContextProvider({ children }) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  return (
    <AuthContext.Provider
      value={{
        logout: async () => {
          try {
            await Parse.User.logOut();
          } catch (error) {
            console.log(error);
          } finally {
            forceUpdate();
          }
        },
        getUser: () => Parse.User.current(),
        loginOrSignUp: (username, password) =>
          Parse.User.logIn(username, password, {
            usePost: true,
          }).catch(() => {
            return new Parse.User({ username, password }).signUp();
          }),
        signUpAsRandomUser: async () => {
          const random = `p${Date.now()}${Math.floor(Math.random() * 100)}`;
          await new Parse.User({
            username: random,
            password: random,
          }).signUp();
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
}
