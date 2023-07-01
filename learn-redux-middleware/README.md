# Redux Middleware

- 리덕스 미들웨어를 사용하면 액션이 디스패치 된 다음, 리듀서에서 해당 액션을 받아와서 업데이트하기 전에 추가적인 작업을 할 수 있다.
- 보통 리덕스에서 미들웨어를 사용하는 주된 용도는 비동기 작업을 처리할 때이다.
- redux-thunk, redux-saga 라이브러리가 많이 사용된다.

## 프로젝트 준비하기

- `npm i redux react-redux`
- 액션 타입, 액션 생성함수, 리듀서를 한 파일에 작성하는 Ducks 패턴 사용
- modules/counter.js, index.js
- 프로젝트에 리덕스 적용
  - src/index.js에서 root reducer를 불러와서 새로운 스토어를 만들고 Provider를 사용해 프로젝트에 적용
- components/Counter.js
- containers/CounterContainer.js

## 미들웨어 만들어보고 이해하기

- 리덕스 미들웨어 템플릿

```javaScript
  const middleware = store => next => action => {
    // 하고싶은 작업
  }
```

- 함수를 연달아서 두번 리턴하는 함수
- `store`: 리덕스 스토어 인스턴스
  - `dispatch`, `getState`, `subscribe` 내장함수들이 들어있다.
- `next(action)`: 액션을 다음 미들웨어에게 전달하는 함수
  - 다음 미들웨어가 없다면 리듀서에게 액션 전달
  - `next`를 호출하지 않는다면 액션이 무시처리되어 리듀서에게 전달되지 않는다.
- `action`: 현재 처리하고 있는 액션 객체
- 리덕스 스토어에는 여러 개의 미들웨어를 등록할 수 있으며, 새로운 액션이 디스패치되면 첫번째로 등록한 미들웨어가 호출된다.
- 미들웨어에서 `store.dispatch`를 사용하면 다른 액션을 추가로 발생시킬 수 있다.
- 스토어에 미들웨어를 적용할 때는 `applyMiddleware` 함수 사용
- 액션 값을 객체가 아닌 함수도 받아오게 만들어서 액션이 함수 타입이면 실행하게끔 할 수도 있다.

  ```javaScript
    const thunk = store => next => action =>
      typeof action === 'function'
        ? action(store.dispatch, store.getState)
        : next(action)

    // dispatch
    const myThunk = () => (dispatch, getState) => {
      dispatch({ type: 'HELLO' })
      dispatch({ type: 'BYE' })
    }
    dispatch(myThunk())
  ```

## redux-logger 사용 및 미들웨어와 DevTools 함께 사용하기

`npm i redux-logger`
`npm i redux-devtools-extension`

## redux-thunk

`npm i redux-thunk`

- 리덕스에서 비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어
- 액션 객체가 아닌 함수를 디스패치할 수 있다.
- thunk: 함수를 디스패치할 때 해당 함수에서 `dispatch`와 `getState`를 파라미터로 받아와야 하는데, 이 함수를 만들어주는 함수
- thunk 사용 예시

```javaScript
  const getComments = () => (dispatch, getState) => {
    // 이 안에서는 액션을 dispatch 할 수도 있고
    // getState를 사용하여 현재 상태를 조회할 수도 있다.
    const id = getState().post.activeId

    // 요청이 시작했음을 알리는 액션
    dispatch({ type: 'GET_COMMENTS' })

    // 댓글을 조회하는 프로미스를 반환하는 getComments가 있다고 가정
    api
      .getComments(id)  // 요청
      .then(comments => dispatch(
        { type: 'GET_COMMENTS_SUCCESS', id, comments })) // 성공시
      .catch(e => dispatch(
        { type: 'GET_COMMENTS_ERROR', error: e }))  // 실패
  }


  // async/await 사용 가능
  const getComments = () => async (dispatch, getState) => {
    const id = getState().post.activeId
    dispatch({ type: 'GET_COMMENTS' })
    try {
      const comments = await api.getComments(id)
      dispatch({ type: 'GET_COMMENTS_SUCCESS', id, comments })
    } catch (e) {
      dispatch({ type: 'GET_COMMENTS_ERROR', error: e })
    }
  }
```

- 카운터 딜레이하기
  - thunk 함수를 만들고, `setTimeout`을 사용해 액션이 디스패치되는 것을 1초씩 딜레이시키기
  - modules/counter.js, containers/CounterContainer.js

