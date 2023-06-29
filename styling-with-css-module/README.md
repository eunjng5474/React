# 리액트 컴포넌트 스타일링

## CSS Module

- 확장자 : `.module.css`
- CSS 클래스 중첩 방지
  - 리액트 컴포넌트 파일에서 해당 CSS 파일을 불러올 때 CSS 파일에 선언한 클래스 이름들이 고유해진다.
  - 고유 CSS 클래스 이름이 만들어지는 과정에서는 파일 경로, 파일 이름, 클래스 이름, 해쉬값 등이 사용될 수 있다.
  - `styles.Box`와 같이 import로 불러온 `styles` 객체 안에 있는 값 참조
- 사용 시 유용한 상황
  - 레거시 프로젝트에 리액트를 도입할 때
  - CSS 클래스를 중복되지 않게 작성하기 위해 CSS 클래스 네이밍 규칙을 만들기 귀찮을 때
- 스타일링 위해 `react-icons` 라이브러리 설치
  - [문서](https://react-icons.github.io/react-icons/#/)
  - `npm add react-icons`
  - Font Awesome, Ionicons, Material Design Icons 등의 아이콘을 컴포넌트로 쉽게 사용 가능
- `styles.icon`과 같이 객체 안의 값을 조회하는데, 클래스 이름에 `-`가 들어있다면 `styles['my-class']`와 같이 사용.
  여러 개라면 `${styles.one} ${styles.tow}`
  - classnames 라이브러리의 `bind`기능을 사용하면 더 편하다.
    - `npm add classnames`
    - `cx('클래스명')`과 같은 형식으로 사용
    - 여러 개의 CSS 클래스를 사용하거나, 조건부 스타일링 시 다음과 같이 사용
    ```CSS
      cx('one', 'two')
      cx('my-component', {
        condition: true
      })
      cx('my-component', ['another', 'classnames'])
    ```
