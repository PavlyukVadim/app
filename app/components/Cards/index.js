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
    if (owner) {
      const link = `//api.github.com/users/${owner}/repos`;
      this.props.fetchRepos(link);
    }
    window.addEventListener('scroll', this.handleScroll);
    // window.onpopstate = (event) => {
    //   this.parseURL(); 
    // };
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
