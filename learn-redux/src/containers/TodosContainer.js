import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todos from "../components/Todos";
import { addTodo, toggleTodo } from "../modules/todos";

function TodosContainer() {
  // useSelector에서 꼭 객체를 반환할 필요는 없다.
  // 한 종류의 값만 조회하고 싶다면 원하는 값만 바로 반환하면 된다.
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const onCreate = text => dispatch(addTodo(text))
  const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch])
  // 최적화를 위해 useCallback 사용

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle}/>
}

export default TodosContainer




// /////// connect 사용
// import React, { useCallback } from "react";
// import { connect } from "react-redux";
// import Todos from '../components/Todos'
// import { addTodo, toggleTodo } from '../modules/todos'

// function TodosContainer({ todos, addTodo, toggleTodo }) {
//   const onCreate = text => addTodo(text)
//   const onToggle = useCallback(id => toggleTodo(id), [toggleTodo])

//   return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle}/>
// }

// export default connect(
//   state => ({ todos: state.todos }),
//   {
//     addTodo,
//     toggleTodo
//   }
// )(TodosContainer)