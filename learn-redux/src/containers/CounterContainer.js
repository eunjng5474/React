import React from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Counter from "../components/Counter";
import { increase, decrease, setDiff } from '../modules/counter'

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook 
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일 
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }), shallowEqual)

  // // 최적화 방법 1. useSelector 여러 번 사용
  // const number = useSelector(state => state.counter.number)
  // const diff = useSelector(state => state.counter.diff)


  // useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용할 수 있게 해주는 Hook 
  const dispatch = useDispatch()
  // 각 액션들을 디스패치하는 함수 만들기 
  const onIncrease = () => dispatch(increase())
  const onDecrease = () => dispatch(decrease())
  const onSetDiff = diff => dispatch(setDiff(diff))

  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어준다.
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  )
}

export default CounterContainer





// ////// connect
// import React from "react";
// import { connect } from "react-redux";
// import Counter from "../components/Counter";
// import { increase, decrease, setDiff } from '../modules/counter'
// // import { bindActionCreators } from "redux";

// // 액션 생성함수 이름이 바뀌어서 props 이름도 바뀜
// // ex. onIncrease -> increase
// function CounterContainer({ number, diff, onIncrease, onDecrease, onSefDiff }) {
//   return (
//     <Counter
//       // 상태와 
//       number={number} 
//       diff={diff}
//       // 액션을 디스패치하는 함수들을 props로 넣어준다.
//       onIncrease={increase} 
//       onDecrease={decrease} 
//       onSetDiff={setDiff}
//     />
//   )
// }

// // mapStateToProps는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props로 넣어줄지 정의
// // 현재 리덕스 상태를 파라미터로 받아온다.
// const mapStateToProps = state => ({
//   number: state.counter.number,
//   diff: state.counter.diff
// })

// // // mapDispatchToProps는 액션을 디스패치하는 함수를 만들어서 props로 넣어준다.
// // // dispatch를 파라미터로 받아온다.
// // const mapDispatchToProps = dispatch => 
// //   // bindActionCreators를 사용하면, 자동으로 액션 생성 함수에 dispatch가 감싸진 상태로 호출할 수 있다.
// //   bindActionCreators(
// //     {
// //       increase,
// //       decrease,
// //       setDiff
// //     },
// //     dispatch
// //   )

// // mapDispatchToProps가 함수가 아니라 객체라면
// // bindActionCreators를 connect에서 대신 해준다.
// const mapDispatchToProps = {
//   increase,
//   decrease,
//   setDiff
// }

// // connect 함수에는 mapStateToProps, mapDispatchToProps를 인자로 넣는다.
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CounterContainer)


// /* 위 코드는 다음과 동일
//   const enhance = connect(mapStateToProps, mapDispatchToProps)
//   export default enhance(CounterContainer)
// */