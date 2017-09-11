import { h, render } from 'preact';
import { expect } from 'chai';
import sinon from 'sinon';
import Cards from '../../app/components/Cards';

import Promise from 'es6-promise';
Promise.polyfill();

import 'whatwg-fetch';


describe('Cards', () => {  
  let scratch = null;

  beforeEach(() => {
    scratch = document.createElement('div');
  });

  it('getInfoAboutRepo should set currentRepo in Cards state', () => {
    const currentRepoExample = {name: 'someRepo'};
    
    const jsonGetInfoAboutRepo = (body) => {
      const mockResponse = body;
      let newComponent = null;
      scratch = document.createElement('div');
    
       render(<Cards
                repos={[]}
                getInfoAboutRepo={getInfoAboutRepo}
                currentRepo={mockResponse}
                ref={ref => newComponent = ref}
              />, scratch);   
      return Promise.resolve(newComponent);
    };
    sinon.stub(window, 'fetch').returns((jsonGetInfoAboutRepo(currentRepoExample)));

    let component = null;
    const repos = [];
    const getInfoAboutRepo = (link) => {
      return fetch(link);
    };
    render(<Cards
            repos={repos}
            getInfoAboutRepo={getInfoAboutRepo}
            ref={ref => component = ref}
           />, scratch);
    
    return component.props.getInfoAboutRepo()
            .then((component) => expect(component.props.currentRepo).to.deep.equal(currentRepoExample));
  });
});
