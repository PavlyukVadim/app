import {h, Component} from 'preact';

import Header from './Header';
import Filters from './Filters';
import Card from './Card';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div class="container">
          <div class="row">
            <div class="col-md-9">
              <Card />
            </div>
            <div class="col-md-3">
              <Filters />    
            </div>
          </div> 
        </div>
      </div>
    );
  }
}
