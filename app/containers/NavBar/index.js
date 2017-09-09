import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import { changeOwnerAndFetchRepos } from '../../actions';
import Header from '../../components/Header';

const mapStateToProps = (state) => {
  return {
    owner: state.owner,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeOwner: (owner) => dispatch(changeOwnerAndFetchRepos(owner)), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
