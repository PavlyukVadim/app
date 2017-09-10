import { h, render } from 'preact';
import { expect } from 'chai';
import LoadingBar from '../../app/components/LoadingBar';

describe('LoadingBar', () => {  
  it('should render loader div', () => {
    const loadingBar = <LoadingBar/>;
    expect(loadingBar).to.contain(<div class="loader" />);
  });
});
