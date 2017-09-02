import { h } from 'preact';

export default () => (
  <div class="filters">
    <div class="row">
      <p class="col-md-4">Language:</p> 
      <select class="soflow col-md-8">
        <option>Ruby</option>
        <option>C#</option>
        <option>PHP</option>
        <option>Objective-C</option>
        <option>Python</option>
        <option>JavaScript</option>
        <option>Scala</option>
        <option>Go</option>
      </select>
    </div>

    <div class="row">
      <p class="col-md-4">Type:</p> 
      <select class="soflow col-md-8">
        <option>all</option>
          <option>forks</option>
          <option>sources</option>
      </select>
    </div>

    <div class="row">
      <p class="col-md-4">Updated after:</p> 
      <div class="col-md-8">
        <input type="date" class="updated-after-input"/>
      </div>
    </div>

    <div class="row">
      <p class="col-md-4">Starred > than:</p> 
      <div class="col-md-8">
        <input type="number" class="number-of-stars"/>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <label>
          <input type="checkbox" name="topics"/>
          Has topics
        </label>
      </div>
      <div class="col-md-6">
        <label>
          <input type="checkbox" name="issues"/>
          Has open issues
        </label>
      </div>
    </div>  
  </div>
);
