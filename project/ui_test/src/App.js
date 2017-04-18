import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AlbumComponent from './AlbumComponent';
class App extends Component {
  render() {
    return (
      <div className="App">


          <AlbumComponent />

          <div className="search_block">

          </div>

      </div>
    );
  }
}

export default App;
