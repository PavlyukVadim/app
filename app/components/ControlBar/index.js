import {h, Component} from 'preact';
import Sorting from './sorting';
import Filters from './filters';

class ControlBar extends Component {
  render({ sortOnChange, sortOrderOnChange }) {
    return (
      <div>
        <Sorting
        	sortOnChange={sortOnChange}
        	sortOrderOnChange={sortOrderOnChange}
        />
        <Filters />
      </div>
    );
  }
}

export default ControlBar;
