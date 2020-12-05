import React, { Component } from 'react'
import logo from '../../unnamed.png';


export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="App">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed top">
              <div className="container">
                <a href="/" className="navbar-brand col-sm-3 col-md-2 mr-0">
                <img src={logo} className="App-logo" alt="logo" />
              </a>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                  <a className="nav-link" href="/" style= {{fontSize: '20px', color: 'white'}}>Pókedex</a>
                  </li>
                </ul>
              </div>
              </div>
            </nav>
        </div>
      </div>
    )
  }
}
