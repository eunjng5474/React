# 시작하기

## React 프로젝트 생성

- `npx create-react-app [프로젝트명]`
- `cd [프로젝트명]`

## 시작

- `npm start`

## 배포

- `npm run build`
- `npx serve -s build`

# 리액트 입문

## 컴포넌트 만들기

- Hello.js, App.js

## JSX

- JSX : 리액트에서 생김새를 정의할 때 사용하는 문법
- 리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel이 JSX를 JavaScript로 변환해줌
- 인라인 스타일은 객체 형태로 작성해야 하며, camelCase 형태로 네이밍
- CSS class 설정시 `class=`가 아닌 `className=`으로 설정

## props를 통해 컴포넌트에게 값 전달하기

- App.js, Hello.js
- 컴포넌트 태그 사이에 넣은 값 조회시 `props.children` 조회 - Wrapper.js

## 조건부 렌더링

- 특정 조건에 따라 다른 결과물 렌더링
- `isSpecial`
  - 삼항 연산자, && 연산자 사용

## useState를 통해 컴포넌트에서 바뀌는 값 관리

- Counter.js
- `on이벤트이름={실행할 함수}`형태로 설정
  - `onClick={onIncrease()}`와 같이 함수를 실행하면, 렌더링되는 시점에서 함수가 호출되기 때문에 함수를 실행하면 안된다. 함수타입의 값을 넣어야 함
- 상태(state) : 컴포넌트에서 동적인 값
  - 리액트의 `useState`함수를 통해 컴포넌트에서 상태 관리
  - `const [number, setNumber] = useState(0);`와 같이 사용
    - 상태의 기본값을 파라미터로 넣어서 호출하면 배열이 반환
    - [현재 상태, Setter 함수]
  - 함수형 업데이트 : `setNumber(preNumber => preNumber - 1);`
    - 다음 상태를 파라미터로 넣어준 것이 아니라, 업데이트 하는 함수를 파라미터로 넣어줌
    - 컴포넌트 최적화할 때 사용

## input 상태 관리하기

- InputSample.js
- `useState` 사용
  - 이벤트에 등록하는 함수에서는 이벤트 객체 e를 파라미터로 받아와서 사용할 수 있는데, 이 객체의 `e.target`은 이벤트가 발생한 DOM인 input DOM을 가리킨다. `e.target.value`를 조회하면 현재 input에 입력한 값 확인 가능

### 여러 개의 input 상태 관리

- input에 name을 설정하고, 이벤트 발생시 이 값을 참조하는 방식
- useState에서는 문자열이 아니라 객체 형태의 상태를 관리해야 한다.
- 리액트 상태에서 객체를 수정할 때, `inputs[name] = value;`와 같이 직접 수정하는 것이 아니라,
  새로운 객체를 만들어서 새로운 객체에 변화를 주고, 상태로 사용해야 한다. -> 불변성을 지킨다.

## useRef로 특정 DOM 선택

- 리액트를 사용하는 프로젝트에서 DOM을 직접 선택해야 할 때, `ref` 사용.
  함수형 컴포넌트에서 ref 사용할 때는 `useRef`라는 Hook 함수를 사용
- `useRef()`를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM에 `ref`값으로 설정하면, Ref 객체의 `.current`값은 우리가 언하는 DOM을 가리킨다.

## 배열 렌더링하기

- UserList.js
- 동적인 배열을 렌더링할 때 자바스크립트 배열의 내장함수 `map()` 사용
- 리액트에서 배열 렌더링시 `key`라는 props를 고유값으로 설정해야 한다.
- 배열 안의 원소가 가지고 있는 고유한 값이 없다면 콜백함수의 두번째 파라미터 index를 key로 사용

```javaScript
<div>
  {users.map((user, index) => (
    <User user={user} key={index} />
  ))}
</div>
```

- 배열 업데이트 시 key가 없다면 원하는 위치에 값이 삽입되는 것이 아니라, 기존 값들이 바뀌고 맨 마지막에 삽입된다.
  key가 있다면 수정되지 않는 기존 값은 그대로 두고 원하는 곳에 내용 삽입/삭제

## useRef로 컴포넌트 안의 변수 만들기

- useRef : DOM 선택, 컴포넌트 안에서 조회 및 수정할 수 있는 변수 관리
  - 관리하는 변수의 값이 바뀐다고 해서 컴포넌트가 리렌더링 되지 않음.
  - 리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고 나서 렌더링 이후로 업데이트 된 상태를 조회할 수 있지만, useRef로 관리하는 변수는 설정 후 바로 조회 가능
  - 다음 값 관리 가능
    - setTimeout, setInterval을 통해 만들어진 id
    - 외부 라이브러리를 사용하여 생성된 인스턴스
    - scroll 위치
