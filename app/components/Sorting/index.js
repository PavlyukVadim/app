import {h, Component} from 'preact';

const sortingOptions = ['Name', 'Stars', 'Issues', 'Updated'];
const sortingOrderOptions = ['Desc', 'Asc'];

class Sorting extends Component {
  render({ sortingParams={}, changeSortBy, changeSortOrder }) {
    return (
      <div class="sorting">
        <div class="row">
          <p class="col-xs-4">Sort by:</p> 
          <select
            class="soflow col-xs-8"
            onChange={(e) => changeSortBy(e.target.value)}
          > 
            {
              sortingOptions.map((option) => (
                <option selected={sortingParams.sortBy === option}>{option}</option>    
              ))
            }
          </select>
        </div>
        <div class="row">
          <p class="col-xs-4">Sort order:</p> 
          <select
            class="soflow col-xs-8"
            onChange={(e) => changeSortOrder(e.target.value)}
          >
            {
              sortingOrderOptions.map((option) => (
                <option selected={sortingParams.sortOrder === option}>{option}</option>    
              ))
            }
          </select>
        </div>
      </div>
    );
  }
}

export default Sorting;
