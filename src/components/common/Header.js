import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
          <ul className="nav navbar-nav">
            <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/bucketlists" activeClassName="active">Bucket Lists</NavLink></li>
            <li><NavLink to="/login" activeClassName="active">Log in</NavLink></li>
            <li><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li>
          </ul>
      </nav>
    )
  }
}

export default Header;