import {h, Component} from 'preact';
import Card from './../Card';
import Dialog from './../Dialog';
import LoadingBar from './../LoadingBar';

class Cards extends Component {
  render({ isFetching, repos = [], currentRepo, dialogMode, openDialog, closeDialog }) {
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
              openDialog={openDialog}
            />
          ))
        }
        {
          !isFetching &&
          <Dialog
            openedRepo={currentRepo}
            dialogMode={dialogMode}
            closeDialog={closeDialog}
          />  
        }
      </div>
    );
  }
}

export default Cards;
