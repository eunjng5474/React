# API 연동하기

## API 연동의 기본

- `$ npx create-react-app api-integrate`
- `cd api-integrate`
- `npm add axios`
- 요청에 대한 상태 관리
  - 요청 결과, 로딩 상태, 에러
- `useEffect`에 첫번째 파라미터로 등록하는 함수는 `async`를 사용할 수 없기 때문에 함수 내부에서 `async`를 사용하는 새로운 함수를 선언해야 한다.

## useReducer로 요청 상태 관리하기

- `useState`의 `setState` 함수를 여러 번 사용하지 않아도 되며, 다른 곳에서도 쉽게 재사용 가능

## useAsync 커스텀 Hook 만들어서 사용하기

- `useAsync` 함수는 첫번째 파라미터로 API 요청을 시작하는 함수, 두번째 파라미터로 해당 함수 안에서 사용하는 `useEffect`의 `deps`로 설정되는 `deps`를 받는다.
  - 기본값: [] => 컴포넌트가 가장 처음 렌더링할 때만 API 호출
  - 반환하는 값: 요청 관련 상태, `fetchData` 함수

## react-async로 요청 상태 관리하기

- `react-async`: `useAsync`와 비슷한 함수가 들어있는 라이브러리
  -> `react-use`로 대체!
  - `npm add react-use`
  - `useAsync` 대신 `useAsyncRetry` 사용
- 기존 커스텀 Hook은 결과물로 배열을 반환하지만, 이 Hook은 객체 형태로 반환
- react-async의 `useAsync`를 사용할 때 파라미터로 넣는 옵션 객체에는 호출할 함수 `promiseFn`을 넣고, 파라미터도 필드 이름과 함께 (customerId) 넣어줘야 한다.
- useAsync 사용시 프로미스를 반환하는 함수의 파라미터를 객체형태로 해야 한다.
  - `async function getUser({ id }) {`
- `watch`값에 특정 값을 넣으면 이 값이 바뀔 때마다 `promiseFn`에 넣은 함수 호출

## Context와 함께 사용하기

- UsersContext.js
- Users.js, User.js 수정
- 반복되는 코드 줄이기
  - api.js
  - asyncActionUtils.js
- switch 문에서 `return`, `break` 하지 않을 때 여러 개의 `case`에 대해 동일한 코드 실행
