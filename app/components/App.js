import {h, Component} from 'preact';
import NavBar from '../containers/NavBar';
import CardsList from '../containers/CardsList';
import ControlBar from '../containers/ControlBar';

class App extends Component {
  render({ route }) {
    return (
      <div>
        <NavBar />
        <div class="container app-container">
          <div class="row">
            <div class="col-md-7">
              <CardsList />
            </div>
            <div class="col-md-5">
              <ControlBar route={route}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
