import {h, Component} from 'preact';
import Filters from '../Filters';
import Sorting from '../Sorting';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.changeHasTopics = this.changeHasTopics.bind(this);
    this.changeHasOpenIssues = this.changeHasOpenIssues.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props.route(nextProps.URL);
  }
    
  changeHasTopics(hasTopics) {
    const newValue = this.props.filtersParams.hasTopics === true ? false : true;
    this.props.changeHasTopics(newValue);
  }
  
  changeHasOpenIssues(hasOpenIssues) {
    const newValue = this.props.filtersParams.hasOpenIssues === true ? false : true;
    this.props.changeHasOpenIssues(newValue);
  }

  render({
    sortingParams,
    changeSortBy,
    changeSortOrder,
    languages,
    filtersParams,
    changeLanguage,
    changeType,
    changeNumberOfStars,
    changeUpdatedDate
  }) {
    return (
      <div>
        <Sorting
          sortingParams={sortingParams}
          changeSortBy={changeSortBy}
          changeSortOrder={changeSortOrder}
        />
        <Filters
          languages={languages}
          filtersParams={filtersParams}
          changeLanguage={changeLanguage}
          changeType={changeType}
          changeNumberOfStars={changeNumberOfStars}
          changeUpdatedDate={changeUpdatedDate}
          changeHasTopics={this.changeHasTopics}
          changeHasOpenIssues={this.changeHasOpenIssues}
        />
      </div>
    );
  }
}

export default SideBar;
