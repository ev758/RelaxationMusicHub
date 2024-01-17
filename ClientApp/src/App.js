import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

export default class App extends Component {
  render() {
    return (
        <div className="App">
            <Outlet/>
        </div>
    );
  }
}
