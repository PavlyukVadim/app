import {h, Component} from 'preact';
import Filters from '../../components/Filters';
import Sorting from '../../components/Sorting';

class ControlBar extends Component {
  constructor(props) {
    super(props);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeNumberOfStars = this.changeNumberOfStars.bind(this);
    this.changeUpdatedDate = this.changeUpdatedDate.bind(this);
    this.changeHasTopics = this.changeHasTopics.bind(this);
    this.changeHasOpenIssues = this.changeHasOpenIssues.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      languages: this.getLanguages(nextProps.repos),
    });
  }

  getLanguages(repos) {
    let languages = [];
    repos.forEach((repo) => {
      if(!~languages.indexOf(repo.language) && repo.language) {
        languages.push(repo.language);
      }
    });
    return languages;
  }

  changeLanguage(language) {
    this.props.filtersParamsOnChange({language});
  }
  
  changeType(type) {
    this.props.filtersParamsOnChange({type});
  }

  changeNumberOfStars(numberOfStars) {
    this.props.filtersParamsOnChange({numberOfStars});
  }

  changeUpdatedDate(updatedDate) {
    this.props.filtersParamsOnChange({updatedDate});
  }
  
  changeHasTopics(hasTopics) {
    const newValue = this.props.filtersParams.hasTopics === true ? false : true;
    this.props.filtersParamsOnChange({
      hasTopics: newValue,
    });
  }
  
  changeHasOpenIssues(hasOpenIssues) {
    const newValue = this.props.filtersParams.hasOpenIssues === true ? false : true;
    this.props.filtersParamsOnChange({
      hasOpenIssues: newValue,
    });
  }

  render({ sortOnChange, sortOrderOnChange, sortBy, sortOrder, filtersParams }, { languages }) {
    return (
      <div>
        <Sorting
          sortBy={sortBy}
          sortOrder={sortOrder}
          sortOnChange={sortOnChange}
          sortOrderOnChange={sortOrderOnChange}
        />
        <Filters
          languages={languages}
          filtersParams={filtersParams}
          changeLanguage={this.changeLanguage}
          changeType={this.changeType}
          changeNumberOfStars={this.changeNumberOfStars}
          changeUpdatedDate={this.changeUpdatedDate}
          changeHasTopics={this.changeHasTopics}
          changeHasOpenIssues={this.changeHasOpenIssues}
        />
      </div>
    );
  }
}

export default ControlBar;
