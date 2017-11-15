import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
          <ul className="nav navbar-nav">
            <li><Link to="/" activeClassName="active">Home</Link></li>
            <li><Link to="/bucketlists" activeClassName="active">Bucket Lists</Link></li>
            <li><Link to="/login" activeClassName="active">Log in</Link></li>
          </ul>
      </nav>
    )
  }
}

export default Header;