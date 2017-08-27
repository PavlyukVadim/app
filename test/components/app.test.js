import { h, render } from 'preact';
import { expect } from 'chai';
import App from '../../app/components/App';

describe('App', () => {
  let scratch;

  beforeAll(() => {
    scratch = document.createElement('div');
    (document.body || document.documentElement).appendChild(scratch);
  });

  beforeEach(() => {
    scratch.innerHTML = '';
  });

  afterAll(() => {
    scratch.parentNode.removeChild(scratch);
    scratch = null;
  });

  describe('content', () => {
    it('should render the Time', () => {
      render(<App /> , scratch);
      expect(scratch.innerHTML).to.contain('Time');
    });
  });
});
