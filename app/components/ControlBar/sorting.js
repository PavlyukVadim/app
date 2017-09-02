import { h } from 'preact';

export default () => (
  <div class="sorting">
    <div class="row">
      <p class="col-md-4">Sort by:</p> 
      <select class="soflow col-md-8">
        <option>repo name</option>
        <option>stars</option>
        <option>issues</option>
        <option>updated</option>
      </select>
    </div>
    <div class="row">
      <p class="col-md-4">Sort order:</p> 
      <select class="soflow col-md-8">
        <option>asc</option>
        <option>desc</option>
      </select>
    </div>
  </div>
);
