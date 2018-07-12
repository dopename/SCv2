import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';

import { Provider } from "react-redux";
import scApp from "./reducers/index";
import { createStore } from "redux";

let store = createStore(scApp);

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    );
  }
}

export default App;
