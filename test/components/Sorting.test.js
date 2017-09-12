import { h, render } from 'preact';
import { expect } from 'chai';
import Sorting from '../../app/components/Sorting';


describe('Sorting', () => {  
  it('should be set initial params as checked options', () => {
    const sortingParams = {
      sortBy: 'Stars',
      sortOrder: 'Asc',
    };
    const sorting = <Sorting sortingParams={sortingParams} />;
    
    expect(sorting).to.contain(<option selected={true}>Stars</option>);
    expect(sorting).to.contain(<option selected={true}>Asc</option>);
  });
});
