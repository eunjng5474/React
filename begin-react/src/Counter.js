import React, { useReducer } from "react";
// `useState` 함수 : 컴포넌트에서 상태(동적인 값) 관리 

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  // const [number, setNumber] = useState(0);
  // 상태의 기본값을 파라미터로 넣어서 호출하면 배열이 반환
  // [현재 상태, Setter 함수]
  const [number, dispatch] = useReducer(reducer, 0);
  
  const onIncrease = () => {
    // setNumber(number + 1);
    // setNumber(preNumber => preNumber + 1);
    dispatch({ type: 'INCREMENT' })
  }

  const onDecrease = () => {
    // setNumber(number - 1);
    // setNumber(preNumber => preNumber - 1);
    dispatch({ type: 'DECREMENT' })
  }
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;