import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import promise from "redux-promise";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import { userInitialState } from "./user/initalState";

const rootInitialState = {
  user: userInitialState,
};
const middlewares = [thunk, promise];
const store = createStore(rootReducer, rootInitialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<RootState, any, AppAction>;
