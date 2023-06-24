# 리액트 컴포넌트 스타일링

## Sass

- CSS pre-processor로서, 복잡한 작업을 쉽게할 수 있게 해주고, 코드의 재활용성을 높여주며, 코드의 가독성을 높여준다.
- .scss/.sass 두 가지 확장자 지원
- 라이브러리 설치 : `npm add sass`
  - `node-sass`의 이슈로 인해 sass 설치

### className에 CSS 클래스 이름 동적으로 넣기

- `className={['Button', size].join(' ')}`
- `className={`Button ${size}`}`
- classnames라는 라이브러리 사용하는 것이 편리

### 옵션

- `& + &` === `.Button + .Button`
- 반복되는 코드는 Sass의 `mixin` 기능을 통해 재사용 - `@mixin, @include`
- `fullWidth` : 전체 너비 차지

### ...rest props 전달

- spread, rest 문법 사용
  `...rest` : 지정한 props를 제외한 값들을 `rest`라는 객체에 모아주고, `{...rest}`를 통해 객체 안의 값들을 button 태그에 설정
