import { createAction, ActionType, createReducer } from 'typesafe-actions'
// const { createAction, createStandardAction} = deprecated

// 액션 타입 선언
// as const를 붙여줌으로써 나중에 액션 객체를 만들기 위해 action.type의 값을 추론하는 과정에서
// action.type이 string으로 추론되지 않고 'counter/INCREASE'와 같이 실제 문자열 값으로 추론되도록 함
// const INCREASE = 'counter/INCREASE'
// const DECREASE = 'counter/DECREASE' 
// const INCREASE_BY = 'counter/INCREASE_BY'
// // typesafe-actions로 리팩토링: 뒤에 as const 제거

// 리팩토링
// 액션 생성함수 선언
export const increase = createAction('counter/INCREASE')();
export const decrease = createAction('counter/DECREASE')();
export const increaseBy = createAction('counter/INCREASE_BY')<number>();
// payload 타입을 Generics로 설정

// 액션 객체 타입 준비
const actions = { increase, decrease, increaseBy}
// 모든 액션 생성함수를 actions 객체에 넣기
type CounterAction = ActionType<typeof actions>
// ActionType을 사용하여 모든 액션 객체들의 타입 준비


// // 액션 생성함수 선언
// export const increase = () => ({
//   type: INCREASE
// })
// export const decrease = () => ({
//   type: DECREASE
// })
// export const increaseBy = (diff: number) => ({
//   type: INCREASE_BY,
//   // 액션에 부가적으로 필요한 값을 payload라는 이름으로 통일 : FSA 규칙
//   // 해당 규칙을 적용하면 액션들이 모두 비슷한 구조로 이루어져있게 되어 추후 다룰 때 편리하며 읽기 쉽고,
//   // 액션 구조를 일반화함으로써 액션에 관련된 라이브러리를 사용할 수 있게 해준다.
//   payload: diff
// })

// // 모든 액션 객체들에 대한 타입 준비
// // ReturnType<typeof __> 는 특정 함수의 반환값 추론
// // 상단부에서 액션타입을 선언할 때 as const를 하지 않으면 제대로 작동하지 않는다.
// type CounterAction = 
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>


// 이 리덕스 모듈에서 관리할 상태의 타입을 선언
type CounterState = {
  count: number
}

// 초기상태 선언
const initialState: CounterState = {
  count: 0
}

// 리듀서 작성
// 리팩토링 - createReducer는 리듀서를 쉽게 만들 수 있게 해주는 함수
// Generics로 리듀서에서 관리할 상태, 리듀서에서 처리할 모든 액션 객체들의 타입을 넣어야 한다.
const counter = createReducer<CounterState, CounterAction>(initialState)
  // 메서드 체이닝 방식으로 구현
  .handleAction(increase, state => ({ count: state.count + 1 }))
  .handleAction(decrease, state => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({ 
    count: state.count + action.payload 
  }))

  // [INCREASE]: state => ({ count: state.count + 1}),
  // // 액션을 참조할 필요가 없으면 파라미터로 state만 받아와도 된다.
  // [DECREASE]: state => ({ count: state.count - 1}),
  // [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload })
  // // 액션의 타입 유추 가능




// // 리듀서에서는 state와 함수의 반환값이 일치하도록 작성
// // 액션에서는 CounterAction을 타입으로 설정
// function counter(
//   state: CounterState = initialState,
//   action: CounterAction
// ): CounterState {
//   switch(action.type) {
//     case INCREASE: 
//       return { count: state.count + 1 }
//     case DECREASE: 
//       return { count: state.count - 1 }
//     case INCREASE_BY: 
//       return { count: state.count + action.payload }
//     default:
//       return state
//   }
// }

export default counter