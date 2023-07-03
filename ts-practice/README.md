# 리액트 프로젝트에서 타입스크립트 사용하기

## 타입스크립트 연습

### 기본 타입

- `npm init -y`
- `npm install typescript`
- `npx tsc --init`
  - tsconfig.json 파일 생성 : 타입스크립트가 컴파일될 때 필요한 옵션 지정
- `npx tsc` -> dist/practice.js
  - ts 파일에서 명시한 값의 타입은 컴파일되는 과정에서 모두 사라짐
- 타입스크립트를 사용하면 특정 변수 또는 상수의 타입을 지정할 수 있고, 사전에 지정한 타입이 아닌 값이 설정될 때 에러를 발생시키고, 컴파일이 되지 않는다.

### 타입스크립트 실행 방법

1. tsc, node 사용

- `npx tsc`
- `node dist/practice.js`

2. ts-node 사용

- `npm i ts-node`
- `npx ts-node src/practice.js`

3. nodemon, ts-node 사용
4. tsc-watch 사용
   [참고자료](https://velog.io/@fkstndnjs/Typescript-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94-5%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)

### 함수에서 타입 정의하기

```javaScript
  function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 0)
  }
  const total = sumArray([1, 2, 3, 4, 5])
```

- 함수에서 아무것도 반환하지 않아야 한다면 반환 타입을 void로 설정

### interface 사용

- interface: 클래스 또는 객체를 위한 타입을 지정할 때 사용되는 문법
- 타입스크립트에서 constructor의 파라미터 쪽에 `public` 또는 `private` accessor를 사용하면 직접 설정해주는 작업 생략 가능
- interface 선언시 다른 interface를 `extends` 키워드를 통해 상속받을 수 있다.

### Type Alias 사용

- `type`: 특정 타입에 별칭을 붙이는 용도로 사용.
  - 객체를 위한 타입을 설정할 수 있고, 어떤 타입이든 별칭을 지어줄 수 있다.

### Generics

- 제네릭: 타입스크립트에서 함수, 클래스, interface, type alias를 사용하게 될 때 여러 종류의 타입에 대해 호환을 맞춰야 하는 상황에서 사용하는 문법
  - 파라미터로 다양한 타입을 넣을 수 있고, 타입 지원을 지켜낼 수 있다.

## 리액트 컴포넌트 타입스크립트로 작성

- `npx create-react-app ts-react-tutorial --template typescript`

### React.FC

- props의 타입을 Generics로 넣어서 사용
- 사용 비권장
- 특징
  - props에 기본적으로 `children`이 들어있다.
  - 컴포넌트의 defaultProps, propTypes, contextTypes를 설정할 때 자동완성 가능
  - `children`이 옵셔널 형태로 들어가 있어 컴포넌트의 props의 타입이 명백하지 않다.
  - `defaultProps`가 제대로 작동하지 않는다.

## 타입스크립트로 리액트 상태 관리

- `useState` 사용 시 `useState<number>()`와 같이 Generics를 사용해 상태가 어떤 타입을 가질지 설정
  - 타입을 유추하기 때문에 생략 가능
  - 상태가 null일 수도 있고 아닐 수도 있을 때 활용하면 좋다.
  ```TypeScript
    type Information = { name: string, description: string }
    const [info, setInformation] = useState<Information | null>(null)
  ```

## TypeScript와 Context API 활용하기

- State를 위한 Context를 만들고, Dispatch를 위한 Context 만들기
- Context에서 관리하고 있는 값을 쉽게 조회하도록 커스텀 Hooks 작성
  - null 체킹이 중요하다.
  - Context가 지닌 값이 유효하지 않으면 에러 발생시키도록 함으로써, 이후 Hooks를 사용할 때 각 Hooks 함수들이 반환하는 값이 언제나 유효하다는 것을 보장
- SampleStateContext를 정의할 때, `createContext<State>({count: 0, ....})`와 같이 기본값을 지정해주고, `useSampleState(): State {...}`와 같이 return type을 정의해주면, null check를 하지 않아도 된다.
  - `createContext<SampleDispatch>(() => null)`, `useSampleDispatch(): SampleDispatch {...}`

## TypeScript에서 리덕스 사용하기

- `npm add redux react-redux @types/react-redux`
- 리덕스 모듈 작성
  - src/modules/counter.ts
- 프로젝트에 리덕스 적용
  - src/modules/index.ts
  - src/index.tsx
- 프리젠테이셔널 컴포넌트 만들기
  - src/components/Counter.tsx
- 컨테이너 컴포넌트 만들기
  - src/containers/CounterContainer.tsx

### 투두리스트

- 리덕스 모듈 만들기: src/modules/todos.ts
- 루트 리듀서에 todos 리듀서 등록: modules/index.ts
- 투두리스트 구현을 위한 프리젠테이셔널 컴포넌트 준비
  - TodoInsert: 새 항목 등록
  - TodoItem: 할 일 정보 보여줌
  - TodoList: 여러 개의 TodoItem을 렌더링
  - src/components

### typesafe-actions로 리팩토링

`npm add typesafe-actions`

- typesafe-actions: 리덕스를 사용하는 프로젝트에서 액션 생성 함수와 리듀서를 훨씬 쉽고 깔끔하게 작성할 수 있게 해주는 라이브러리
- src/modules.counter.ts
- `createStandardAction` -> deprecated
  - `createAction`로 대체하거나, 아래와 같이 `deprecated` 사용
  ```TypeScript
    import { deprecated, ActionType, createReducer} from 'typesafe-actions'
    const { createAction, createStandardAction} = deprecated
  ```
- `createReducer`: 리듀서를 switch문이 아닌 객체 형태로 작성할 수 있게 해준다.

- 메서드 체이닝 방식으로 구현
  - `handleAction`의 첫번째 인자에 액션의 type이 아닌 액션 생성함수 자체를 넣어도 작동
  - 액션 타입 선언, 액션 객체 타입 준비 생략 가능
  - `createReducer` 사용 시 해당 함수의 Generics 생략 가능

### todos 리덕스 모듈 여러 파일로 분리하기

- modules/todos/...ts

## 타입스크립트에서 리덕스 미들웨어 사용하기

`npm add redux-thunk`
`npm add axios`

- src/api/github.ts
- src/modules/github/actions.ts
  - `createAsyncAction` 유틸함수를 통해 리팩토링 가능
- thunk 함수 작성: modules/github/thunks.ts
  - catch에서 e: unknown으로 되는 에러 발생 -> `catch (e: any) {}`
  - ThunkAction의 Generics로 넣어줘야 하는 값
    - `TReturnType` : thunk함수에서 반환하는 값의 타입 설정
      - `async` 사용 시 `Promise<void>`가 더 정확하지만, `void`로 입력 가능
    - `TState` : 스토어의 상태에 대한 타입 설정
    - `TExtraThunkArg` : redux-thunk 미들웨어의 Extra Argument의 타입 설정
    - `TBasicAction` : dispatch 할 수 있는 액션들의 타입 설정
- src/modules/github/types.ts, reducer.ts
- src/modules/github/index.ts, src/modules/index.ts
- Github 사용자 정보를 불러오기 위한 프리젠테이셔널 컴포넌트 준비
  - src/components/GithubUsernameForm.tsx, GithubProfileInfo.tsx
- Github 사용자 정보를 불러오기 위한 컨테이너
  - src/containers/GithubProfileLoader.tsx
  - `getUserProfileThunk(username)` 에러 해결을 위해 `import type {} from 'redux-thunk/extend-redux'` 추가

### thunk 함수와 리듀서 리팩토링하기

- `createAsyncThunk` 함수 만들기 - `createAsyncAction`으로 만든 액션 생성함수와 Promise를 만들어주는 함수를 파라미터로 가져와 thunk를 만들어준다.
  - src/lib/createAsyncThunk.ts
  - AsyncActionCreator -> AsyncActionCreatorBuilder
  - `F extends (...params: any[]) => Promise<any>` : F를 Generics로 받아오는데, 해당 타입은 프로미스를 리턴하는 함수 형태만 받아올 수 있도록 설정
  - `type Params = Parameters<F>` : 함수의 파라미터들의 타입 추론 -> F 함수의 파라미터와 thunk 함수의 파라미터가 동일하게끔 설정
  - src/modules/github/thunks.ts
- 리듀서 리팩토링
  - lib/reducerUtils.ts

### redux-saga 사용하기

`npm i redux-saga`

- 액션 수정하기: github/actions.ts
- 비동기 액션을 처리할 saga 작성 : github/saga.ts
  - 액션의 타입은 `ReturnType`을 통해 유추
- saga 리팩토링 : src/lib/createAsyncSaga.ts
