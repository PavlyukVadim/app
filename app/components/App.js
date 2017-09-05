import {h, Component} from 'preact';
import Header from './Header';
import CardsList from '../containers/CardsList';
import ControlBar from '../containers/ControlBar';

class App extends Component {
  render({
    changeOwner,
    repos=[],
    sortBy,
    sortOrder,
    filtersParams,
    search,
    getInfoAboutRepo,
    currentRepo,
    isFetching,
    sortOnChange,
    sortOrderOnChange,
    filtersParamsOnChange
  }) {
    return (
      <div>
        <Header changeOwner={changeOwner}/>
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <CardsList
                repos={repos}
                sortBy={sortBy}
                sortOrder={sortOrder}
                filtersParams={filtersParams}
                search={search}
                getInfoAboutRepo={getInfoAboutRepo}
                currentRepo={currentRepo}
                isFetching={isFetching}
              />
            </div>
            <div class="col-md-5">
              <ControlBar
                repos={repos}
                sortBy={sortBy}
                sortOrder={sortOrder}
                sortOnChange={sortOnChange}
                sortOrderOnChange={sortOrderOnChange}
                filtersParams={filtersParams}
                filtersParamsOnChange={filtersParamsOnChange}
              />    
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
