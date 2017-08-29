import {h, Component} from 'preact';

class Card extends Component {
  render() {
    return (
      <div class="card">
        <li class="col-md-12" itemprop="owns" itemscope="" itemtype="http://schema.org/Code">
          <div class="repo-name">
            <h3>
              <a href="/PavlyukVadim/snakes" itemprop="name codeRepository">snakes</a>
            </h3>
          </div>
          <div>
            <p class="repo-desc" itemprop="description">
              Multiplayer snake in Node.js &amp; Angular2
            </p>            
          </div>
          <div class="repo-stats">
            <span class="repo-language-color" style="background-color:#563d7c;" />
            <span class="programming-language" itemprop="programmingLanguage">CSS</span>
            <a class="muted-link" href="/PavlyukVadim/snakes/stargazers">
              <svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14">
                <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z" />
              </svg>
              <span class="number-of-stars">1</span>
            </a>
            <a class="muted-link" href="/PavlyukVadim/Benchmark/network">
              <svg aria-label="fork" class="octicon octicon-repo-forked" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10">
                <path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" />
              </svg>
              <span class="is-repo-forked">Forked</span>
            </a>
            Updated <relative-time datetime="2017-05-16T07:13:20Z" title="16 мая 2017 г., 10:13 GMT+3"> on 16 May</relative-time>
          </div>
        </li>
      </div>
    );
  }
}

export default Card;
