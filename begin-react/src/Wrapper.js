import React from "react";

// 컴포넌트 태그 사이에 넣은 값 조회 - props.children
function Wrapper({children}) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Wrapper;