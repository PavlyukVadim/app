import {h, render} from 'preact';
import Router, { route } from 'preact-router';
import Main from './containers/Main';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }

  process.env.PUBLIC_URL = process.env.PUBLIC_URL || '/app.github.io';
  const App = () => (
    <Router>
      <Main path='/' route={route}/>
      <Main path='/app.github.io' route={route}/>
    </Router>

  );
  render(<App />, app);
});
