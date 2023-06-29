# componentDidCatch로 에러 잡아내기 / Sentry 연동

## 에러 잡아내기

- User.js에서 if문을 통해 `user`값이 존재하지 않으면 `null` 렌더링 -> 에러 발생하지 않음
- `defaultProps` 설정
- `componentDidCatch` 생명주기 메서드를 통해 예외처리 하지 않은 에러 발생 시 에러 발생했다고 알려주는 화면 보여주기
  - 첫번째 파라미터는 에러 내용, 두번째 파라미터는 에러가 발생한 위치

## Sentry 연동

- 발견하지 못했지만 사용자가 발견하게 되는 오류는 `componentDidCatch`에서 `error`와 `info` 값을 네트워크를 통해 다른 곳으로 전달하면 되지만, Sentry라는 상용서비스를 사용하면 별도의 서버를 만들지 않아도 된다.
- 새 프로젝트 생성
- `npm install --save @sentry/react`
- index.js 및 ErrorBoundary.js 수정
- sentry의 Issues에서 실시간 확인 가능

## 편리한 도구 - Prettier, ESLint, Snippet
