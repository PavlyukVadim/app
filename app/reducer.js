import {
  FETCH_REPO,
  RECEIVE_NEW_REPOS,
  RECEIVE_NEXT_REPOS,
  CHANGE_OWNER,
  RECEIVE_CURRENT_REPO,
  CHANGE_FILTERS,
  CHANGE_SORTING,
  CHANGE_URL,
} from './actions';

const fetchRepo = (state, action) => {
  return Object.assign({}, state, {
    isFetching: true,
  });
};

const receiveNewRepos = (state, action) => {
  const isAllRepos = action.repos.length == 0;
  let currentPage = Number(state.currentPage) + 1;
  return Object.assign({}, state, {
    isFetching: false,
    repos: action.repos,
    currentPage,
    isAllRepos,
  });
};

const receiveNextRepos = (state, action) => {
  let numberOfPages = Number(state.numberOfPages);
  let currentPage = Number(state.currentPage) + 1;
  const isAllRepos = action.repos.length == 0;
  if (!action.isInitialLoading && !isAllRepos) {
    numberOfPages = numberOfPages + 1;
  }
  return Object.assign({}, state, {
    isFetching: false,
    repos: [...state.repos, ...action.repos],
    numberOfPages,
    currentPage,
    isAllRepos,
  });
};

const changeOwner = (state, action) => {
  return Object.assign({}, state, {
    owner: action.owner,
  });
};

const changeFilters = (state, action) => {
  const param = action.param;
  const filtersParams = state.filtersParams;
  return Object.assign({}, state, {
      filtersParams: {
        ...filtersParams,
        ...param
      },
    });
};

const changeSorting = (state, action) => {
  const param = action.param;
  const sortingParams = state.sortingParams;
  return Object.assign({}, state, {
      sortingParams: {
        ...sortingParams,
        ...param
      },
    });
};

const changeURL = (state) => {
  let owner = state.owner;
  let sortBy = state.sortingParams.sortBy;
  let sortOrder = state.sortingParams.sortOrder;
  let filtersParams = state.filtersParams;
  let numberOfPages = state.numberOfPages;
  let sortByParam = sortBy ? `sort=${sortBy}` : '';
  let sortOrderParam = sortOrder ? `order=${sortOrder}` : '';
  let numberOfPagesParam = numberOfPages ? `page=${numberOfPages}` : '';
  let arrayOfFiltersParams = [];
  for (const param in filtersParams) {
    if (typeof filtersParams[param] === 'boolean' && filtersParams[param]) {
      arrayOfFiltersParams.push(param);
    } else if (filtersParams[param]) {
      arrayOfFiltersParams.push(`${param}=${filtersParams[param]}`);
    }
  }
  let params = [sortByParam, sortOrderParam, ...arrayOfFiltersParams, numberOfPagesParam]
               .filter((param) => param).join('&');
  let link = `#${owner}?${params}`;
  return Object.assign({}, state, {
    URL: link,
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
    case RECEIVE_NEW_REPOS: return receiveNewRepos(state, action);
    case RECEIVE_NEXT_REPOS: return receiveNextRepos(state, action);
    case RECEIVE_CURRENT_REPO: return receiveCurrentRepos(state, action);
    case CHANGE_OWNER: return changeOwner(state, action);
    case CHANGE_FILTERS: return changeFilters(state, action);
    case CHANGE_SORTING: return changeSorting(state, action);
    case CHANGE_URL: return changeURL(state);
    default: return state;
  }
}
