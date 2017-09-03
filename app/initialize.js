import {h, render} from 'preact';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app');
	while (app.firstChild) {
  	app.removeChild(app.firstChild);
	}
  render(<App />, app);
});
