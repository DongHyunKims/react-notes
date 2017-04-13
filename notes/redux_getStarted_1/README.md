## Redux Get Started

### 1. action 
- 액션은 application에서 store로 보내는 객체 형태의 데이터 이다. 
- `store.dispatch()` 메소드를 통해 action을 보낼수 있다.

action 예제
~~~Javascript
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
~~~

- action은 자바스크립트 객체이다. 원하는 이벤트(데이터 조작?)를 실행 시키기 위해서 action에는 반드시 type 속성이 필요하다. 
- 만드는 application이 커지게 되면 타입을 별도의 module로 분리해 관리 할수 있다.

type module 예제
~~~Javascript
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
~~~

> 보일러플레이트에 대한 설명
> 액션 타입 상수를 반드시 별도의 파일에 정의할 필요는 없으며, 심지어 정의하지 않아도 된다. 작은 프로젝트에서는 액션 타입으로 그냥 문자열을 쓰는게 쉽다. 하지만 코드베이스가 커지면 상수를 정의해서 얻을 수 있는 장점이 있다. 코드베이스를 깨끗하게 유지하기 위한 실용적인 팁들을 보일러플레이트 줄이기에서 더 읽을 수 있다.


- `type`외의 action 객체의 구조는 마음데로 정의 할수 있다.
- 각각의 action 객체에는 적은 데이터를 전달하는 것이 좋다. 
~~~Javascript
{
  type: COMPLETE_TODO,
  index: 5
}
~~~

### 2. action creators 
- action creators는 action 객체를 만드는 함수이다.
- Redux의 action creators은 flux와 다르게 action객체만 반환한다.

~~~Javascript
//Flux
function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TODO,
    text
  }
  dispatch(action)
}

//Redux
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
~~~
- Redux의 action creators와 같이 action객체만 전달하면 action creators 함수를 조금더 쉽게 이식하고 테스트 하게 해준다. 

~~~Javascript
// 실제 action 객체를 보내기 위해서는 dispatch를 실행한다.
dispatch(addTodo(text))
dispatch(completeTodo(index))

// 또는 자동으로 action객체를 보내주는 함수를 만들고 바로 호출한다.
const boundAddTodo = (text) => dispatch(addTodo(text))
const boundCompleteTodo = (index) => dispatch(completeTodo(index))

boundAddTodo(text)
boundCompleteTodo(index)
~~~
- `dispatch()` 메소드는 `store.dispatch()`로 접근 해야하지만 `react-redux`모듈의 `connect()`와 같은 helper을 통해 호출시 좀더 쉽게 접근이 가능하다.
- 여러 액션 생산자를 `dispatch()`에 바인드하기 위해 `bindActionCreators()`를 사용한다.


### 소스코드
#### actions.js
~~~Javascript
/*
 * action type
 */
export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 외부로 보낼 action 객체
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * 액션 생산자
 */
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
~~~

### 2. reducer
- Reducer은 함수이다.
- action객체를 받아 state를 바꾸는 역할을 한다.
- Redux로 구성된 application의 모든 state는 하나의 store에 저장된다.
- 데이터와 UI를 분리하기위해 고안 되었다.

상태 객체 설정 예제
~~~Javascript
{
  visibilityFilter: 'SHOW_ALL',
  todos: [{
    text: 'Consider using Redux',
    completed: true,
  }, {
    text: 'Keep all state in a single tree',
    completed: false
  }]
}
~~~

#### 2-1. action 다루기
- Reducer은 이전 state와 action을 전달인자로 받은 후 다음 state를 반환한다.
- Reducer은 순수 해야한다.
~~~Javascript
(previousState, action) => newState
~~~

주의!
> 인수들을 변경(mutate)하기;
> API 호출이나 라우팅 전환같은 사이드이펙트를 일으키기;
> Date.now()나 Math.random() 같이 순수하지 않은 함수를 호출하기.

- 인수가 주어지면 state 값을 새롭게 만들어 반환 하는 것이 중요하다. (immutable)
- 사이드 이펙트도 없어야 하고 API 호출도 안되고 변경도 안된다.
- Redux는 처음에 리듀서를 undefined 상태로 호출한다. 이때 초기 상태를 반환해야 한다.

Reducer 예제
~~~Javascript
import { VisibilityFilters } from './actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // 지금은 아무 액션도 다루지 않고
  // 주어진 상태를 그대로 반환합니다.
  return state
}

//es6
function todoApp(state = initialState, action) {
  // 지금은 아무 액션도 다루지 않고
  // 주어진 상태를 그대로 반환합니다.
  return state
}
~~~

- `SET_VISIBILITY_FILTER` action type을 처리 해야 한다. 우리는 `visibilityFilter`를 바꾸는 일만 하면 된다.

~~~Javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return Object.assign({}, state, {
      visibilityFilter: action.filter
    });
  default:
    return state
  }
}
~~~

