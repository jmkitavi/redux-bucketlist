import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.object.isRequired
};

export default App;