- `useRef()`를 사용할 때 파라미터를 넣어주면, 이 값이 `.current`의 기본값이 된다.
  - 이 값을 수정/조회할 때 `.current`값 수정/조회

## 배열에 항목 추가/제거/수정

### 항목 추가

- 불변성을 지키기 위해 push, slice, sort 등의 함수 사용X
- 불변성을 지키면서 배열에 새 항목 추가하는 방법
  - 1. spread 연산자 사용
    - `setUsers([...users, user])`
  - 2. concat 함수 사용
    - 기존 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만들어준다.
    - `setUsers(users.concat(user))`

### 항목 제거

- User 컴포넌트의 삭제 버튼이 클릭될 때 `user.id` 값을 앞으로 props로 받아올 `onRemove` 함수의 파라미터로 넣어서 호출해야 한다.
  onRemove 함수는 UserList에서도 전달 받고, 이를 User 컴포넌트에게 전달한다.
- 불변성을 지키며 특정 원소를 배열에서 제거하기 위해서는 `filter` 배열 내장 함수를 사용하는 것이 편리하다.

### 항목 수정

- 배열의 불변성을 유지하면서 배열을 업데이트할 때도 `map`함수 사용 가능

## useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정

- `useEffect` 사용 시 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열(deps)을 넣는다.
  만약 `deps` 배열을 비우면 컴포넌트가 처음 나타날 때만 useEffect에 등록된 함수가 호출된다.
- `useEffect`에서는 `cleanup` 함수 반환 가능. `deps`가 비어있는 경우 컴포넌트가 사라질 때 `cleanup` 함수가 호출된다.
- 주로 마운트 시에 하는 작업들
  - `props`로 받은 값을 컴포넌트의 로컬 상태로 설정
  - 외부 API 요청(REST API...)
  - 라이브러리 사용(D3, Video.js, ...)
  - setInterval을 통한 반복작업 혹은 setTimeout을 통한 작업 예약
- 언마운트 시에 하는 작업들

  - setInterval, setTimeout을 사용하여 등록한 작업들 clear(clearInterval, clearTimeout)
  - 라이브러리 인스턴스 제거

- deps에 특정 값을 넣으면, 컴포넌트가 처음 마운트 될 때도 호출이 되고, 지정한 값이 바뀔 때도 호출된다.
- `userEffect`안에서 사용하는 상태나 props가 있다면 `useEffect`의 `deps`에 넣어줘야 한다. 만약 넣지 않으면 `useEffect`에 등록한 함수가 실행될 때 최신 props/상태를 가리키지 않는다.
- deps 파라미터를 생략하면 컴포넌트가 리렌더링될 때마다 호출된다.
- 리액트 컴포넌트는 기본적으로 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링된다.

## useMemo를 사용하여 연산한 값 재사용하기

- `countActiveUsers`함수를 사용했을 때, users에 변화가 있을 때만 수를 세어야 하는데, input값이 바뀔 때도 컴포넌트가 리렌더링 되어 호출된다.
  -> `useMemo`라는 Hook 함수를 사용하여 성능 최적화
- `useMemo`의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를, 두번째 파라미터에는 deps 배열을 넣는다.
  이 배열에 넣은 내용이 바뀌면 등록한 함수를 호출해서 값을 연산하고, 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용한다.

## useCallback을 사용하여 함수 재사용하기

- `useMemo`는 특정 결과값을 재사용할 때 사용하고, `useCallback`은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용한다.
- `onCreate`, `onRemove`, `onToggle` 함수는 컴포넌트가 리렌더링될 때마다 새로 만들어진다.
  한번 만든 함수를 필요할 때만 새로 만들고 재사용하기 위해서, `useCallback` 사용
- 이때, 함수 안에서 사용하는 상태 혹은 props가 있다면 꼭 `deps` 배열안에 포함시켜야 한다.
  만약 넣지 않으면 함수 내에서 해당 값을 참조할 때 가장 최신값을 참조할 것이라고 보장할 수 없다.
  props로 받아온 함수가 있다면 이 역시 넣어줘야 한다.

## React.memo를 사용한 컴포넌트 리렌더링 방지

