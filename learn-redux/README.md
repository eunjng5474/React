# Redux

## 리덕스

- 컴포넌트들의 상태 관련 로직들을 다른 파일로 분리시켜 더욱 효율적으로 관리할 수 있으며, 글로벌 상태 관리도 쉽게 할 수 있다.

### Redux와 Context API의 차이

1. 미들웨어

- 리덕스로 상태 관리를 할 때, 리듀서 함수를 사용한다.
- 리덕스의 미들웨어를 사용하면 액션 객체가 리듀서에서 처리되기 전에 원하는 작업을 수행할 수 있다. 미들웨어는 주로 비동기 작업을 처리할 때 사용된다.

2. 유용한 함수와 Hooks

- Context API와 `useReducer`를 사용할 때는 Context를 새로 만들고, Context의 Provider 설정을 하고, 전용 커스텀 Hook을 따로 만들어 사용했다.
- 리덕스에서는 `connect` 함수를 사용하면 리덕스의 상태나 액션 생성 함수를 컴포넌트의 props로 받아올 수 있으며, Hooks를 통해 손쉽게 상태 조회 및 액션 디스패치가 가능하다.
- `connect`, `useSelector` 함수는 최적화가 잘 되어있어 실제 상태가 바뀔 때만 컴포넌트가 리렌더링 된다.
  - cf) Context API를 사용할 때는 Context가 지니고 있는 상태가 바뀌면 해당 Context의 Provider 내부 컴포넌트들이 모두 리렌더링 된다.

3. 하나의 커다란 상태

- 리덕스는 모든 글로벌 상태를 하나의 커다란 상태 객체에 넣어 사용하는 것이 필수

### 리덕스를 사용할 상황

- 프로젝트의 규모가 클 때
- 비동기 작업을 자주 할 때
- 사용하는 게 편리할 때

## 리덕스에서 사용되는 키워드

- 액션 : 상태 변화 필요할 때 액션 발생. `type` 필드 필수
- 액션 생성함수 : 파라미터를 받아와 액션 객체 형태로 만들어준다. 보통 함수 앞에 `export` 키워드를 붙여서 사용
- 리듀서 : 변화를 일으키는 함수로, 현재 상태와 액션을 파라미터로 받아 새로운 상태를 만들어서 반환.
  - `default:` 부분에 에러 발생이 아닌, 기존 `state`를 그대로 반환하도록 작성
  - 여러 개의 리듀서를 합쳐 Root Reducer를 만들 수 있다.
  - 서브 리듀서: 루트 리듀서 안의 리듀서
- 스토어 : 현재 앱 상태, 리듀서, 내장 함수가 들어있다.
- 디스패치 : 스토어의 내장함수 중 하나로, 액션을 발생시킨다.
  - `dispatch(action)`과 같이 액션을 파라미터로 전달한다.
  - 호출하면 스토어는 리듀서 함수를 실행시켜 액션을 참고하여 새로운 상태를 만들어준다.
- 구독 : 스토어의 내장함수 중 하나로, 함수 형태의 값을 파라미터로 받아온다.
  - subscribe 함수에 특정 함수를 전달하면, 액션이 디스패치 되었을 때마다 전달해준 함수가 호출된다.

## Redux의 3가지 규칙

1. 하나의 애플리케이션 안에는 하나의 스토어만 만든다.
2. 상태는 읽기전용이다.

- 기존의 상태는 건들지 않고 새로운 상태를 생성하여 업데이트 하는 방식으로 진행
- 내부적으로 데이터가 변경되는 것을 감지하기 위해 shallow equality 검사를 하기 때문에, 불변성을 유지해야 한다.

3. 변화를 일으키는 함수, 리듀서는 순수한 함수여야 한다.

- 리듀서 함수는 이전 상태와, 액션 객체를 파라미터로 받는다.
- 이전의 상태는 건드리지 않고, 변화를 일으킨 새로운 상태 객체를 만들어 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환해야 한다.
  - 실행할 때마다 다른 결과값이 나타나는 로직은 리듀서 함수의 바깥에서 처리해야 한다. 이를 위해 리덕스 미들웨어 사용

## 리덕스 사용 준비

