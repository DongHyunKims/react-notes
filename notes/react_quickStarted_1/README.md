## React Get Started

### 1.  jsx
- 자바스크립트를 확장 시켜서 만들었다.

~~~javascript
class MyBlog extends React.Component {
  constructor() {
    super();
    this.state = {posts : [
      {
        "title": "sunt aut facere repellat",
         "body": "quia et suscipit\nsuscipit"
      },
      {
        "title": "qui est essexxxxx",
        "body": "est rerum tempore vitae\nsequi sint"
      }
    ], 
    showLog :false,
    selectedNumber : 0,              
    };
  }
  
  addCount(number) {
    console.log('log', number);
    number++;
    this.setState({'showLog':true, 'selectedNumber':number});
  }

  render() {
    const data = this.state.posts;
    const myHTML = data.map((v,i) => {
      return (<li key={i} onClick={this.addCount.bind(this, i)}>{v.title}</li>)
    });
    let currentNumber;
    const bShow = this.state.showLog;
    if(bShow) currentNumber = this.state.selectedNumber;
      
    return (
      <div>
        <h2>My Blog posts :-)</h2>
        <ul>
          {myHTML}
        </ul>
        {(bShow) ? (<div>{currentNumber} 번째 li가 선택됐어요!</div>) :(<div></div>)}
      </div>
    )
  }
}

ReactDOM.render(
  <MyBlog/>, document.querySelector("#wrap")
);
~~~


~~~javascript
<html> 
  <head>
  </head>
  
  <body>
  <div id="wrap">
  
  </div>
  </body>
 
</html>
~~~


- JSX is an Expression Too
- 컴파일이 끝나면 JSX 표현식이 일반 JavaScript 객체가됩니다. 즉, if 문과 for 루프에서 JSX를 사용할 수 있고, 변수에 할당하고, 인수로 받아 들여 함수에서 반환 할 수 있습니다.



