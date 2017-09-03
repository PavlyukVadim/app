import {h, Component} from 'preact';
import Cards from '../../components/Cards';

class CardsList extends Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      repos: nextProps.repos,
      sortBy: nextProps.sortBy,
    });
    if (nextProps.filtersParams) {
      this.filtering(nextProps.filtersParams, nextProps.search, nextProps.isFetching);
    }
    if (nextProps.sortBy) {
      this.sortRepos(nextProps.sortBy, nextProps.sortOrder);
    }
  }

  filtering(filtersParams, search, isFetching) {
    const numberOfStars = +filtersParams.numberOfStars || 0;
    const {
      hasTopics,
      hasOpenIssues,
      updatedDate,
      type,
      language,
    } = filtersParams;

    let repos = this.state.repos;
    repos = repos.filter((repo) => {
      return !(repo.stargazers_count < numberOfStars ||
               hasTopics && repo.topics.length === 0 ||
               hasOpenIssues && repo.open_issues_count === 0 ||
               updatedDate && new Date(updatedDate) > new Date(repo.pushed_at) ||
               type && type === 'forks' && repo.fork === false ||
               type && type === 'sources' && repo.fork === true ||
               language && language !== 'all' && repo.language !== language);
    });
    this.setState({repos});
    if (repos.length < 30 && search && !isFetching) {
      search(undefined, true);
    }
  }

  sortRepos(sortBy, sortOrder) {
    let repos = [].concat(this.state.repos);
    repos = this[`sortBy${sortBy}`](repos, sortOrder);
    this.setState({repos});
  }
  
  sortByName(repos, sortOrder) {
    return repos.sort((a, b) => {
      return sortOrder === 'Asc' ? a.name.localeCompare(b.name) : 
                                   b.name.localeCompare(a.name);
    });
  }

  sortByStars(repos, sortOrder) {
    return repos.sort((a, b) => {
      return sortOrder === 'Asc' ? a.stargazers_count - b.stargazers_count : 
                                   b.stargazers_count - a.stargazers_count; 
    });
  }

  sortByIssues(repos, sortOrder) {
    return repos.sort((a, b) => {
      return sortOrder === 'Asc' ? a.open_issues_count - b.open_issues_count :
                                   b.open_issues_count - a.open_issues_count;
    });
  }

  sortByUpdated(repos, sortOrder) {
    return repos.sort((a, b) => {
      return sortOrder === 'Asc' ? new Date(a.pushed_at) - new Date(b.pushed_at) :
                                   new Date(b.pushed_at) - new Date(a.pushed_at);
    });
  }

  openDialog(name) {
    this.props.getInfoAboutRepo(name);
    this.setState({
      dialogMode: 'active',
    });
  }

  closeDialog() {
    this.setState({
      dialogMode: 'close',
    }); 
  }

  render({ currentRepo, isFetching }, { repos = [], dialogMode }) {
    return (
      <Cards
        isFetching={isFetching}
        repos={repos}
        currentRepo={currentRepo}
        dialogMode={dialogMode}
        openDialog={this.openDialog}
        closeDialog={this.closeDialog}
      />
    );
  }
}

export default CardsList;
