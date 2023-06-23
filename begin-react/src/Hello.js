import React from 'react';

// function Hello(props) {
//   return <div style={{color: props.color}}>안녕하세요 {props.name}</div>
// }

function Hello({ color, name, isSpecial }) {
  return <div style={{color}}>
    {/* 조건부 렌더링 - isSpecial
      isSpecial && [] => false면 false, true면 []
    */}
    {/* { isSpecial ? <b>*</b> : null} */}
    {isSpecial && <b>*</b>}
    안녕하세요 {name}
    </div>
}

// props 미지정시 기본적으로 사용할 값 설정 
Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;