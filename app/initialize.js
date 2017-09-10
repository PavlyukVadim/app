import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Router, { route } from 'preact-router';

import reducer from './reducer';
import { parseURL } from './utils';
import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStore = Object.assign(
  {
    isFetching: false,
    repos: [],
    sortingParams: {},
    filtersParams: {},
    numberOfPages: 1,
  },
  parseURL(),
);

const store = createStore(
  reducer,
  initialStore,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  const Main = () => (
    <Provider store={store}>
      <Router>
        <App path='/' route={route}/>
        <App path='/app.github.io' route={route}/>
      </Router>
    </Provider>
  );
  render(<Main />, app);
});
