import {h, Component} from 'preact';

import Header from './Header';
import Filters from './Filters';
import Card from './Card';

const SEARCH = '//api.github.com/users/PavlyukVadim/repos';

class App extends Component {
  
  constructor() {
    super();
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    let res = await fetch(`${SEARCH}`),
      json = await res.json(),
      repos = json || [];
    this.setState({ repos });
  }

  async search(owner) {
    console.log(owner)
    let res = await fetch(`//api.github.com/users/${owner}/repos`),
      json = await res.json(),
      repos = json || [];
    this.setState({ repos }); 
  }

  render({ }, { repos=[] }) {
    return (
      <div>
        <Header search={this.search}/>
        <div class="container">
          <div class="row">
            <div class="col-md-9">
              {
                repos.map(repo => (
                  <Card repo={repo} />
                ))
              }
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

export default App;
