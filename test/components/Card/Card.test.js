import { h, render } from 'preact';
import { expect } from 'chai';
import Card from '../../../app/components/Card';

describe('Card', () => {
  const repo = {
    language: 'C++',
    description: 'Lossless compression in C++',
    stargazers_count: 6897,
  };
  const card = <Card repo={repo}/>;

  it('should render repo properties', () => {  
    expect(card).to.contain(<span class="programming-language" itemprop="programmingLanguage">C++</span>);
    expect(card).to.contain(<p class="repo-desc" itemprop="description">Lossless compression in C++</p>);
  });

  it('should round stars count', () => {  
    expect(card).to.contain(<span class="number-of-stars">6.9k</span>);
  });
});
