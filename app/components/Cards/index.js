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
