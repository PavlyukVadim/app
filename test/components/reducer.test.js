import { h, render } from 'preact';
import { expect } from 'chai';
import reducer from '../../app/reducer';
import {
  RECEIVE_NEW_REPOS,
  RECEIVE_NEXT_REPOS,
} from '../../app/actions';

describe('reducer', () => {    
  
  const initialStore = {
    isFetching: false,
    repos: [],
    sortingParams: {},
    filtersParams: {},
    numberOfPages: 1,
    currentPage: 0,
    isAllRepos: false,
  };

  it('RECEIVE_NEW_REPOS should rewrite repos and update currentPage', () => {
    const newState = reducer(
      initialStore, {
        type: RECEIVE_NEW_REPOS,
        repos: [1, 2, 3],
      }
    );
    expect(newState).to.deep.equal(Object.assign({}, initialStore, {repos: [1, 2, 3], currentPage: 1}));
  });

  it('RECEIVE_NEXT_REPOS should add repos and update currentPage & numberOfPages', () => {
    const newState1 = reducer(
      initialStore, {
        type: RECEIVE_NEXT_REPOS,
        repos: [1, 2, 3],
      }
    );
    const newState2 = reducer(
      newState1, {
        type: RECEIVE_NEXT_REPOS,
        repos: [4, 5, 6],
      }
    );
    expect(newState2).to.deep.equal(
      Object.assign(
        { },
        initialStore, {
          repos: [1, 2, 3, 4, 5, 6],
          numberOfPages: 3,
          currentPage: 2,
        }
      )
    );
  });

});
