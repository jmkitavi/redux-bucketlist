import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';

class SignUpForm extends React.Component {
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
    const url = 'http://127.0.0.1:5000/auth/register';
    const login_url = 'http://127.0.0.1:5000/auth/login';
    axios.post(url, {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      toastr.success('Sign Up Success');
      axios.post(login_url, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response2 => {
        localStorage.setItem('Authorization', response2.data.Authorization);
        toastr.success('Logged In Successfully');
        this.props.history.push('/');
      })
    })
    .catch(error => {
      console.log(error);
      toastr.error('Sign Up Failed');
    });
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
            <input type="button" onClick={this.handleSubmit} className="form-control" value="Sign Up"/>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpForm);
