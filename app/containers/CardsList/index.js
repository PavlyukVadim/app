import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import { fetchRepos, fetchCurrentRepo } from '../../actions';
import Cards from '../../components/Cards';


const validateRepos = (repos = [], filtersParams = {}, sortingParams = {}) => {
  let validatedRepos = [].concat(repos);
  validatedRepos = filtering(validatedRepos, filtersParams);
  validatedRepos = sortRepos(validatedRepos, sortingParams);
  return validatedRepos;
}

const filtering = (repos, filtersParams) => {
  const numberOfStars = +filtersParams.numberOfStars || 0;
  const {
    hasTopics,
    hasOpenIssues,
    updatedDate,
    type,
    language,
  } = filtersParams;
  repos = repos.filter((repo) => {
    return !(repo.stargazers_count < numberOfStars ||
             hasTopics && repo.topics.length === 0 ||
             hasOpenIssues && repo.open_issues_count === 0 ||
             updatedDate && new Date(updatedDate) > new Date(repo.pushed_at) ||
             type && type === 'forks' && repo.fork === false ||
             type && type === 'sources' && repo.fork === true ||
             language && language !== 'all' && repo.language !== language);
  });
  return repos;
}

const sortRepos = (repos, sortingParams) => {
  if (sortingParams.sortBy) {
    repos = sorting[`sortBy${sortingParams.sortBy}`](repos, sortingParams.sortOrder);
  }
  return repos;
}

const sortByName = (repos, sortOrder) => {
  return repos.sort((a, b) => {
    return sortOrder === 'Asc' ? a.name.localeCompare(b.name) : 
                                 b.name.localeCompare(a.name);
  });
};

const sortByStars = (repos, sortOrder) => {
  return repos.sort((a, b) => {
    return sortOrder === 'Asc' ? a.stargazers_count - b.stargazers_count : 
                                 b.stargazers_count - a.stargazers_count; 
  });
};

const sortByIssues = (repos, sortOrder) => {
  return repos.sort((a, b) => {
    return sortOrder === 'Asc' ? a.open_issues_count - b.open_issues_count :
                                 b.open_issues_count - a.open_issues_count;
  });
};

const sortByUpdated = (repos, sortOrder) => {
  return repos.sort((a, b) => {
    return sortOrder === 'Asc' ? new Date(a.pushed_at) - new Date(b.pushed_at) :
                                 new Date(b.pushed_at) - new Date(a.pushed_at);
  });
};

const sorting = {
  sortByName,
  sortByStars,
  sortByIssues,
  sortByUpdated,
};

const mapStateToProps = (state) => {
  return {
    owner: state.owner,
    isFetching: state.isFetching,
    numberOfPages: state.numberOfPages,
    currentPage: state.currentPage,
    repos: validateRepos(state.repos, state.filtersParams, state.sortingParams),
    isAllRepos: state.isAllRepos,
    currentRepo: state.currentRepo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRepos: (link, mode, isInitialLoading) => dispatch(fetchRepos(link, mode, isInitialLoading)),
    getInfoAboutRepo: (link) => dispatch(fetchCurrentRepo(link)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
