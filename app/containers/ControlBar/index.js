import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import { changeParamsAndUpdateURL } from '../../actions';
import SideBar from '../../components/SideBar';


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
