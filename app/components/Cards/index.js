import {h, Component} from 'preact';
import Card from './../Card';

class Cards extends Component {
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      repos: nextProps.repos,
      sortBy: nextProps.sortBy
    });
    if (nextProps.filtersParams) {
      this.filtering(nextProps.filtersParams);
    }
    if (nextProps.sortBy) {
      this.sortRepos(nextProps.sortBy, nextProps.sortOrder);
    }
  }

  filtering(filtersParams) {
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

  render({ }, { repos = [] }) {
    return (
      <div>
        {
          repos.map(repo => (
            <Card repo={repo} />
          ))
        }
      </div>
    );
  }
}

export default Cards;
