import React, { Component } from 'react'
import logo from '../../unnamed.png';
import Styled from 'styled-components';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="App">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed top" >
            <a href="" className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
            </nav>
        </div>
      </div>
    )
  }
}
