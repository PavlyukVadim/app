import {h, Component} from 'preact';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTopics: false,
      hasOpenIssues: false,
    };
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
    const newValue = this.state.hasTopics === true ? false : true;
    this.setState({
      hasTopics: newValue,
    });
    this.props.filtersParamsOnChange({
      hasTopics: newValue,
    });
  }
  
  changeHasOpenIssues(hasOpenIssues) {
    const newValue = this.state.hasOpenIssues === true ? false : true;
    this.setState({
      hasOpenIssues: newValue,
    });
    this.props.filtersParamsOnChange({
      hasOpenIssues: newValue,
    });
  }

  render({ filtersParamsOnChange }, { hasTopics, hasOpenIssues, languages }) {
    return (
      <div class="filters">
        <div class="row">
          <p class="col-md-4">Language:</p> 
          <select
            class="soflow col-md-8"
            onChange={(e) => this.changeLanguage(e.target.value)}
          >
            <option>all</option>
            { languages &&
              languages.map((language) => (
                  <option>{language}</option>      
                )
              )
            }
          </select>
        </div>
        <div class="row">
          <p class="col-md-4">Type:</p> 
          <select
            class="soflow col-md-8"
            onChange={(e) => this.changeType(e.target.value)}
          >
            <option>all</option>
            <option>forks</option>
            <option>sources</option>
          </select>
        </div>
        <div class="row">
          <p class="col-md-4">Updated after:</p> 
          <div class="col-md-8">
            <input
              type="date"
              class="updated-after-input"
              onChange={(e) => this.changeUpdatedDate(e.target.value)}
            />
          </div>
        </div>
        <div class="row">
          <p class="col-md-4">Starred > than:</p> 
          <div class="col-md-8">
            <input
              type="number"
              class="number-of-stars"
              onChange={(e) => this.changeNumberOfStars(e.target.value)}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>
              <input
                type="checkbox"
                name="topics"
                checked={hasTopics}
                onChange={(e) => this.changeHasTopics(e.target.value)}
              />
              Has topics
            </label>
          </div>
          <div class="col-md-6">
            <label>
              <input
                type="checkbox"
                name="issues"
                checked={hasOpenIssues}
                onChange={(e) => this.changeHasOpenIssues(e.target.value)}
              />
              Has open issues
            </label>
          </div>
        </div>  
      </div>
    );
  }
}

export default Filters;
