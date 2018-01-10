import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import UserAPI from '../../../api/userApi';
import * as userActions from '../../../actions/userActions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    UserAPI.loginUser(this.state.username, this.state.password)
      .then(response => {
        if (response.status >= 400 && response.status < 500 ) {
          toastr.error(response.data.error);
        } else {
          localStorage.setItem('Authorization', response.data.Authorization);
          this.props.dispatch(userActions.checkLogin());
          toastr.success('Login Success');
          return this.props.history.push('/');
        }
      })
      .catch(error => {
        console.log(error)
        return toastr.error('Login Failed');
      })
  }

  handleChange(name, event) {
    var change = {};
    change[name] =  event.target.value;
    this.setState(change);
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="Username" className="control-label">User Name</label>
            <input value={this.state.username} type="username" name="username" className="form-control" placeholder="Enter username" onChange={this.handleChange.bind(this, "username")} required /> 
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input  value={this.state.password} type="password" name="password" className="form-control"  placeholder="Password" onChange={this.handleChange.bind(this, "password")} required />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control" value="Login"/>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default withRouter(connect(mapDispatchToProps)(LoginPage));
