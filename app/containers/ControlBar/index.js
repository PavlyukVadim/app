import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import { changeFilters, changeSorting } from '../../actions';
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
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    changeSortBy: (sortBy) => dispatch(changeSorting({sortBy})),
    changeSortOrder: (sortOrder) => dispatch(changeSorting({sortOrder})),
    changeLanguage: (language) => dispatch(changeFilters({language})),
    changeType: (type) => dispatch(changeFilters({type})),
    changeNumberOfStars: (numberOfStars) => dispatch(changeFilters({numberOfStars})),    
    changeUpdatedDate: (updatedDate) => dispatch(changeFilters({updatedDate})),
    changeHasTopics: (hasTopics) => dispatch(changeFilters({hasTopics})),
    changeHasOpenIssues: (hasOpenIssues) => dispatch(changeFilters({hasOpenIssues})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
