import {h, render} from 'preact';
import Router, { route } from 'preact-router';
import Main from './containers/Main';


document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  const App = () => (
    <Router hashHistory={true}>
      <Main route={route}/>
    </Router>
  );
  render(<App />, app);
});
