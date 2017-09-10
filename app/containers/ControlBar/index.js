import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import { changeParamsAndUpdateURL } from '../../actions';
import SideBar from '../../components/SideBar';


// const changeURL(
//   owner = this.state.owner,
//   sortBy = this.state.sortBy,
//   sortOrder = this.state.sortOrder,
//   filters = this.state.filtersParams,
//   numberOfPages = this.state.numberOfPages
// ) {
//   let link = ``;
//   let sortByParam = sortBy ? `sort=${sortBy}` : '';
//   let sortOrderParam = sortOrder ? `order=${sortOrder}` : '';
//   let numberOfPagesParam = numberOfPages ? `page=${numberOfPages}` : '';
//   let filtersParams = [];
//   for (const param in filters) {
//     if (typeof filters[param] === 'boolean' && filters[param]) {
//       filtersParams.push(param);
//     } else if (filters[param]) {
//       filtersParams.push(`${param}=${filters[param]}`);
//     }
//   }
//   let params = [sortByParam, sortOrderParam, ...filtersParams, numberOfPagesParam]
//                .filter((param) => param).join('&');
//   this.props.route(`#${owner}?${params}`);
//   if (this.state.currPage < this.state.numberOfPages) {
//     this.search();
//   }
// }

const getLanguages = (repos = []) => {
  let languages = [];
  repos.forEach((repo) => {
    if(!~languages.indexOf(repo.language) && repo.language) {
      languages.push(repo.language);
    }
  });
  return languages;
}

const mapStateToProps = (state) => {
  return {
    languages: getLanguages(state.repos),
    sortingParams: state.sortingParams,
    filtersParams: state.filtersParams,
    URL: state.URL,
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    changeSortBy: (sortBy) => dispatch(changeParamsAndUpdateURL('sorting', {sortBy})),
    changeSortOrder: (sortOrder) => dispatch(changeParamsAndUpdateURL('sorting', {sortOrder})),
    changeLanguage: (language) => dispatch(changeParamsAndUpdateURL('filters', {language})),
    changeType: (type) => dispatch(changeParamsAndUpdateURL('filters', {type})),
    changeNumberOfStars: (numberOfStars) => dispatch(changeParamsAndUpdateURL('filters', {numberOfStars})),    
    changeUpdatedDate: (updatedDate) => dispatch(changeParamsAndUpdateURL('filters', {updatedDate})),
    changeHasTopics: (hasTopics) => dispatch(changeParamsAndUpdateURL('filters', {hasTopics})),
    changeHasOpenIssues: (hasOpenIssues) => dispatch(changeParamsAndUpdateURL('filters', {hasOpenIssues})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
