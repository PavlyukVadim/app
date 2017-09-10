import {h, Component} from 'preact';
import Card from './../Card';
import Dialog from './../Dialog';
import LoadingBar from './../LoadingBar';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentDidMount() {
    const owner = this.props.owner;
    const numberOfPages = this.props.numberOfPages;
    if (owner) {
      this.initialReposLoading(owner, numberOfPages);
    }
    window.addEventListener('scroll', () => this.handleScroll());
    // window.onpopstate = (event) => {
    //   this.parseURL(); 
    // };
  }

  initialReposLoading(owner, numberOfPages) {
    const link = `//api.github.com/users/${owner}/repos`;
    this.props.fetchRepos(link);
    if (numberOfPages > 1) {
      const arrayOfLinks = new Array(numberOfPages - 1)
        .fill(0)
        .map((item, i) => `//api.github.com/users/${owner}/repos?page=${i + 2}`);
      arrayOfLinks.forEach((link) => {
        this.props.fetchRepos(link, 'receiveNextRepos', true);
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log('Load one more page...');
      const owner = this.props.owner;
      const numberOfPages = Number(this.props.numberOfPages) + 1;
      console.log(this.props)
      if (owner) {
        const link = `//api.github.com/users/${owner}/repos?page=${numberOfPages}`;
        this.props.fetchRepos(link, 'receiveNextRepos');
      }
    }
  }

  openDialog(name) {
    const linkOfRepo = `https://api.github.com/repos/${this.props.owner}/${name}`;
    this.props.getInfoAboutRepo(linkOfRepo);
    this.setState({
      dialogMode: 'active',
    });
  }

  closeDialog() {
    this.setState({
      dialogMode: 'close',
    });
  }

  render({ isFetching, repos, currentRepo }, { dialogMode }) {
    return (
      <div class="cards-wrapper">
        {
          isFetching &&
          <LoadingBar/ >
        }
        {
          repos.length === 0 &&
          <p class="error-message">No items found by you filter query!</p>
        }
        {
          repos.map(repo => (
            <Card
              key={repo.name}
              repo={repo}
              openDialog={this.openDialog}
            />
          ))
        }
        {
          !isFetching &&
          <Dialog
            openedRepo={currentRepo}
            dialogMode={dialogMode}
            closeDialog={this.closeDialog}
          />  
        }
      </div>
    );
  }
}

export default Cards;
