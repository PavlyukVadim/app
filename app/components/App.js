import {h, Component} from 'preact';

import Header from './Header';
import ControlBar from './ControlBar';
import Cards from './Cards';

const SEARCH = '//api.github.com/users/PavlyukVadim/repos';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      sortBy: 'Name',
    };
    this.search = this.search.bind(this);
    this.sortOnChange = this.sortOnChange.bind(this);
    this.sortOrderOnChange = this.sortOrderOnChange.bind(this);
  }

  async componentDidMount() {
    let res = await fetch(`${SEARCH}`),
      json = await res.json(),
      repos = json || [];
    this.setState({ repos });
  }

  async search(owner) {
    let res = await fetch(`//api.github.com/users/${owner}/repos`),
      json = await res.json(),
      repos = json || [];
    this.setState({ repos });
  }

  sortOnChange(sortBy) {
    this.setState({ sortBy });
  }

  sortOrderOnChange(sortOrder) {
    this.setState({ sortOrder });
  }

  render({ }, { repos=[], sortBy, sortOrder }) {
    return (
      <div>
        <Header search={this.search}/>
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <Cards 
                repos={repos}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
            </div>
            <div class="col-md-5">
              <ControlBar
                sortOnChange={this.sortOnChange}
                sortOrderOnChange={this.sortOrderOnChange}
              />    
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