주의!
> - state를 변경하지 않았다. `Object.assign()`을 통해 복사본을 만들었다. 
> - `Object.assign(state, { visibilityFilter: action.filter })` 라고 작성해도 원본 state 값이 바뀌기 때문에 이렇게 작성하면 안된다. 반드시 첫번째 인수로 빈 객체를 전달해야 한다. ES7에서는 object spread syntax을 써서 `{ ...state, ...newState }`로 작성할수 있다.
> - default 케이스에 대해 이전의 state를 반환했다. 알 수 없는 액션에 대해서는 이전의 state를 반환하는것이 중요하다. (default return 을 해주는 것이 중요)
> - Object.assign에 관하여
>   Object.assign()은 ES6의 일부이지만, 대부분의 브라우저에서 구현되지 않았다. polyfill을 사용하거나 Babel 플러그인이나 _.assign()같이 다른 라이브러리의 헬퍼를 사용해야 한다.


#### 2-2. 더 많은 action 다루기
- `ADD_TODO`도 다룰수 있도록 확장 한다.

여러개의 action을 다루는 예제
~~~javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return Object.assign({}, state, {
      visibilityFilter: action.filter
    });
  case ADD_TODO:
    return Object.assign({}, state, {
      todos: [...state.todos, {
        text: action.text,
        completed: false
      }]
    });    
  default:
    return state;
  }
}
~~~

- 위 예제에서도 볼수 있듯이 `[...state.todos,` 와 같이 새로운 배열을 만들어서 반환한다. 
- 새 todos는 이전의 todos의 끝에 새로운 할일 하나를 더 붙인 것과 같다.

할일 수정 action을 처리하는 예제
~~~javascript
case COMPLETE_TODO:
  return Object.assign({}, state, {
    todos: [
      ...state.todos.slice(0, action.index),
      Object.assign({}, state.todos[action.index], {
        completed: true
      }),
      ...state.todos.slice(action.index + 1)
    ]
  });
~~~
- 이전 state의 변경 없이 배열의 특정 할일만 수정하는 예제이다. 
- `React.addons.update`, `updeep`같은 헬퍼나 Immutable 같이 깊은 수정을 지원하는 라이브러리를 사용하면 더욱 쉽게 구현 할수 있다.
- `state`를 복사하기 전엔 그 안의 무엇에도 할당하지 말아야 한다는것을 꼭!! 기억하자.

#### 2-3. reducer 쪼개기

reducer 조합 예제
~~~javascript
function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TODO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return Object.assign({}, state, {
      visibilityFilter: action.filter
    });
  case ADD_TODO:
  case COMPLETE_TODO:
    return Object.assign({}, state, {
      todos: todos(state.todos, action)
    });
  default:
    return state;
  }
}
~~~
- `todos`가 `state`도 받지만 이건 그냥 배열이다! `todoApp`에서 action type이 `ADD_TODO` 과 `COMPLETE_TODO` 라면 todos에게 일을 위임한다. `todos`는 이것을 어떻게 수정할지 알고 있다. 이것을 리듀서 조합이라고 부르고, 이것이 Redux 앱을 만드는 기본 패턴이 된다.


리듀서 관리 예제
~~~javascript
function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TODO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
~~~

- initial state 도 필요 없다. 처음에 undefined가 주어지면 자식 리듀서들이 각각의 초기 상태를 반환한다.
- 각각의 자식 리듀서는 전체 상태에서 자신의 부분만을 관리한다. 모든 리듀서의 `state` 매개변수는 서로 다르고, 자신의 `state`만 관리한다.

- redux는 `combineReducers()`라는 유틸리티를 제공한다.  `combineReducers()`을 통해 쉽게 여러 자식 reducer를 관리 할수 있다. 

~~~javascript
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;

