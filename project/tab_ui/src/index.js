import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tab from "./Tab";
import utility from './utility';
import Redux,{createStore} from 'redux';
import './index.css';
import ReactDOM from "react-dom";

//import axios from "axios";
//fetch


const appReducer = (state = undefined, action) => {
    console.log("action",action);
    console.log("state",state);

    switch (action.type){
        case "SETDATA" : return action.data;
        default : return state;
    }

};



const store = createStore(appReducer);

class App extends Component {


    constructor(props){
        super(props);
        //this.state = {data : null, titleList : null};

    }


    // will 과 did의 차이가 많이 없다, setState 만 will 과 did의 동작을 모아 놓고 실행한다.
    componentDidMount(){
        // axios("../data/newsData.json").then((res)=>{
        //     console.log("res",res);
        //     const data = res.data;
        //     this.setState({ data });
        // });
        utility.runAjax(this.reqListener,"GET","../data/newsData.json");
    }
    //universial rendering!!!! server side rendering을 사용한다.
    reqListener(res){
        //console.log(res);
        let jsonData = JSON.parse(res.currentTarget.responseText);
        store.dispatch({
            type:"SETDATA",
            data:jsonData,
        });
    }

    getTitlList(data){
        let titleArr = [];
        data.forEach((val)=>{
            titleArr.push(val.title);
    });
    return titleArr;
}

render() {
    let data = this.props.data;
    console.log("data",data);


    let renderingDom = <h3>Loading</h3>;
    if(data){
        let titleList = this.getTitlList(data);
        renderingDom =  <Tab data={data} titleList={titleList}  store={store}/>
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



var cnt = 0;
function render() {
    cnt++;

    console.log("cnt",cnt);
    console.log("state2",store.getState());

    ReactDOM.render(
        <App data={store.getState()} />,
        document.getElementById('root')
    );
}

store.subscribe(render);

render();