- React.memo : 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링하도록 설정 가능
- users 배열이 바뀔 때마다 onCreate, onToggle, onRemove가 새로 만들어지기 때문에, User 중 하나라도 수정하면 모든 User들이 리렌더링되고, CreateUser도 리렌더링 된다.
- 이를 최적화하기 위해서, deps에서 `users`를 지우고, 함수들에서 현재 `useState`로 관리하는 `users`를 참조하지 않게 한다. 이를 위해 함수형 업데이트를 하게 되면, `setUsers`에 등록하는 콜백함수의 파라미터에서 최신 `users`를 참고할 수 있기 때문에 deps에 `users`를 넣지 않아도 된다.
  - `useCallback`, `useMemo`, `React.memo`는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 사용
  - React.memo에서 두번째 파라미터에 `propsAreEqual`이라는 함수를 통해 특정 값들만 비교하는 것도 가능하다. 하지만 함수형 업데이트로 전환하지 않았는데 users만 비교한다면 onToggle과 onRemove에서 최신 users 배열을 참조하지 않아 오류 발생 가능
    ```javaScript
      export default React.memo(
        UserList,
        (prevProps, nextProps) => prevProps.users === nextProps.users
      )
    ```

## useReducer를 사용하여 상태 업데이트 로직 분리하기

- `useState` 대신 `useReducer`라는 Hook 함수를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리할 수 있다.
  - reducer : 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
    ```javaScript
      function reducer(state, action) {
        // 새로운 상태를 만드는 로직
        // const nextState = ...
        return nextState
      }
    ```
    - reducer에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 되며, `action`은 업데이를 위한 정보를 가지고 주로 type 값을 지닌 객체 형태로 사용한다.
- useReducer의 사용법
  - `const [state, dispatch] = useReducer(reducer, initialState)`
  - `state`: 앞으로 컴포넌트에서 사용할 수 있는 상태
  - `dispatch({ type: 'INCREMENT' })` : 액션 발생시키는 함수
- App.js
  - onChange : `CHANGE_INPUT`이라는 액션 객체를 사용하여 `inputs` 상태 업데이트.
    - `reducer`함수에서 새로운 상태를 만들 때 불변성을 지키기 위해 spread 연산자 사용
- 컴포넌트에서 관리하는 값이 하나이고, 그 값이 단순한 숫자, 문자열 또는 boolean 값이라면 `useState`로 관리하는 것이 편하다.
  - `const [value, setValue] = useState(true)`
- 컴포넌트에서 관리하는 값이 여러 개로 상태의 구조가 복잡해진다면 `useReducer`로 관리하는 것이 편해질 수 있다.

## 커스텀 Hooks 만들기

- 커스텀 Hooks를 만들어 반복되는 로직 쉽게 재사용하기
  - src 디렉토리에 hooks라는 디렉토리를 만들고, useInputs.js 파일 생성
    - 커스텀 Hooks를 만들 때 보통 `use`로 시작하는 파일 만들고 그 안에 함수 작성
  - `useState`, `useEffect` 등 Hooks를 사용해 원하는 기능 구현 후 컴포넌트에서 사용하고 싶은 값 반환

## Context API를 사용한 전역값 관리

- UserList 컴포넌트는 onToggle, onRemove를 전달하기만 하고, 함수를 직접 사용하지 않는다.
- 리액트의 Context API를 사용하면 프로젝트 안에서 전역적으로 사용할 수 있는 값을 관리할 수 있다.
- Context API를 사용해 새로운 Context 만드는 방법
  - `conts UserDispatch = React.createContext(null)`
    - `createContext`의 파라미터에는 Context의 기본값 설정
  - Context 안의 Provider라는 컴포넌트를 통해 Context의 값 정하기
    - `<UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>`
  - Provider에 의해 감싸진 컴포넌트는 Context의 값을 다른 곳에서 조회해서 사용 가능
    - `export const UserDispatch = React.createContext(null)`
    - `impoty { UserDispatch } from './App'`
- `useReducer`를 사용하면 Context API를 사용해 전역적으로 사용할 수 있게 해주어 코드의 구조가 깔끔해질 수 있다.

## Immer를 사용한 더 쉬운 불변성 관리

- Immer를 사용하면 상태를 업데이트할 때, 불변성 관리를 대신해준다.
- `npm add immer`

```javaScript
  import produce from 'immer'

  const state = {
    number: 1,
    dontChangeMe: 2
  }

  const nextState = produce(state, draft => {
    draft.number += 1
  })

  console.log(nextState)
  // { number: 2, dontChangeMe: 2}
```

- Immer를 사용했을 때 간단해지는 업데이트가 있고, 코드가 길어지는 업데이트가 있기 때문에 선택해서 사용
- 함수형 업데이트를 할 때 Immer를 사용하면 상황에 따라 더 편하게 코드 작성 가능
- Immer는 편하지만, 성능적으로 느리다.

```javaScript
const todo = {
  text: 'Hello',
  done: false
}

const updater = produce(draft => {
  draft.done = !draft.done
})

const nextTodo = updater(todo)

console.log(nextTodo)
// { text: 'Hello', done: true }
```