//위의 코드와 의미가 완전히 같은 코드이다.
export default function todoApp(state, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
~~~

- `combineReducers()`는 여러분의 리듀서의 이름을 key로 지정하고 value는 해당 리듀서의 return 된 결과를 하나의 객체로 합쳐 반환하는 함수이다.

주의!
> ES6을 이해하는 사용자를 위한 한마디
> combineReducers는 객체를 기대하기 때문에, 모든 최상위 리듀서들을 각기 다른 파일에 놓고 export한 다음 import * as reducers를 이용해 각각의 이름을 키로 가지는 객체를 얻을 수 있다.
> import { combineReducers } from 'redux';
> import * as reducers from './reducers';
> const todoApp = combineReducers(reducers);
> import *은 아직은 새로운 문법이기 때문에 이 문서에서는 혼동을 막기 위해 더 이상 사용하지 않겠지만, 커뮤니티의 예시들에서 만날수도 있다.


### 소스코드

#### reducers.js
~~~javascript
import { combineReducers } from 'redux';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TODO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;
~~~

### 3. 스토어
- 스토어는 데이터를 저장하고 관리 하는 역할을 한다.
> - 애플리케이션의 상태를 저장.
> - `getState()`를 통해 상태에 접근.
> - `dispatch(action)`를 통해 상태를 수정.
> - `subscribe(listener)`를 통해 리스너를 등록.

- Redux application은 **단 하나의 스토어** 만 가질수 있다는 것이 중요하다.
- 데이터를 다루는 로직을 쪼개고 싶다면, 여러개의 스토어 대신 `리듀서 조합`을 사용한다.

스토어 생성 예제
~~~javascript
import { createStore } from 'redux';
import todoApp from './reducers';

let store = createStore(todoApp);
~~~

- `createStore()` 함수에 두번째 인자를 주게 되면 초기값 설정이 가능하다.

~~~javascript
let store = createStore(todoApp, window.STATE_FROM_SERVER);
~~~

#### 3-1 액션 보내기

액션 보내기 예제
~~~javascript
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions';

// 초기 상태를 기록합니다.
console.log(store.getState());

// 상태가 바뀔때마다 기록합니다.
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// 액션들을 보냅니다.
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(completeTodo(0));
store.dispatch(completeTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// 상태 변경을 더 이상 받아보지 않습니다.
unsubscribe();
~~~

결과

<img src="http://i.imgur.com/zMMtoMz.png" />


### 소스 코드

#### index.js
~~~javascript
import { createStore } from 'redux';
import todoApp from './reducers';

let store = createStore(todoApp);
~~~


### 4. 데이터의 흐름
- Redux의 아키텍쳐는 엄격하게 단방향 데이터 흐름을 따라 전개된다.
- Redux application 데이터는 아래와 같이 4단계의 생명주기를 따른다.


**1. store.dispatch(action)를 호출합니다.**
- action 객체를 만들어 보내줍니다.
- store.dispatch(action)를 앱 내의 어디서나 호출할수 있다. 컴포넌트나 XHR 콜백, 심지어 일정한 간격으로 호출이 가능하다.

~~~javascript
 { type: 'LIKE_ARTICLE', articleId: 42 };
 { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Megan' } };
 { type: 'ADD_TODO', text: 'Read the Redux docs.'};
~~~

**2. Redux 스토어가 지정한 리듀서 함수들을 호출합니다.**
- 스토어는 리듀서에 현재의 state와 action의 두 가지 인수를 넘긴다.

~~~javascript
 // 애플리케이션의 현재 상태(할일 목록과 선택된 필터)
 let previousState = {
   visibleTodoFilter: 'SHOW_ALL',
   todos: [{
     text: 'Read the docs.',
     complete: false
   }]
 };

 // 실행되는 액션(할일 추가)
 let action = {
   type: 'ADD_TODO',
   text: 'Understand the flow.'
 };

 // 리듀서가 다음 상태를 반환함
 let nextState = todoApp(previousState, action);
~~~

- 리듀서는 다음 상태를 새롭게 반환하는 순수 함수이다.
- 같은 입력을 가지고 몇번을 호출하든지 같은 출력을 반환해야한다.
- API 호출이나 라우터 전환같은 사이드이펙트를 일으켜서는 안된다.

**3. 루트 리듀서가 각 리듀서의 출력을 합쳐서 하나의 상태 트리로 만듭니다.**
- Redux는 루트 리듀서에서 각각의 리듀서를 관리 하기위해 `combineReducers()` 헬퍼 함수를 제공한다.

~~~javascript
 function todos(state = [], action) {
   // Somehow calculate it...
   return nextState;
 }

 function visibleTodoFilter(state = 'SHOW_ALL', action) {
   // Somehow calculate it...
   return nextState;
 }

 let todoApp = combineReducers({
   todos,
   visibleTodoFilter
 });
~~~

- 액션을 보내면, `combineReducers`가 반환한 todoApp은 두 리듀서를 모두 호출한다.

~~~javascript
let nextTodos = todos(state.todos, action);
let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action);
~~~

- 두 결과를 합쳐 하나의 객체로 만들어서 반환한다.
~~~javascript
 return {
   todos: nextTodos,
   visibleTodoFilter: nextVisibleTodoFilter
 };
~~~

Tip!
> `combineReducers()`가 편리한 헬퍼 유틸리티이긴 하지만, 반드시 써야 하는건 아니다. 루트 리듀서를 직접 작성도 권장한다.

**4. Redux 스토어가 루트 리듀서에 의해 반환된 상태 트리를 저장합니다.**

- `store.subscribe(listener)`를 통해 등록된 모든 리스너가 불러내지고 이들은 현재 상태를 얻기 위해 `store.getState()`를 호출한다. 이제 새로운 상태를 반영하여 UI가 변경된다.

