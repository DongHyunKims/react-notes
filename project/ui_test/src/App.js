import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AlbumComponent from './AlbumComponent'
import utility from './utility';




class App extends Component {

    constructor(props){
        super(props);
        this.state = {
          videoData : null
        };
        this.requestListener = this.requestListener.bind(this);

    }


  componentDidMount(){

      utility.runAjax(this.requestListener,"GET","./youtubeData.json")

  }

  requestListener(res){
    console.log("jsonData",res.currentTarget.responseText);
    let jsonData = JSON.parse(res.currentTarget.responseText);
    this.setState({videoData : jsonData});
  }


  render() {

    let videoData = this.state.videoData;

    return (
      <div className="App">


          <AlbumComponent videoData={videoData} />

          <div className="search_block">

          </div>

      </div>
    );
  }
}

export default App;