## redux-thunk로 프로미스 다루기

### 비동기 처리

- 동시에 여러 작업을 처리하거나, 기다리는 과정에서 다른 함수 호출 가능
- Promise
  - 코드의 깊이가 깊어지는 현상 방지
  ```javaScript
    const myPromise = new Promise((resolve, reject) => {
      // ...
    })
  ```
  - 성공할 때는 resolve를, 실패할 때는 reject 호출
  - resolve를 호출할 때 특정 값을 파라미터로 넣어주면, 이 값을 작업이 끝나고 사용할 수 있다. 작업이 끝나고 나서 다른 작업을 해야할 때는 Promise 뒤에 `.then()`을 붙여서 사용
  - 실패하는 상황에서는 `reject`를 사용하고, `.catch`를 통해 실패했을 때 수행할 작업 설정
- async/await
  - 함수를 선언할 때 함수 앞에 `async` 키워드를 붙이고, Promise의 앞부분에 `await`을 넣어주면 해당 프로미스가 끝날 때까지 기다렸다가 다음 작업 수행
  - 함수에서 `async`를 사용하면 결과값으로 Promise 반환
  - `async` 함수에서 에러를 발생시킬 때는 `throw`를 사용하고, 에러를 잡아낼 때는 try/catch문 사용
  - `Promise.all`: 등록한 프로미스 중 하나라도 실패하면 모든게 실패한 것으로 간주
  - `Promise.race`: 여러 프로미스를 등록해서 실행했을 때 가장 빨리 끝난 하나의 결과값을 가져온다.

### 리덕스 모듈

- 프로미스를 다루는 리덕스 모듈을 다룰 때 고려해야 할 사항
  - 프로미스가 시작, 성공, 실패했을 때 다른 액션을 디스패치해야 한다.
  - 각 프로미스마다 thunk 함수를 만들어주어야 한다.
  - 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해주어야 한다.
- api/posts.js, modules/posts.js
- 리덕스 모듈 리팩토링
  - src/lib/asyncUtils.js, modules/posts.js
- 포스트 목록 구현
  - components/PostList.js, containers/PostListContainer.js

### 리액트 라우터 적용하기

`npm i react-router-dom`

- 포스트 조회하기
  - components/Post.js, containers/PostContainer.js
- 라우트 설정하기
  - pages/PostListPage.js, PostPage.js
  - App.js에서 `exact={true}` : path 값과 정확하게 일치할 때만 렌더링
    - component가 아닌 `element={<PostListPage/>}`와 같이 작성 후, PostPage.js에서 `useParams` 사용

## API 재로딩 문제 해결하기

1. 데이터가 이미 존재하면 요청하지 않기

- PostListContainer에 if문 추가

2. 로딩을 새로하되, '로딩중...'을 띄우지 않기

- 뒤로가기를 통해 다시 포스트 목록을 조회할 때 최신 데이터를 보여줄 수 있다.
- asyncUtils.js 의 handleAsyncActions 함수 수정
  - `keepData` 파라미터를 추가하여, 이 값이 true면 로딩을 할 때도 데이터 유지
- modules/posts.js, posts 리듀서 수정

### 포스트 조회시 재로딩 문제 해결

- 어떤 파라미터가 주어졌는지에 따라 결과물이 다르기 때문에, 위 방법으로 처리 불가

1. 컴포넌트가 언마운트될 때 포스트 내용 비우기

- modules/posts.js에 CLEAR_POST 액션 추가
- PostContainer.js의 useEffect의 cleanup함수에서 액션 디스패치

- 읽었던 포스트를 불러올 때도 새로 요청하는 문제 개선 위해 posts 모듈에서 관리하는 상태의 구조를 바꿔야 한다.
  - asyncUtils의 함수 커스터마이징 - createPromiseThunkById, handleAsyncActionsById
  - modules/posts.js, containers/PostContainer.js 수정

## thunk에서 라우터 연동하기

`npm i --save history`

- thunk에서 라우터의 history 객체를 사용하려면 BrowserHistory 인스턴스를 만들어서 적용
  - index.js 수정
  - redux-thunk의 `withExtraArgument` 사용 시 thunk함수에서 사전에 정해준 값 참조 가능
- `getState()`를 통해 현재 리덕스 스토어의 상태를 확인하여 조건부로 이동하거나, 특정 API를 호출하여 성공했을 시에만 이동하는 형식으로 구현 가능

