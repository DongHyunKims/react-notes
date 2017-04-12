import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tab from "./Tab";
import utility from './utility';
//import axios from "axios";
//fetch




class App extends Component {


    constructor(props){
        super(props);
        this.state = {data : null, titleList : null};

    }


    // will 과 did의 차이가 많이 없다, setState 만 will 과 did의 동작을 모아 놓고 실행한다.
    componentDidMount(){
        // axios("../data/newsData.json").then((res)=>{
        //     console.log("res",res);
        //     const data = res.data;
        //     this.setState({ data });
        // });
        utility.runAjax(this.reqListener.bind(this),"GET","../data/newsData.json");




    }
    //universial rendering!!!! server side rendering을 사용한다.
    reqListener(res){
        //console.log(res);
        let jsonData = JSON.parse(res.currentTarget.responseText);
        let titleList = this.getTitlList(jsonData);
        this.setState({ data:  jsonData, titleList: titleList });
    }

    getTitlList(data){
        let titleArr = [];
        data.forEach((val)=>{
            titleArr.push(val.title);
    });
    return titleArr;
}

render() {
    let data = this.state.data;
    let titleList = this.state.titleList;

    let renderingDom = <h3>Loading</h3>;
    if(data){
        renderingDom =  <Tab data={data} titleList={titleList} />
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
