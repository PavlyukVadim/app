import {h, Component} from 'preact';

import Header from './Header';
import ControlBar from './ControlBar';
import Cards from './Cards';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      sortBy: 'Name',
      filtersParams: {},
      owner: 'geek',
      numberOfPages: 1,
      repos: [],
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.changeOwner = this.changeOwner.bind(this);
    this.sortOnChange = this.sortOnChange.bind(this);
    this.sortOrderOnChange = this.sortOrderOnChange.bind(this);
    this.filtersParamsOnChange = this.filtersParamsOnChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.search(this.state.owner);
  }

  async search(owner, addMode) {
    let numberOfPages = addMode ? this.state.numberOfPages + 1 : this.state.numberOfPages;
    const link = `//api.github.com/users/${owner}/repos?page=${numberOfPages}`;
    const res = await fetch(
      link,
      {
        headers: {
          'Accept': 'application/vnd.github.mercy-preview+json', 
        },
      }
    );
    const json = await res.json();
    let repos = json || [];
    if (addMode) {
      repos = repos.concat(this.state.repos);
      this.setState({
        repos,
        numberOfPages,
      });
    } else {
      this.setState({repos});
    }
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.search(this.state.owner, true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  changeOwner(owner) {
    this.setState({
      owner,
      numberOfPages: 1,
    });
    this.search(owner);
  }

  sortOnChange(sortBy) {
    this.setState({sortBy});
  }

  sortOrderOnChange(sortOrder) {
    this.setState({sortOrder});
  }

  filtersParamsOnChange(param) {
    let filtersParams = this.state.filtersParams;
    filtersParams = Object.assign({}, filtersParams, param);
    this.setState({filtersParams});
  }

  render({ }, { repos=[], sortBy, sortOrder, filtersParams }) {
    return (
      <div>
        <Header changeOwner={this.changeOwner}/>
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
