import {h, Component} from 'preact';
import Sorting from './sorting';
import Filters from './filters';

class ControlBar extends Component {
  render({ repos, sortOnChange, sortOrderOnChange, filtersParamsOnChange }) {
    return (
      <div>
        <Sorting
        	sortOnChange={sortOnChange}
        	sortOrderOnChange={sortOrderOnChange}
        />
        <Filters
        	repos={repos}
					filtersParamsOnChange={filtersParamsOnChange}
        />
      </div>
    );
  }
}

export default ControlBar;
