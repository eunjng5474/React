# 리액트 컴포넌트 스타일링

## Styled Components

- 설치 : `npm i styled-components@5.3.10`
  - version6 이후 에러로 인해 v5 사용
- 스타일 입력과 동시에 해당 스타일을 가진 컴포넌트를 만들 수 있다.
- props : `background: ${props => props.color || 'black'};`와 같이 사용
- 여러 줄의 CSS 코드를 조건부로 보여주고 싶다면 `css` 사용

### polished의 스타일 관련 유틸 함수 사용

- `npm add polished`
- ThemeProvider 기능을 통해 styled-components로 만드는 모든 컴포넌트에서 조회하여 사용할 수 있는 전역적인 값 설정
  - `theme`을 설정하면 ThemeProvider 내부에 렌더링된 컴포넌트에서 `palette` 조회해서 사용 가능
- Button.js에서 fullWidth를 사용할 때, `& + &`의 경우 fullWidthStyle의 `& + &`로 적용되는 이슈
  - `props.fullWidth`를 if문을 통해 체크해서 반환값 다르게 설정
  - Button에서 className을 삼항연산자를 통해 설정
- `styled(Button)`과 같은 방식으로 컴포넌트의 스타일 커스터마이징

  - 해당 컴포넌트에서 `className` props를 내부 엘리먼트에게 전달되고 있는지 확인해야 한다.

  ```javaScript
      const MyComponent = ({ className }) => {
      return <div className={className}></div>
    };

    const ExtendedComponent = styled(MyComponent)`
      background: black;
    `;
  ```

### 트랜지션 구현

- CSS Keyframe 사용
- styled-components에서 `keyframes`라는 유틸 사용
- 컴포넌트 사라지는 효과 구현 위해 Dialog 컴포넌트에서 두개의 로컬 상태 관리
  - `animate` : 현재 트랜지션 효과를 보여주고 있는 중이라는 상태 의미
  - `localVisible` : 실제로 컴포넌트가 사라지는 시점 지연
  - `useEffect` : visible 값이 true에서 false로 바뀌는 시점 감지해서 animate 값을 true로 바꾸고, setTimeout 함수를 사용해 얼마 뒤 false로 변경
  - `!visible` 조건에서 `null` 반환하는 대신 `!animate && !localVisible` 조건에서 `null`반환
