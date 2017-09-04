import {h, Component} from 'preact';

class Filters extends Component {
  render({
    languages,
    changeLanguage,
    changeType,
    changeNumberOfStars,
    changeUpdatedDate,
    changeHasTopics,
    changeHasOpenIssues,
    hasTopics, 
    hasOpenIssues,
  }) {
    return (
      <div class="filters">
        <div class="row">
          <p class="col-md-4">Language:</p> 
          <select
            class="soflow col-md-8"
            onChange={(e) => changeLanguage(e.target.value)}
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
            onChange={(e) => changeType(e.target.value)}
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
              onChange={(e) => changeUpdatedDate(e.target.value)}
            />
          </div>
        </div>
        <div class="row">
          <p class="col-md-4">Starred > than:</p> 
          <div class="col-md-8">
            <input
              type="number"
              class="number-of-stars"
              onChange={(e) => changeNumberOfStars(e.target.value)}
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
                onChange={(e) => changeHasTopics(e.target.value)}
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
                onChange={(e) => changeHasOpenIssues(e.target.value)}
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
