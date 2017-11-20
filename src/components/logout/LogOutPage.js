import React from 'react';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class LogOutPage extends React.Component {
  componentWillMount () {
    localStorage.clear()
    this.props.history.push('/');
    toastr.success('Log Out Success');
  }

  render () {
    return null;
  }
};

export default withRouter(LogOutPage);