import {h, Component} from 'preact';
import Card from './../Card';
import Dialog from './../Dialog';
import LoadingBar from './../LoadingBar';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.fetchedPages = [];
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
    this.props.fetchRepos(link)
      .then(() => {
        if (numberOfPages > 1) {
          const arrayOfLinks = new Array(numberOfPages - 1)
            .fill(0)
            .map((item, i) => {
              this.fetchedPages.push(i + 2);
              return `//api.github.com/users/${owner}/repos?page=${i + 2}`
            });
          arrayOfLinks.forEach((link) => {
            this.props.fetchRepos(link, 'receiveNextRepos', true);
          });
        }
      });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const numberOfPage = Number(nextProps.numberOfPages) + 1;
    
    const loadInitialReposComplete = this.props.currentPage != nextProps.currentPage &&
                                     nextProps.currentPage == nextProps.numberOfPages;

    if ((this.fetchedPages.indexOf(numberOfPage) === -1 || loadInitialReposComplete) &&
        nextProps.repos.length < 30 &&
        !nextProps.isAllRepos &&
        nextProps.currentPage == nextProps.numberOfPages) {
      const owner = nextProps.owner;
      const link = `//api.github.com/users/${owner}/repos?page=${numberOfPage}`;
      this.fetchedPages.push(numberOfPage);
      this.props.fetchRepos(link, 'receiveNextRepos');
    }
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      const owner = this.props.owner;
      const isAllRepos = this.props.isAllRepos;
      const numberOfPages = Number(this.props.numberOfPages) + 1;
      if (owner && !isAllRepos) {
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

  render({ isFetching, repos, currentRepo, numberOfPages, isAllRepos, owner }, { dialogMode }) {
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
