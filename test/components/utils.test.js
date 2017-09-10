import { h, render } from 'preact';
import { expect } from 'chai';
import { parseURL } from '../../app/utils';

describe('utils', () => {  
  describe('parseURL', () => {
    const href = 'https://localhost:3333/#geek?sort=Stars&numberOfStars=1&page=6';
    const expectedResult = { 
      owner: 'geek',
      numberOfPages: '6',
      filtersParams: { numberOfStars: '1' },
      sortingParams: { sortBy: 'Stars' }
    };

    it('should return an object', () => {
      expect(parseURL(href)).to.be.an('object');      
    });

    it('should be the some as expectedResult', () => {
      expect(parseURL(href)).to.deep.equal(expectedResult);
    });
  });
});
