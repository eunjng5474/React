# 투두리스트 만들기

## 컴포넌트 만들기

- `$ npx create-react-app mashup-todolist`
- `cd mashup-todolist`
- `npm i react-icons styled-components@5.3.10`
- 컴포넌트 목록
  - TodoTemplate
  - TodoHead
  - TodoList
  - TodoItem
  - TodoCreate
- 글로벌 스타일 추가 : createGlobalStyle

## Context API를 활용한 상태 관리

- 프로젝트의 규모가 커진다면 App 컴포넌트의 코드가 복잡해지거나, props를 전달해줄 때 여러 컴포넌트를 거쳐야 할 수 있다.
- Context API 활용
- `state`와 `dispatch`를 Context를 통해 다른 컴포넌트에서 바로 사용할 수 있도록 함
  - 두 개의 Context를 만들어 사용
    - `dispatch`만 필요한 컴포넌트에서 불필요한 렌더링 방지
- Context에서 사용할 값 지정하기

  - Provider 컴포넌트 렌더링, `value` 설정, props로 받아온 `children`값 내부에 렌더링

- `useContext`를 사용하는 커스텀 Hook 만들기

  - 다른 컴포넌트에서 `state`, `dispatch` 사용시 다음과 같이 사용

  ```javaScript
    import React from 'react';
    import { useTodoState, useTodoDispatch } from '../TodoContext';

    function Sample() {
      const state = useTodoState();
      const dispatch = useTodoDispatch();
      return <div>Sample</div>;
    }
  ```

- 커스텀 Hook이 TodoProvider 컴포넌트 내부에 렌더링되어 있지 않다면 에러 발생시키기

## 기능 구현하기

- TodoCreate
  - `onSubmit` : 새로운 항목을 추가하는 액션 `dispatch` 후, `value` 초기화 및 `open` 값 false로 전환
  - `React.memo`를 통해 불필요한 리렌더링 방지
