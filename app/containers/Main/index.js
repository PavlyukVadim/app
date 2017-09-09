import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import App from '../../components/App';
import { 
  fetchRepos,
  fetchCurrentRepo,
} from '../../actions';



class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersParams: {},
      numberOfPages: 1,
      currPage: 0,
      isLastPage: false,
      repos: [],
      isFetching: false,
    };
    this.serchedPages = [];
    this.search = this.search.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.changeOwner = this.changeOwner.bind(this);
    this.sortOnChange = this.sortOnChange.bind(this);
    this.sortOrderOnChange = this.sortOrderOnChange.bind(this);
    this.filtersParamsOnChange = this.filtersParamsOnChange.bind(this);
    // this.getInfoAboutRepo = this.getInfoAboutRepo.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.onpopstate = (event) => {
      this.parseURL();  
    };
    this.parseURL();
    console.log(this.props)
    const link = `https://api.github.com/repos/PavlyukVadim/amadev`
    this.props.fetchCurrentRepo(link);
    // this.props.fetchUser();
  }

  parseURL() {
    const href = window.location.href;
    let owner = href.match(/#.*\?/) && href.match(/#.*\?/)[0];
    owner = owner ? owner.slice(1, -1) : owner;
    let params = href.match(/\?.*/) && href.match(/\?.*/)[0];
    params = params ? params.slice(1).split('&') : [];
    
    const paramsObj = {};
    const filtersParams = {};
    const stateParams = {};
    const stateParamsMap = {
      sort: 'sortBy',
      order: 'sortOrder',
      page: 'numberOfPages'
    }

    params.forEach((param) => {
      if(~param.indexOf('=')) {
        const [key, value] = param.split('=');
        paramsObj[key] = value;
      } else {
        paramsObj[param] = true;
      }
    });

    for(const key in paramsObj) {
      if (key in stateParamsMap) {
        const value = paramsObj[key];
        const newKey = stateParamsMap[key];
        stateParams[newKey] = value;
      } else {
        filtersParams[key] = paramsObj[key];
      }
    }
    const newState = Object.assign({}, {owner}, stateParams, {filtersParams});
    this.setState(newState);
    this.search();
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
      if (typeof filters[param] === 'boolean' && filters[param]) {
        filtersParams.push(param);
      } else if (filters[param]) {
        filtersParams.push(`${param}=${filters[param]}`);
      }
    }
    let params = [sortByParam, sortOrderParam, ...filtersParams, numberOfPagesParam]
                 .filter((param) => param).join('&');
    this.props.route(`#${owner}?${params}`);
    if (this.state.currPage < this.state.numberOfPages) {
      this.search();
    }
  }

  async search(owner = this.state.owner, addMode) {
    // this.props.fetchUser();
    if (this.state.isLastPage && addMode) { return; }
    this.setState({isFetching: true});
    let numberOfPages = addMode ? +this.state.numberOfPages + 1 : this.state.numberOfPages;
    let currPage = this.state.currPage;
    if (!~this.serchedPages.indexOf(currPage)) {
      this.serchedPages.push(currPage);  
    } else {
      return;
    }
    const link = `//api.github.com/users/${owner}/repos?page=${currPage + 1}`;
    this.props.fetchRepos(link);
    // let repos = await api.getRepos(link);
    
    // if (!repos.length) {
    //   this.setState((prevState) => {
    //     return {
    //       isLastPage: true,
    //       isFetching: false,
    //       currPage: prevState.currPage + 1,
    //     }
    //   });
    //   this.changeURL();
    //   return;
    // }
    // if (addMode) {
    //   repos = repos.concat(this.state.repos);  
    // } 
    // this.setState((prevState) => {
    //   return {
    //     repos,
    //     numberOfPages,
    //     isFetching: false,
    //     currPage: prevState.currPage + 1,
    //   }
    // });
    // this.changeURL();
  }

  // async getInfoAboutRepo(repo) {
  //   this.setState({isFetching: true});
  //   let currentRepo = await api.getInfoAboutCurrentRepo(this.state.owner, repo);
  //   [
  //     currentRepo.contributors,
  //     currentRepo.languages,
  //     currentRepo.PRs
  //   ] = await Promise.all([
  //     api.getInfoAboutRepoContributors(currentRepo),
  //     api.getInfoAboutRepoLanguages(currentRepo),
  //     api.getInfoAboutRepoPRs(currentRepo)
  //   ]);
  //   this.setState({
  //     currentRepo,
  //     isFetching: false,
  //   });
  // }
  
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
      currPage: 0,
    });
    this.serchedPages = [];
    this.search(owner);
  }

  sortOnChange(sortBy) {
    this.setState({sortBy});
    this.changeURL();
  }

  sortOrderOnChange(sortOrder) {
    this.setState((prevState, props) => {
      return {
        sortOrder,
        sortBy: prevState.sortBy || 'Name',
      }
    });
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

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRepos: (link) => dispatch(fetchRepos(link)),
    fetchCurrentRepo: (link) => dispatch(fetchCurrentRepo(link)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
