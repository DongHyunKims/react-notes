## alt library

alt library는 state를 좀 더 편리하게 관리하기위한 라이브러리.
기존에 있는 FLUX를 좀더 쉽게 사용할 수 있다.

기본 구조는 간단하다.  actions, store, view를 통한 단방향 통신을 지향한다. actions에서 모든 작업을 한 후, `this.dispatch`를 통해  actions 에서 store로 데이터를 보낸다.

1. install
~~~
npm install alt --save
~~~

2. Folder structure
~~~
your_project
|--actions/
|  |--MyActions.js
|--stores/
|  |--MyStore.js
|--components/
|  |--MyComponent.jsx
|--alt.js
|--app.js
~~~

3. Creating your first alt
~~~javascript
//alt.js
var Alt = require('alt');
var alt = new Alt();

module.exports = alt;
~~~

4. view
- `component` 에서 `event` 발생시 action 함수를 사용한다.
~~~
import alt from '../alt';
import RegisterAction from '../actions/RegisterAction';
...
handleSubmitBtn(event){
	RegisterAction.submitRegister();
}
~~~

5. actions
- `alt.createActions` 메소드의 인자로 클래스 또는 객체를 만들어 전달하여 생성된 action을 export 한다.
- ajax 처리 등 필요한 행동을 모두 처리한다.
- `this.dispatch` 메소드를 통해서 가공된 데이터를 store로 보낸다.
~~~
import alt from '../alt';
import config from '../utility/config';
import utility from '../utility/utility';

export default alt.createActions({
	submitRegister() {	
		return  utility.runAjax(function(res){
		let { response } = res.currentTarget;
            let data = JSON.parse(response);
            this.dispatch(data);
      	}.bind(this),"GET",config.DEFAULT_URL + "/");
	}
});
~~~

6. store
- `action`에서 처리된 데이터를 받아 state를 변경한다.
- `alt.createStore` 메소드에 객체를 displayName, state, .. 등을 property로 가진 객체를 인자로 넘겨주어 store 객체를 만들고 export 한다.
- `bindListeners` property에는 action의 메소드를 바인딩한다.
~~~
import alt from '../alt';
import RegisterAction from '../actions/RegisterAction';

export default alt.createStore({
	displayName: 'RegisterStore',

	state: {
		userList: []
	},

	bindListeners: {
		submitRegister: RegisterAction.submitRegister
	},

	submitRegister: function(users) {
		if(users) {
			this.state.userList = users;
		}
	} 
});
~~~

7. alt-container
- `alt-container`을 통해 변경된 state를 `AltContainer` 태그 아래에 있는 컴포넌트의 props로 보낸다.
~~~
import React, { Component } from 'react';
import './App.css';
import RegisterComponent from './components/Register';
import DetailComponent from './components/Detail';
import utility from './utility/utility';
import AltContainer from 'alt-container';
import RegisterStore from './stores/RegisterStore';

class App extends Component {

  constructor(props){
  	super(props);
  }	

  render() {
    return (
      <div className="App">
        <RegisterComponent />

        <AltContainer stores={{
          users: RegisterStore
        }}>
          <DetailComponent />
        </AltContainer>
        
      </div>
    );
  }
}

export default App;
~~~