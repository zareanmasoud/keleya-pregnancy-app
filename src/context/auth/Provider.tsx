import React, { useReducer, ReactNode } from "react";
import { authReducer } from "./Reducer";
import { useAuthState, useAuthDispatch, AuthStateProvider, AuthDispatchProvider } from "./Context";
import { authInitialState } from "./initalState";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthContextProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  return (
    <AuthStateProvider value={state}>
      <AuthDispatchProvider value={dispatch}>{children}</AuthDispatchProvider>
    </AuthStateProvider>
  );
}

export { AuthContextProvider, useAuthState, useAuthDispatch };
