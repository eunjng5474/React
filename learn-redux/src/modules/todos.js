/* 액션 타입 선언 */
const ADD_TODO = 'todos/ADD_TODO'
const TOGGLE_TODO = 'todos/TOGGLE_TODO'

/* 액션 생성함수 선언 */
let nextId = 1    // todo 데이터에서 사용할 고유 id
export const addTodo = text => ({
  type: ADD_TODO,
  todo: {
    id: nextId++, // 새 항목을 추가하고 nextId 값에 1 더하기 
    text
  }
})
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
})

/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요는 없다.
// 배열이어도 되고, 원시 타입(숫자, 문자열, boolean)이어도 된다.
const  initialState = [
  /* 다음과 같이 구성된 객체를 배열 안에 넣는다.
  {
    id: 1,
    text: '예시',
    done: false
  }
  */
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo)
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.id   // id가 일치하면 
            ? {...todo, done: !todo.done} // done 값 반전
            : todo  // 아니면 그대로 둔다
      )
    default:
      return state
  }
}