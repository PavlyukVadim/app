import {h, Component} from 'preact';
import Card from './../Card';

class Cards extends Component {
  
  // constructor() {
  //   super();
  // }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      repos: nextProps.repos,
      sortBy: nextProps.sortBy
    });
    if (nextProps.sortBy) {
      this.sortRepos(nextProps.sortBy, nextProps.sortOrder);
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

  render({ }, { repos = [] }) {
    // console.log(repos)
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