## json-server

`npx json-server ./data.json --port 4000`
`npm i axios`

## CORS와 Webpack DevServer Proxy

- 웹팩 개발서버의 프록시를 사용하면, 브라우저 API를 요청할 때 백엔드 서버에 직접 요청을 하지 않고, 현재 개발서버의 주소로 요청을 한다. 그러면 웹팩 개발 서버에서 해당 요청을 받아 그대로 백엔드 서버로 전달하고, 백엔드 서버에서 응답한 내용을 다시 브라우저쪽으로 반환
- CRA를 통해 만든 리액트 프로젝트에서는 package.json에서 `"proxy"`값을 설정해 쉽게 적용 가능
  - `localhost:4000`이 아닌 `localhost:3000`으로 요청

## redux-saga

- 액션을 모니터링 하고 있다가, 특정 액션이 발생하면 특정 작업을 하는 방식으로 사용
  - 비동기 작업시 기존 요청 취소 처리 가능
  - 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치되게끔 하거나, 자바스크립트 코드 실행 가능
  - 웹소켓을 사용하는 경우 Channel이라는 기능을 통해 효율적으로 코드 관리 가능
  - API 요청 실패시 재요청 가능

### Generator 문법

- 함수에서 값을 순차적 반환 가능. `funcion*` 키워드 사용.

```javaScript
  function* sumGenerator() {
    console.log('sumGenerator이 시작됐습니다.');
    let a = yield;
    console.log('a값을 받았습니다.');
    let b = yield;
    console.log('b값을 받았습니다.');
    yield a + b;

  const sum = sumGenerator()
  sum.next()
  // sumGenerator 시작
  // {value: undefined, done: false}
  sum.next(1)
  // a값을 받았습니다.
  // {value: undefined, done: false}
  sum.next(2)
  // b값을 받았습니다.
  // {value: 3, done: false}
}
```

- Generator로 액션 모니터링

```javaScript
  function* watchGenerator() {
      console.log('모니터링 시작');
      while(true) {
          const action = yield;
          if(action.type === 'HELLO') {
              console.log('안녕하세요')
          }
          if (action.type === 'BYE') {
              console.log('안녕히가세요')
          }
      }
  }

  const watch = watchGenerator()
  watch.next()
  //모니터링 시작
  // {value: undefined, done: false}
  watch.next({ type: 'HELLO' })
  // 안녕하세요
  watch.next({ type: 'BYE' })
  // 안녕히가세요
  watch.next({ type: 'GO' })
  // {value: undefined, done: false}
```

### 리덕스 사가 설치 및 비동기 카운터 만들기

`npm i redux-saga`

- counter.js의 `increaseAsync` 와 `decreaseAsync` thunk 함수를 지우고, 일반 액션 생성 함수로 대체
- `redux-saga/effects`의 다양한 유틸함수
  - `put`: 새로운 액션을 디스패치할 수 있다
  - `takeEvery`: 특정 액션 타입에 대해 디스패치되는 모든 액션 처리
  - `takeLatest`: 특정 액션 타입에 대해 디스패치된 가장 마지막 액션만 처리
- modules/index.js에 루트 사가 만들기
- src/index.js에 redux-saga 미들웨어 적용

## redux-saga로 프로미스 다루기

- redux-saga에서는 특정 액션을 모니터링하도록 하고, 해당 액션이 주어지면 이에 따라 제너레이터 함수를 실행하여 비동기 작업을 처리 후 액션을 디스패치
- redux-thunk로 구현할 때 `getPosts`와 `getPost`는 thunk 함수였지만, redux-saga를 사용하면 순수 액션 객체를 반환하는 액션 생성 함수로 구현 가능
- 액션을 모니터링해서 특정 액션이 발생했을 때 호출할 사가 함수에서는 파라미터로 해당 액션을 받아올 수 있다.
- modules/index.js - rootSaga에 postsSaga 등록
- 까다로운 작업을 할 때는 사가 함수를 직접 작성하고, 간단한 비동기 작업을 처리할 때는 반복되는 로직을 함수화하여 재사용하면 생산성 향상
  - lib/asyncUtils.js - `createPromiseSaga`, `createPromiseSagaById` 작성
  - modules/posts.js 수정

## saga에서 라우터 연동

- 미들웨어를 만들 때 `context`를 설정하면 추후 사가에서 `getContext` 함수를 통해 조회 가능
