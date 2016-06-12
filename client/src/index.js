import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';

import App from './components/app';

import PlashScreen from './pages/splash-screen';
import HomePage from './pages/home-page';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
  }
});

const routes = <Route component={App}>
  <Route path="/" component={PlashScreen} />
  <Route path="/splashScreen" component={PlashScreen} />
  <Route path="/homePage" component={HomePage} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
