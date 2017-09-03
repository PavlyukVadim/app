import {h, Component} from 'preact';
import Header from './Header';
import ControlBar from './ControlBar';
import Cards from './Cards';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'Name',
      filtersParams: {},
      owner: 'geek',
      numberOfPages: 1,
      repos: [],
      isFetching: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.changeOwner = this.changeOwner.bind(this);
    this.sortOnChange = this.sortOnChange.bind(this);
    this.sortOrderOnChange = this.sortOrderOnChange.bind(this);
    this.filtersParamsOnChange = this.filtersParamsOnChange.bind(this);
    this.getInfoAboutRepo = this.getInfoAboutRepo.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.search(this.state.owner);
  }

  async search(owner, addMode) {
    this.setState({isFetching: true});
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
        isFetching: false,
      });
    } else {
      this.setState({
        repos,
        isFetching: false,
      });
    }
  }

  async getInfoAboutRepo(repo) {
    this.setState({isFetching: true});
    const link = `https://api.github.com/repos/${this.state.owner}/${repo}`;
    const res = await fetch(link);
    const json = await res.json();
    let currentRepo = json || {};
    currentRepo.contributors = await this.getInfoAboutRepoContributors(currentRepo);
    currentRepo.languages = await this.getInfoAboutRepoLanguages(currentRepo);
    currentRepo.PRs = await this.getInfoAboutRepoPRs(currentRepo);
    this.setState({
      currentRepo,
      isFetching: false,
    });
  }
  
  async getInfoAboutRepoContributors(repo) {
    const link = repo.contributors_url;
    const res = await fetch(link);
    const json = await res.json();
    let contributors = json || [];
    return contributors.slice(0, 3);
  }

  async getInfoAboutRepoLanguages(repo) {
    const link = repo.languages_url;
    const res = await fetch(link);
    const json = await res.json();
    let languages = json || {};
    for (const key in languages) {
      if (languages[key] <= 1000) {
        delete languages[key];
      } else {
        languages[key] = Math.round((languages[key] / 1000) * 10) / 10;
      }
    }
    return languages;
  }

  async getInfoAboutRepoPRs(repo) {
    const link = repo.pulls_url.slice(0, -"{/number}".length);
    const res = await fetch(link);
    const json = await res.json();
    let PRs = json || [];
    PRs = PRs.filter((PR) => PR.state === 'open');
    PRs.slice(0, 4);
    return PRs;
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

  render({ }, { repos=[], sortBy, sortOrder, filtersParams, currentRepo, isFetching }) {
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
                getInfoAboutRepo={this.getInfoAboutRepo}
                currentRepo={currentRepo}
                isFetching={isFetching}
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
