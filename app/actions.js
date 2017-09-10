export const FETCH_REPO = 'FETCH_REPO';
export const RECEIVE_NEW_REPOS = 'RECEIVE_NEW_REPOS';
export const RECEIVE_NEXT_REPOS = 'RECEIVE_REPOS';
export const CHANGE_OWNER = 'CHANGE_OWNER';
export const RECEIVE_CURRENT_REPO = 'RECEIVE_CURRENT_REPO';
export const CHANGE_FILTERS = 'CHANGE_FILTERS';
export const CHANGE_SORTING = 'CHANGE_SORTING';
export const CHANGE_URL = 'CHANGE_URL';

export const fetchRepo = () => {
  return {
    type: FETCH_REPO,
  };
};

export const receiveNextRepos = (repos, isInitialLoading) => {
  return {
    repos,
    type: RECEIVE_NEXT_REPOS,
    isInitialLoading,
  };
};

export const receiveNextReposAndUpdateURL = (repos, isInitialLoading) => {
  return (dispatch) => {
    dispatch(receiveNextRepos(repos, isInitialLoading));
    dispatch(changeURL());
  };
};

export const receiveNewRepos = (repos) => {
  return {
    repos,
    type: RECEIVE_NEW_REPOS,
  };
};

export const changeOwner = (owner) => {
  return {
    owner,
    type: CHANGE_OWNER,
  };
};

export const changeOwnerAndFetchRepos = (owner) => {
  return (dispatch) => {
    const link = `//api.github.com/users/${owner}/repos`; //?page=${currPage + 1}
    dispatch(changeOwner(owner));
    dispatch(fetchRepos(link));
    dispatch(changeURL());
  };
};

export const changeFilters = (param) => {
  return {
    param,
    type: CHANGE_FILTERS
  };
};

export const changeSorting = (param) => {
  return {
    param,
    type: CHANGE_SORTING
  };
};

export const changeURL = () => {
  return {
    type: CHANGE_URL,
  };
};

export const changeParamsAndUpdateURL = (type, param) => {
  return (dispatch) => {
    if (type === 'filters') {
      dispatch(changeFilters(param));
    } else if (type === 'sorting') {
      dispatch(changeSorting(param));
    }
    dispatch(changeURL());
  };
};

export const receiveCurrentRepo = (repo) => {
  return {
    repo,
    type: RECEIVE_CURRENT_REPO,
  };
};

export const fetchRepos = (link, mode, isInitialLoading) => {
  const receiveFunction = mode === 'receiveNextRepos' ? receiveNextReposAndUpdateURL : receiveNewRepos;
  return (dispatch) => {
    dispatch(fetchRepo());
    return fetch(
      link,
      {
        headers: {
          'Accept': 'application/vnd.github.mercy-preview+json', 
        },
      }
    )
    .then(response => response.json())
    .then(json => dispatch(receiveFunction(json, isInitialLoading)))
  };
};

const getInfoAboutRepoContributors = async (repo) => {
  const link = repo.contributors_url;
  const res = await fetch(link);
  const json = await res.json();
  let contributors = json || [];
  return contributors.slice(0, 3);
};

const getInfoAboutRepoLanguages = async (repo) => {
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
};

const getInfoAboutRepoPRs = async (repo) => {
  const link = repo.pulls_url.slice(0, -'{/number}'.length);
  const res = await fetch(link);
  const json = await res.json();
  let PRs = json || [];
  PRs = PRs.filter((PR) => PR.state === 'open');
  PRs = PRs.slice(0, 5);
  return PRs;
};

export const fetchCurrentRepo = (link) => {
  return (dispatch) => {
    let currentRepo = {};
    dispatch(fetchRepo());
      return fetch(link)
        .then(response => response.json())
        .then(repo => {
          currentRepo = repo;
          return Promise.all([
              getInfoAboutRepoContributors(repo),
              getInfoAboutRepoLanguages(repo),
              getInfoAboutRepoPRs(repo),
            ])
        })
        .then(data => {
          [
           currentRepo.contributors,
           currentRepo.languages,
           currentRepo.PRs
          ] = data;
          return currentRepo;
        })
        .then(repo => dispatch(receiveCurrentRepo(repo)))
  };
};
