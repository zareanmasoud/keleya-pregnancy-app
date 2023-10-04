import { useContext, createContext, Dispatch } from "react";
import { AuthState, authInitialState } from "./initalState";
import { AuthActions } from "./Reducer";

// type Dispatch = (action: Action) => void;
const AuthStateContext = createContext<AuthState>(authInitialState);
const AuthDispatchContext = createContext<Dispatch<AuthActions>>(() => null);
const AuthStateProvider = AuthStateContext.Provider;
const AuthDispatchProvider = AuthDispatchContext.Provider;

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

function useAuthContext(): [AuthState, Dispatch<AuthActions>] {
  return [useAuthState(), useAuthDispatch()];
}

export { useAuthContext, useAuthState, useAuthDispatch, AuthStateProvider, AuthDispatchProvider };
