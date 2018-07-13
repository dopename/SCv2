import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';

import { Provider } from "react-redux";
import scApp from "./reducers/index";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

let store = createStore(scApp, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Main />
        </Provider>
    );
  }
}

export default App;
