import {h, render} from 'preact';
import Main from './containers/Main';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  render(<Main />, app);
});
