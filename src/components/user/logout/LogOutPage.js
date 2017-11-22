import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as userActions from '../../../actions/userActions';


class LogOutPage extends React.Component {
  componentWillMount () {
    localStorage.clear()
    this.props.dispatch(userActions.checkLogin());
    toastr.success('Log Out Success');
    return this.props.history.push('/');
  }

  render () {
    return null;
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}


export default withRouter(connect(mapDispatchToProps)(LogOutPage));