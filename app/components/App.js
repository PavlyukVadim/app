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
      filtersParams: {},
    };
    this.search = this.search.bind(this);
    this.sortOnChange = this.sortOnChange.bind(this);
    this.sortOrderOnChange = this.sortOrderOnChange.bind(this);
    this.filtersParamsOnChange = this.filtersParamsOnChange.bind(this);
  }

  async componentDidMount() {
    let res = await fetch(`${SEARCH}`,
      {
        headers: {
          'Accept': 'application/vnd.github.mercy-preview+json', 
        },
      }
    ),
    json = await res.json(),
    repos = json || [];
    this.setState({ repos });
  }

  async search(owner) {
    let res = await fetch(
      `//api.github.com/users/${owner}/repos`,
      {
        headers: {
          'Accept': 'application/vnd.github.mercy-preview+json', 
        },
      }
    ),
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

  filtersParamsOnChange(param) {
    let filtersParams = this.state.filtersParams;
    filtersParams = Object.assign({}, filtersParams, param);
    this.setState({ filtersParams });
  }

  render({ }, { repos=[], sortBy, sortOrder, filtersParams }) {
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
                filtersParams={filtersParams}
              />
            </div>
            <div class="col-md-5">
              <ControlBar
                repos={repos}
                sortOnChange={this.sortOnChange}
                sortOrderOnChange={this.sortOrderOnChange}
                filtersParamsOnChange={this.filtersParamsOnChange}
              />    
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
