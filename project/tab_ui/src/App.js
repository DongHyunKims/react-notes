import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tab from "./Tab";
import utility from './utility';
import axios from "axios";




class App extends Component {


    constructor(props){
        super(props);
        this.state = {data : null};
    }



    componentDidMount(){
        axios("../data/newsData.json").then((res)=>{
            console.log("res",res);
            const data = res.data;
            this.setState({ data });
        });
    }




  render() {
    let data = this.state.data;
    let renderingDom = <h3>Loading</h3>;
    if(data){
        renderingDom =  <Tab data={data}/>
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          {renderingDom}
      </div>
    );
  }
}

export default App;
