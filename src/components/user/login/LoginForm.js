import React from 'react';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import UserAPI from '../../../api/userApi';

class LoginForm extends React.Component {
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
        localStorage.setItem('Authorization', response.data.Authorization);
        this.props.history.push('/');
        toastr.success('Login Success');
      })
      .catch(error => {
        console.log(error);
        toastr.error('Login Failed');
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
        <form>
          <div className="form-group">
            <label htmlFor="Username" className="control-label">User Name</label>
            <input value={this.state.username} type="username" name="username" className="form-control" placeholder="Enter username" onChange={this.handleChange.bind(this, "username")} /> 
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input  value={this.state.password} type="password" name="password" className="form-control"  placeholder="Password" onChange={this.handleChange.bind(this, "password")} />
          </div>
          <div className="form-group">
            <input type="button" onClick={this.handleSubmit} className="form-control" value="Login"/>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
