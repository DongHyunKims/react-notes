## React Get Started 2

### 1. Conditional Rendering(조건 렌더링)
- Conditional Rendering은 자바스크립틔의 조건문과 같은 방법으로 동작한다.
- 자바스크립트의 `if`문과 같은 조건문 또는 조건 연사자를 사용하여 현재 상태의 elemenet를 생성하고  react는 그것에 맞추어 UI를 업데이트 한다.

두가지 조건의 컴포넌트가 존재 한다.
~~~javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
~~~

우리는 로그인 여부에 따라 서로 다른 `Greeting` component를 생성한다.

~~~javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
~~~

#### 1-1. Element Variables

변수를 사용하여 elements를 저장 할수 있다. 이것은 part에 맞는 component를 조건에 맞게 렌더링 하는데 도움을 준다.  

~~~javascript
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
~~~

우리는 `LoginControl` 라고 불리는 statefull component를 생성한다.

현재 상태에 따라 `<LoginButton />` 또는 `<LogoutButton />`를 렌더링 한다. 또한 `<Greeting />` component도 rendering 한다.

~~~javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    //상태 값에 따라 button이라는 변수에 component를 저장해서 rendering 한다.
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
~~~

#### 1-2. Inline If with Logical && Operator

- JSX에서 `{}`로 묶어 모든 표현식을 사용 할수 있다.
- javascript의 `&&`을 사용할수 있다.

~~~javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
~~~

javascript로 인해 이러한 표현식을 사용 할수 있다. `true && expression` 과 같이 `&&`은 왼쪽의 조건이 true이면 뒤에 있는 내용을 실행 시키는 특성이 있다. 만약 false이면 아무런 동작을 하지 않는다.

그렇기 때문에 조건이 `true`이면 오른쪽의 `expression`을 실행 시키며 `false`이면 React는 `expression`을 무시하고 skip한다.

#### 1-3. Inline If-Else with Conditional Operator
- 자바스트립트의 `condition ? true : false`와 같은 삼항 연산자도 사용할 수 있다.

~~~javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
~~~

이렇게 사용하는 방법도 있지만 조건이 너무 복잡하다면 component를 추출하는 것이 좋다.

#### 1-4. Preventing Component from Rendering

- 드문 케이스 이지만 당신이 다른 component로 부터 rendering된 component를 숨기고 싶을 경우가 있다. 이때는 `null`을 return 해주면 된다.
~~~javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
~~~

`warn`이라는 props에 의해 `<WarningBanner />` 될수 있다. 만약 이 props가 `false`이면  compoenent를 rendering 하지 않는다.
`null`을 return 하게 되도 component lifecycle에 아무런 영향을 주지 않는다. `componentWillUpdate` 및 `componentDidUpdate`는 여전히 호출된다.

### 2. Lists and Keys

#### 2-1 Rendering Multiple Components
- 당신은 `{}`을 사용하여 elements collections(배열등..)를 JSX 문법안에 넣을 수 있다.

~~~javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
~~~
`<li>` element를 map 함수를 이용하여 배열을 만든후 해당 `listItems` 배열을 `{}`을 통해 JSX안에서 사용 할수 있다.

이러한 코드를 실행하면 경고가 제공 될 것이다. `key`는 element list를 만들때 포함해야하는 특수한 문자열 attribute 이다. 


#### 2-2 Keys
- key는 items가 바뀌거나, 추가, 삭제 되었을 때 React의 식별을 도와준다. 

~~~javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
~~~

key를 선택 하는 가장 좋은 방법은 uinque한 문자열을 사용하는 것이 가장 좋다.
~~~javascript
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
~~~

만약 해당 item의 고유한 키가 없다면 최후의 방법으로 index를 key로 사용할 수 있다.
~~~javascript
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
~~~

만약 item을 다시 정렬 할 때, index를 key로 선정하면 느리기때문에 index를 key로 선정하는 것을 추천하지 않는다 


#### 2-3 Extracting Components with Keys
- key는 주변 배열의 context에만 의미가 있다.
- 만약 `ListItem` component를 추출하였다면 현재 array collection에 들어가 있는 `<ListItem />`에 key를 적용 시켜야지 `ListItem`안에 있는 `<li>`에 적용 시키면 안된다.

**Example: Incorrect Key Usage**
~~~javascript
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
~~~

**Example: Correct Key Usage**
~~~javascript
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
~~~


#### 2-4 Keys Must Only Be Unique Among Siblings
- 배열 내에서 사용되는 key는 형제 component 또는 element 간에 고유 하다. 하지만 global 적으로 고유할 필요는 없다. 현재 array context안에서만 고유하면 된다.

~~~javascript
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  //content의 div key와 sidebar의 li key는 같을 수 있다.
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
~~~

key는 props로 전달 되지 않는다. 만약 동일한 값이 필요다면 다른 속성으로 전달 해야한다.

~~~javascript
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
~~~

#### 2-4 Embedding map() in JSX
- map 함수는 JSX 문법 안에서도 사용이 가능하다.

~~~javascript
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
~~~

