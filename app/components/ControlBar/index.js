import {h, Component} from 'preact';
import Sorting from './sorting';
import Filters from './filters';

class ControlBar extends Component {
  render() {
    return (
      <div class="Filters">
        <Sorting />
        <Filters />
      </div>
    );
  }
}

export default ControlBar;
