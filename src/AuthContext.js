import React from 'react';
import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, dispatch] = useReducer(authReducer, localStorage.getItem('go-accounting-auth'));

  return (
    <AuthContext.Provider value={token}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

function authReducer(token, action) {
  switch (action.type) {
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
