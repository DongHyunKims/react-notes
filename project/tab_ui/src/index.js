import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tab from "./Tab";
import utility from './utility';
import Redux,{createStore} from 'redux';
import './index.css';
import ReactDOM from "react-dom";
import appReducer from './reducers';
import {setData} from './actions';
import { connect } from 'react-redux';
import { Provider  } from 'react-redux';



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
        utility.runAjax(this.props.reqListener,"GET","../data/newsData.json");
    }


    getTitlList(data){
        let titleArr = [];
        data.forEach((val)=>{
            titleArr.push(val.title);
    });
    return titleArr;
}

render() {
    // props를 통해 바로 사용 가능하다.
    let {data} = this.props.state;
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


/*
 mapStateToProps(state, [ownProps]): (Function) store 의 state 를 컴포넌트의 props 에 매핑 시켜줍니다.
 ownProps 인수가 명시될 경우, 이를 통해 함수 내부에서 컴포넌트의 props 값에 접근 할 수 있습니다.
 state는 getState와 같은 것 입니다
 */
const mapStateToProps = (state) =>{
    return {
        state: state,
    }
};

/*
 mapDispatchToProps(dispatch, [ownProps]): (Function or Object)  컴포넌트의 특정 함수형 props 를 실행 했을 때, 개발자가 지정한 action을 dispatch 하도록 설정합니다.
 ownProps의 용도는 위 인수와 동일합니다.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        reqListener(res){
            //console.log(res);
            let jsonData = JSON.parse(res.currentTarget.responseText);
            dispatch(setData(jsonData));
        }

    };
};

const AppContainer = connect(mapStateToProps,mapDispatchToProps)(App);



ReactDOM.render(

    /*
     provider를 통해 상위 컴포넌트에서 쉽게 store를 보낼수 있다.
     렌더링 될 때 Redux 컴포넌트인 <Provider> 에 store 를 설정해주면 그 하위 컴포넌트들에 따로 parent-child 구조로 전달해주지 않아도 connect 될 때 store에 접근 할 수 있게 해줍니다.
     */
    <Provider store={store}>
    <AppContainer />
    </Provider>,
    document.getElementById('root')
);








