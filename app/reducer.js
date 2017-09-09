import {
  FETCH_REPO,
  RECEIVE_REPOS,
  CHANGE_OWNER,
  RECEIVE_CURRENT_REPO,
} from 'actions';

const fetchRepo = (state, action) => {
  return Object.assign({}, state, {
    isFetching: true,
  });
};

const receiveRepos = (state, action) => {
  return Object.assign({}, state, {
    isFetching: false,
    repos: action.repos,
  });
};

const changeOwner = (state, action) => {
  return Object.assign({}, state, {
    owner: action.owner,
  });
};

const receiveCurrentRepos = (state, action) => {
  return Object.assign({}, state, {
    isFetching: false,
    currentRepo: action.repo,
  });
};

export default function (state, action) {
  switch(action.type) {
    case FETCH_REPO: return fetchRepo(state, action);
    case RECEIVE_REPOS: return receiveRepos(state, action);
    case RECEIVE_CURRENT_REPO: return receiveCurrentRepos(state, action);
    case CHANGE_OWNER: return changeOwner(state, action);
    default: return state;
  }
}