- `createStore`을 사용하면 취소선이 그어지며 redux/toolkit의 configureStore 사용을 추천하는 문구가 뜬다.
  - 해결 방법
  - 1. Redux toolkit 설치 후 `configureStore` 사용
  - 2. 무시하고 그대로 사용
  - 3. 이름을 바꿔서 사용
    - `import { legacy_createStore as createStore } from "redux"`

## 리덕스 모듈 만들기

- 리덕스 모듈 : 액션 타입, 액션 생성함수, 리듀서가 모두 들어있는 자바스크립트 파일
- Ducks 패턴 : 리듀서와 액션 관련 코드들을 하나의 파일에 몰아서 작성
- 리듀서를 합치는 작업은 리덕스에 내장되어 있는 `combineReducers` 함수 사용
  - src/modules/index.js
- 리액트 프로젝트에 리덕스 적용하기
  - `npm add react-redux`
  - index.js에서 Provider 컴포넌트 불러와서 App 컴포넌트 감싸고, Provider의 props에 store 넣기

## 카운터 구현하기

- 프리젠테이셔널 컴포넌트 : 리덕스 스토어에 직접 접근하지 않고 필요한 값 또는 함수를 props로만 받아와서 사용하는 컴포넌트
- 컨테이너 컴포넌트 : 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트.
  - HTML 태그를 사용하지 않고 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용

## 리덕스 개발자도구 적용하기

- Redux DevTools 확장 프로그램 설치
- `npm add redux-devtools-extension` -> deprecated
  - `npm i --save @redux-devtools/extension`

## 할 일 목록 구현하기

- 컴포넌트의 리렌더링 성능을 최적화하기 위해 컴포넌트 분리
- React.memo, useCallback 사용

## useSelector 최적화

- `useSelector`를 사용해서 리덕스 스토어의 상태를 조회할 때, 상태가 바뀌지 않았다면 리렌더링하지 않는다.

```javaScript
  // CounterContainer.js

  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }))
```

- `useSelector` Hook을 통해 매번 렌더링될 때마다 새로운 객체 `{ number, diff }`를 만들기 때문에, 상태가 바뀌었는지 아닌지 확인을 할 수 없어 낭비 렌더링이 이루어진다.

  - 최적화 방법
  - 1. `useSelector` 여러 번 사용

  ```javaScript
    const number = useSelector(state => state.counter.number)
    const diff = useSelector(state => state.counter.diff)
  ```

  - 해당 값들 중 하나라도 바뀌었을 때만 컴포넌트 리렌더링

  - 2. react-redux의 `shallowEqual` 함수를 `useSelector`의 두번째 인자로 전달

  ```javaScript
    const { number, diff } = useSelector(state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }), shallowEqual)
  ```

  - `useSelector`의 두번째 파라미터는 `equalityFn`
  - `equalityFn?: (left: any, right: any) => boolean`
  - 이전 값과 다음 값을 비교해서 true가 나오면 리렌더링을 하지 않고, false가 나오면 리렌더링
  - `shallowEqual`은 객체 안의 가장 겉에 있는 값들을 모두 비교해준다.
    ```javaScript
      const object = {
        a: {
          x: 3,
          y: 2,
          z: 1
        },
        b: 1,
        c: [{ id: 1 }]
      }
      // -> 가장 겉에 있는 값: object.a, object,b, object,c
    ```

## connect 함수

- HOC(Higher-Order Component)
  - 컴포넌트를 특정 함수로 감싸서 특정 값 또는 함수를 props로 받아와서 사용할 수 있게 해주는 패턴
- 리덕스 스토어 안에 있는 상태를 props로 넣어줄 수도 있고, 액션을 디스패치하는 함수를 넣어줄수도 있다.
- connect 함수에서 `mapDispatchToProps`가 함수가 아닌 객체 형태일 때는 `bindActionCreators`를 대신 호출
- mapStateToProps의 두번째 파라미터 ownProps
  - 컨테이너 컴포넌트를 렌더링할 때 직접 넣어주는 props로, 생략 가능
  - `<CounterContainer myValue={1}/>` -> `{ myValue: 1}`이 ownProps
- connect의 3번째 파라미터 mergeProps
  - 컴포넌트가 실제로 전달받게 될 props로, 생략 가능
- connect의 4번째 파라미터 options
  - 컨테이너 컴포넌트가 어떻게 동작할지에 대한 옵션 설정, 생략 가능
