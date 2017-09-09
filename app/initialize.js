import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Router, { route } from 'preact-router';

import reducer from './reducer';
import Main from './containers/Main';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {
    loading: true,
    user: null
  },
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  const App = () => (
    <Provider store={store}>
      <Router>
        <Main path='/' route={route}/>
        <Main path='/app.github.io' route={route}/>
      </Router>
    </Provider>
  );
  render(<App />, app);
});
