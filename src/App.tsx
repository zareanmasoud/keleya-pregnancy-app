import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Navigation from "./Navigation";
import store, { persistor } from "./store";

function App(): JSX.Element {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </PersistGate>
  );
}

export default App;
