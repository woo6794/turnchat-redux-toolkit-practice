import React from "react";
import Main from "./components/Main";
import { Provider } from "react-redux";
import GlobalStyle from "./globalStyles";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Main />
    </Provider>
  );
}

export default App;
