import { combineReducers, Reducer } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserActions, userReducer } from "./user/Reducer";
import { UserState } from "./user/initalState";

const PERSIST_WHITELIST = new Set<string>(["user"]);
type ReducerStates = UserState;
type ReducerActions = UserActions;
const reducers: Record<string, Reducer<ReducerStates, ReducerActions>> = {
  user: userReducer,
};
const persistedReducers = Object.keys(reducers).reduce(
  (acc: Record<string, Reducer<ReducerStates, ReducerActions>>, cur: string) => {
    acc[cur] = PERSIST_WHITELIST.has(cur)
      ? persistReducer(
          {
            key: cur,
            storage: AsyncStorage,
          },
          reducers[cur]
        )
      : reducers[cur];
    return acc;
  },
  {}
);
const combinedReducers = combineReducers(persistedReducers);
export default combinedReducers;