jsx 예제
~~~javascript
function formatName(user){
 if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

const user = {
  firstName: "Harper",
  lastName: "perez"
};

const element = (
  <h1>
    Hello, {formatName(user)}! 
   </h1>
)

ReactDOM.render(
element,
  document.querySelector('#wrap')
)
~~~

- Specifying Attributes with JSX (속성 지정 하기)
- `const element = <img src={user.avatarUrl}></img>;`와 같이 {}을 통해 속성을 지정 할수 있다.
- tag의 끝은 꼭 지정해 주어야 한다. "<img/>"  or "<img></img>"


~~~javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
~~~
위 예제와 같이 무조건 하나의 tag가 자식들을 감싸고 있어야 동작이 된다.

- JSX는 HTML보다 JavaScript에 가깝기 때문에 React DOM은 HTML 속성 이름 대신 camelCase 속성 명명 규칙을 사용합니다. 예를 들어 class는 JSX에서는 className이되고 tabindex는 tabIndex가됩니다.


#### JSX Represents Objects
- 바벨은 jsx tag를 React.createElement()로 변환해 준다.

~~~javascript
//변환전
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
//변환후
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
~~~


### 2. Rendering Elements
- 리엑트 앱에서 elements는 아주 작은 블록 이다.

#### Rendering an Element into the DOM
- 하나의 root dom을 통해 react 앱을 관리한다.
- 엘리먼트 렌더링을 위해 ReactDOM.render() 메소드를 사용 하여 렌더링 한다.


#### Updating the Rendered Element
- react의 element는 불변하다. 
- 한번 만들어 놓으면 자식이나 속성을 바꿀수 없다. 
- 바꿀수 있는 하나의 방법은 새로운 element를 만들고 ReactDOM.render()메소드로 보내는 것이다.

~~~javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
~~~

#### React Only Updates What's Necessary
- react DOM은 element와 자식 element를 이전 상태와 비교하고 DOM을 원하는 상태로 만드는 데 필요한 DOM만 업데이트 합니다.


## 3. Components and Props
- 컴포넌트는 ui를 쪼개고, 부분을 재사용한다. 그리고 각각의 pieces는 독립 적이다.
- 컨셉 적으로 컴포넌트는 자바스크립트의 function과 같다.
- props를 넣고 React element를 리턴한다.

#### Functional and Class Components
- 자바스크립트의 함수로 간단하게 element를 정의 하였다.
~~~javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
~~~
이 함수는 하나의 "props"객체 arguments를 데이터와 함께 받아들이고 React elements를 반환하기 때문에 유효한 React 구성 요소입니다.

ES6 class 개념을 가지고 component를 정의 할수 있다.

~~~javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
~~~

두 표현 방식은 같다고 볼수 있다.

#### Rendering a Component

- React가 user-defined component를 나타내는 elements를 볼 때 JSX attributes를 이 elements에 단일 객체로 전달합니다. 우리는이 객체를 "props"이라고 부릅니다.

예를 들어,이 코드는 페이지에 "Hello, Sara"를 렌더링합니다.

~~~javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

//사용자 정의 elements
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
~~~

1. 우리는 `ReactDOM.render()`을 `<Welcome name="Sara" />` element와 함께 부른다.
2. React는 Welcome component를 `{name: 'Sara'}` props와 함께 부른다.
3. Welcome component는 `<h1>Hello, Sara</h1>`element를 반환한다. 
4. React DOM은 효과적으로 <h1>Hello, Sara</h1>에 맞추어 DOM을 업데이트 한다.

주의
> component의 이름은 항상 맨 앞글자는 대문자로 작성 해야한다.

#### Composing Components(컴포넌트를 만들다.)
- component는 출력시 다른 component들을 참조 한다. 
- App이라는 하나의 컴포넌트로 추상화한다. 
- 버튼, 폼, 다이얼로그등 까지 모든것들을 컴포넌트로 표현한다.

~~~javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
~~~

일반적으로 새로운 리엑트 앱에는 가장 상위에 Single App Component가 존재 한다. 그러나 React을 기존 응용 프로그램에 통합하는 경우, Button 같은 작은 component에서 서서히 뷰 계층 구조의 최상위를 향해 작업을 수행 할 수 있습니다.

#### Extracting Components(구성요소 추출)

- Components를 작은 Components로 나누는 것을 두려워 하지 말라.

~~~javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
~~~

이 component는 중첩으로 인해 변경하기가 까다로울 수 있다. 각각의 부분을 재사용하기도 어렵습니다. 여기에서 몇 가지 구성 요소를 추출해 봅시다. (Avatar / UserInfo / Comment)

~~~javascript
function Comment(props) {
  return (
    <div className="Comment">
     <UserInfo user= {props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

function Avatar(props){
  return( <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
          />
         );
}

function UserInfo(props){
   return (<div className="UserInfo">
       <Avatar user={props.user} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
    </div>
   );
}
~~~

component를 작게 나누는 것이 비효율 적으로 보일 수 있지만 재사용 측면에서는 좋다. 현재 나눈 Avatar / UserInfo component는 나중에 재사용 할수 있다는 점에서 굉장히 좋다.


#### Props are Read-Only (props는 읽기 전용 이다.)
- component를 함수로 선언하든, 클래스로 선언하든 상관 없이 props를 수정 하면 안된다.
- React 는 굉장히 유연 하지만 엄격한 룰이 있습니다. 모든 React component는 props에 대해 순수한 함수와 같이 작동 해야한다.
- 동적으로 변하는 ui를 해결하기 위해 state가 필요하다.




## 4. State and Lifecycle
- 우리가 UI를 업데이트 할수 있는 방법은 ReactDOM.render()을 다시 호출하여 렌더링된 output을 바꾸는 일입니다.

~~~javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
~~~


Clock component로 추출이 가능 합니다. 하지만 이 Clock component는 한가지 요구 사항을 빼먹었습니다. **초마다 다시 렌더링 해주어야 하는 것입니다.**
~~~javascript
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
~~~

이것을 구현 하기 위해 `state`가 필요한 것입니다. state는 props와 닯아 있지만 component에 의해 완전히 제어 됩니다.


#### Converting a Function to a Class
- 우선 ES6의 클래스 형태로 바꾸어야 합니다.
~~~javascript
class Clock extends React.Component{
  
  render(){
    return (
      <div>
        <h1>Hello, world!!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
~~~


#### Adding Local State to a Class
- 우리는 props를 state로 바꾸는데 3가지 단계를 거친다.

1단계 render 메소드의 `this.props.date` 를 `this.state.date`로 바꾼다.
~~~javascript
class Clock extends React.Component{
  
  render(){
    return (
      <div>
        <h1>Hello, world!!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
~~~

2단계 클래스의 constructor에 초기화된 `this.state` 를 추가한다. 
~~~javascript
class Clock extends React.Component{
  // constructor에 props를 꼭 전달해 주고 super(props)을 통해 상위 component에 전달해 주어야 한다.
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }
  
  render(){
    return (
      <div>
        <h1>Hello, world!!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
~~~

3단계 넘겨주는 date props를  `<Clock />`에서 삭제한다.
~~~javascript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
~~~

#### Adding Lifecycle Methods to a Class (클래스에 라이프 사이클 메소드를 추가 할수있다.)

- 시계가 DOM에 처음 렌더링 될 때마다 타이머를 설정하려고합니다. 이것을 React에서 "mount"라고합니다. 또한 Clock에서 생성 된 DOM이 제거 될 때마다 해당 타이머를 지우고 싶습니다. 이것을 React에서 "unmount"라고합니다.

- 우리는 component class에 특별한 메소드를 선언하여 `mount`,`unmount` 때마다 실행 시킬수 있다. 

~~~javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  //componentDidMount(), componentWillUnmount()메소드를 lifecycle hooks 라 부른다.
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
~~~
`componentDidMount()` lifecycle hook은 component의 ouput이 모두 DOM에 rendering 된 후에 실행된다. 이곳은 타이머를 셋팅하기에 좋은 장소이다.

~~~javascript
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
~~~

`this.props`는 React 자신에 의해 setting 되며, `this.state`는 특별한 의미를 가진다. 만약 당신이 보여지는 output에 사용하지 않는 어떤것을 저장하는 것이 필요하면 class에 추가적인 field를 추가할수 있다.

`componentWillUnmount ()` lifecycle hook에서 타이머를 종료합니다.
~~~javascript
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
~~~

마지막으로 우리는 매 초마다 동작할 `tick()` 메소드를 구현 합니다. 이것은 `this.setState()`을 사용하여 component의 state를 update 할 것입니다. 

~~~javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
~~~

위 예제가 어떻게 돌아가는지 확인해 보자

> 1) `<Clock />` 이 ReactDOM.render()메소드로 전달 되고 React는 `Clock` component의 생성자를 부른다. 이때 Clock은 현재 시간을 나타내야 하고, 이것은 this.state를 통해 초기화 되어있다.
> 2) React는 Clock component의 render()메소드를 부른다. 다음으로 React는 시계의 렌더링 output과 일치 하도록 DOM을 업데이트 한다.
> 3) DOM에 Clock의 output이 삽입되고 React는 `componentDidMount()` lifecycle hook을 호출한다. 그 안에서 `tick()`메소드를 매초마다 호출한다.
> 4) 매 초마다  `tick()`메소드 호출한다. 그때 마다 `setState()`를 호출하여 현재 시간을 포함하는 객체를 update시킨다. `setState()`를 호출한 덕분에 React는 상태의 변화를 알수 있으며 그때 마다 계속 `render()`를 다시 호출한다. 이 때는 this.state.date 정보가 바뀌어 있기 때문에 수정된 시간을 rendering 할수 있다.
> 5) Clock 구성 요소가 DOM에서 제거 된 경우, React는 componentWillUnmount () lifecycle hook을 호출하여 타이머가 중지다시 렌더링 할 준비를 합니다.


#### Using State Correctly
- `setState()`를 사용하기위해 알아야할 3가지가 있다. 

- Do Not Modify State Directly(바로 state를 변경 하지 말라.)
~~~Javascript
// Wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});
~~~
당신은 오직 constructor에서만 this.state를 할당 할수 있습니다.

- State Updates May Be Asynchronous(state의 update는 아마 비동기 일것이다.)

this.props 및 this.state는 비동기 적으로 업데이트 될 수 있으므로 다음 state를 계산할 때 해당 값을 신뢰해서는 안됩니다.

~~~Javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});


// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
~~~

이 함수는 prevState를 첫번째 인자로 받고 prop가 update에 적용 되었을때 두번째 인자로 받습니다.

- State Updates are Merged (state의 수정은 병합 되야 함)

`setState()`을 부를 때, React는 현재 상태가 들어있는 당신이 제공한 객체를 병합한다.

만약 당신의 state에 여러가지 독립적인 변수들이 포함되어 있다면 당신은 해당 state를 `setState()`을 호출하므로써 개별적으로 업데이트 할수 있다 
~~~Javascript
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
  
  
   componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
~~~

#### The Data Flows Down
- 부모 Component는 자식 Components가 어떤 상태를 가지고 있는지 알수 없으며 함수 또는 클래스로 정의 되었는지에 대한 부분도 신경 쓸 수 없다. 이것은 state가 지역 변수이거나 캡슐화되었다고 불리는 이유입니다. state를 소유하고 있거나 설정하는 Components 이외에는 아무도 access 할수 없습니다. 하위 Component로 데이터를 보낼 때에는 props로 전달 하면 됩니다.

~~~Javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
~~~

## Handling Events

- React의 이벤트의 이름은 camelCase 방식으로 되어있다.
- JSX에 {}의 형태로 이벤트 핸들러를 전달하면 된다.

~~~Javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
~~~

- 또 다른 차이점은 React의 기본 동작을 막기 위해 false를 반환 할 수 없다는 것입니다. `preventDefault`를 명시 적으로 호출해야합니다. 예를 들어 일반 HTML을 사용하면 새 페이지를 여는 기본 링크 동작을 막기 위해 다음과 같이 작성할 수 있습니다.

html
~~~Javascript
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
~~~

react
~~~Javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
~~~


기본예제
~~~Javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
~~~
> 당신은 JSX에서 `this`의 의미를 조심해야 합니다. javascript에서는 메소드에서 기본적인 this가 바인딩 되지 않습니다. bind를 까먹고 this.handleClick을 이벤트로 전달한다면 this에는 handleClick 메소드가 없어 undefined를 리턴 할 것입니다.