- `produce`가 반환하는 것이 업데이트 함수가 되기 때문에 `useState`의 업데이트 함수를 사용할 때 다음과 같이 구현할 수 있다.

```javaScript
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
})

const onClick = useCallback(() => {
  setTodo(
    produce(draft => {
      draft.dome = !draft.done
    })
  )
}, [])
```

## 클래스형 컴포넌트

- 클래스형 컴포넌트에서는 `render()` 메서드가 있어야 하며, 이 메서드에서 렌더링하고 싶은 JSX 반환
  `props` 조회할 때는 `this.props` 조회
- `defaultProps`를 설정할 때는 클래스 내부에 `static` 키워드와 함께 선언 가능
- 함수형 컴포넌트에서 특정 작업 실행시 컴포넌트 안에 const로 선언하였지만, 클래스형 컴포넌트의 경우 render 함수 내부에 선언하지 않고 클래스 안에 커스텀 메서드를 선언한다.
  - 메서드 : 클래스 내부에 종속된 함수. 보통 `handle...`로 이름을 짓는다.
- `this.handleIncrease`와 같이 사용하면 undefined

  - 만든 메서드를 이벤트로 등록하는 과정에서 각 메서드와 컴포넌트 인스턴스의 관계가 끊기기 때문
  - 해결 방법

    - 1. 클래스의 생성자 메서드 `constructor`에서 `bind` 작업
      - 함수의 `bind`를 사용하면 해당 함수에서 가리킬 `this`를 직접 설정할 수 있다.
      - `super(props)` 호출 : 이 클래스가 컴포넌트로서 작동할 수 있도록 해주는 Component쪽에 구현되어 있는 생성자 함수를 먼저 실행해주고, 작업 진행

    ```javaScript
      class Counter extends Component {
        constructor(props) {
          super(props)
          this.handleIncrease = this.handleIncrease.bind(this)
        }
        handleIncrease() {
        }

        render() {
          return (
            <div>
              <button onClick={this.handleIncrease}>+1</button>
            </div>
          )
        }
      }
    ```

    - 2. 커스텀 메서드를 선언할 때 화살표 함수 문법 사용 (class-properties 문법 사용)
      - `constructor` 부분 없이 `handleIncrease() => {}`
      - 정식 자바스크립트 문법은 아니지만, CRA로 만든 프로젝트에 적용되어있는 문법

- 클래스형 컴포넌트에서 상태를 관리할 때 `state` 사용
  - `state` 선언 시 `constructor` 내부에서 `this.state` 설정
    - 클래스형 컴포넌트의 `state`는 객체형태여야 하며, `render` 메서드에서 조회 시 `this.state`
  ```javaScript
    class Counter extends Component {
      constructor(props) {
        super(props)
        this.state = {
          counter: 0
        }
      }
    }
    // ...
    render() {
      return (
        <div>
          <h1>{this.state.counter}</h1>
        </div>
      )
    }
  ```
- 상태 업데이트 시 `this.setState` 사용
  ```javaScript
    state = {
      counter: 0
    }
    handleIncrease = () => {
      this.setState({
        counter: this.state.counter + 1
      })
    }
  ```
- `setState`의 함수형 업데이트

  ```javaScript
    // 1. 1 더하는 작업은 두 번이지만, 실제로 2가 더해지지 않음
    // setState를 한다고 해서 상태가 바로 바뀌는게 아니라, 비동기적으로 업데이트 됨
    handleIncrease = () => {
      this.setState({
        counter: this.state.counter + 1
      })
      this.setState({
        counter: this.state.counter + 1
      })
    }
    // 상태가 업데이트 되고 나서 어떤 작업을 하고싶다면, setState의 두번째 파라미터에 콜백함수 넣을 수 있다.
    handleIncrease = () => {
      this.setState(
        {
          counter: this.state.counter + 1
        },
        () => {
          console.log(this.state.counter)
        }
      )
    }

    // 2. 함수형 업데이트 사용시 2씩 더해짐
    handleIncrease = () => {
      this.setState(state => ({
        counter: state.counter + 1
      }))
      this.setState(state => ({
        counter: state.counter + 1
      }))
    }
  ```

## LifeCycle Method

- 생명주기 메서드 : 컴포넌트가 브라우저상에 나타나고, 업데이트 되고, 사라질 때 호출되는 메서드
- 클래스형 컴포넌트에서만 사용 가능
- 마운트될 때 발생하는 생명주기 메서드
  - counstructor, getDerivedStateFromProps, render, componentDidMount
- 업데이트
  - getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate
- 언마운트
  - componentWillUnmount
