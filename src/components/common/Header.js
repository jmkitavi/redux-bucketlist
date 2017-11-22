import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
          {this.props.user ? (
            <ul className="nav navbar-nav">
              <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
              <li><NavLink to="/bucketlists" activeClassName="active">Bucket Lists</NavLink></li>
              <li><NavLink to="/logout" activeClassName="active">Log Out</NavLink></li>
          </ul>
          ):(
            <ul className="nav navbar-nav">
              <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
              <li><NavLink to="/login" activeClassName="active">Log in</NavLink></li>
              <li><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li>
            </ul>
          )}
      </nav>
    )
  }
}
Header.PropTypes = {
  user: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Header);
