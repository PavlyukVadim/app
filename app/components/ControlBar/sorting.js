import {h, Component} from 'preact';

class Sorting extends Component {
  render({ sortOnChange, sortOrderOnChange }) {
    return (
      <div class="sorting">
        <div class="row">
          <p class="col-md-4">Sort by:</p> 
          <select
            class="soflow col-md-8"
            onChange={(e) => sortOnChange(e.target.value)}
          >
            <option>Name</option>
            <option>Stars</option>
            <option>Issues</option>
            <option>Updated</option>
          </select>
        </div>
        <div class="row">
          <p class="col-md-4">Sort order:</p> 
          <select
            class="soflow col-md-8"
            onChange={(e) => sortOrderOnChange(e.target.value)}
          >
            <option>Desc</option>
            <option>Asc</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Sorting;
