import React, { createContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  userRole: null,
  username: null,
  userId: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        userRole: action.payload.userRole,
        userId: action.payload.userId
    };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        userRole: null
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
