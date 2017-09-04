import {h, Component} from 'preact';
import api from './gitHub.api';
import App from '../../components/App';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'Name',
      filtersParams: {},
      owner: 'geek',
      numberOfPages: 1,
      isLastPage: false,
      repos: [],
      isFetching: false,
    };
    this.search = this.search.bind(this);
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
  
  changeURL(
    owner = this.state.owner,
    sortBy = this.state.sortBy,
    sortOrder = this.state.sortOrder,
    filters = this.state.filtersParams,
    numberOfPages = this.state.numberOfPages
  ) {
    let link = ``;
    let sortByParam = sortBy ? `sort=${sortBy}` : '';
    let sortOrderParam = sortOrder ? `order=${sortOrder}` : '';
    let numberOfPagesParam = numberOfPages ? `page=${numberOfPages}` : '';
    let filtersParams = [];
    for (const param in filters) {
      if (typeof filters[param] === 'boolean') {
        filtersParams.push(param);
      } else {
        filtersParams.push(`${param}=${filters[param]}`);
      }
    }
    let params = [sortByParam, sortOrderParam, ...filtersParams, numberOfPagesParam]
                 .filter((param) => param).join('&');
    this.props.route(`#${owner}?${params}`);
  }

  async search(owner = this.state.owner, addMode) {
    if (this.state.isLastPage && addMode) { return; }
    this.setState({isFetching: true});
    this.changeURL();
    let numberOfPages = addMode ? this.state.numberOfPages + 1 : this.state.numberOfPages;
    const link = `//api.github.com/users/${owner}/repos?page=${numberOfPages}`;
    let repos = await api.getRepos(link);
    
    if (!repos.length) {
      this.setState({
        isLastPage: true,
        isFetching: false,
      });
      return;
    }
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
    let currentRepo = await api.getInfoAboutCurrentRepo(this.state.owner, repo);
    [
      currentRepo.contributors,
      currentRepo.languages,
      currentRepo.PRs
    ] = await Promise.all([
      api.getInfoAboutRepoContributors(currentRepo),
      api.getInfoAboutRepoLanguages(currentRepo),
      api.getInfoAboutRepoPRs(currentRepo)
    ]);
    this.setState({
      currentRepo,
      isFetching: false,
    });
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
    this.changeURL();
  }

  sortOrderOnChange(sortOrder) {
    this.setState({sortOrder});
    this.changeURL();
  }

  filtersParamsOnChange(param) {
    let filtersParams = this.state.filtersParams;
    filtersParams = Object.assign({}, filtersParams, param);
    this.setState({filtersParams});
    this.changeURL();
  }

  render({ }, { repos=[], sortBy, sortOrder, filtersParams, currentRepo, isFetching }) {
    return (
      <div>
        <App
          changeOwner={this.changeOwner}
          repos={repos}
          sortBy={sortBy}
          sortOrder={sortOrder}
          filtersParams={filtersParams}
          search={this.search}
          getInfoAboutRepo={this.getInfoAboutRepo}
          currentRepo={currentRepo}
          isFetching={isFetching}
          sortOnChange={this.sortOnChange}
          sortOrderOnChange={this.sortOrderOnChange}
          filtersParamsOnChange={this.filtersParamsOnChange}
        />
      </div>
    );
  }
}

export default Main;
