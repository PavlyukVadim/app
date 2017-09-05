import {h, Component} from 'preact';

const sortingOptions = ['Name', 'Stars', 'Issues', 'Updated'];
const sortingOrderOptions = ['Desc', 'Asc'];

class Sorting extends Component {
  render({ sortBy, sortOrder, sortOnChange, sortOrderOnChange }) {
    return (
      <div class="sorting">
        <div class="row">
          <p class="col-md-4">Sort by:</p> 
          <select
            class="soflow col-md-8"
            onChange={(e) => sortOnChange(e.target.value)}
          > 
            {
              sortingOptions.map((option) => (
                <option selected={sortBy === option}>{option}</option>    
              ))
            }
          </select>
        </div>
        <div class="row">
          <p class="col-md-4">Sort order:</p> 
          <select
            class="soflow col-md-8"
            onChange={(e) => sortOrderOnChange(e.target.value)}
          >
            {
              sortingOrderOptions.map((option) => (
                <option selected={sortOrder === option}>{option}</option>    
              ))
            }
          </select>
        </div>
      </div>
    );
  }
}

export default Sorting;
