import {h, Component} from 'preact';
import getGitHubIcon from './gitHubIcon.js';

class Header extends Component {
  render() {
    return (
      <header>
        <div class="container">
          <div className="row">
            <div class="logo">
              <a
                class="header-logo-invertocat"
                href="https://github.com/"
                data-hotkey="g d"
                aria-label="Homepage"
                data-ga-click="Header, go to dashboard, icon:logo"
              >
                {getGitHubIcon()}
              </a>    
            </div>
            <div class="search-input">
              <label class="form-control header-search-wrapper js-chromeless-input-container">
                <input
                  type="text"
                  class="form-control header-search-input js-site-search-focus"
                  data-hotkey="s"
                  name="q"
                  value=""
                  placeholder="Search GitHub"
                  aria-label="Search GitHub"
                  data-unscoped-placeholder="Search GitHub"
                  data-scoped-placeholder="Search"
                  autocapitalize="off"
                />
              </label>
            </div>
            <div class="search-bnt">
              <a aria-label="Search">Search</a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
