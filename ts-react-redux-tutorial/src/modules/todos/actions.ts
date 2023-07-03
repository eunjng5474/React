import { createAction } from "typesafe-actions";
import { Todo } from "./types";

// 리듀서에서 사용할 수 있도록 타입 내보내기
export const ADD_TODO = 'todos/ADD_TODO'
export const TOGGLE_TODO = 'todos/TOGGLE_TODO'
export const REMOVE_TODO = 'todos/REMOVE_TODO'

let nextId = 1

export const addTodo = createAction(ADD_TODO, (text: string) =>({
  id: nextId++,
  text
}))<Todo>()

export const toggleTodo = createAction(TOGGLE_TODO)<number>()
export const removeTodo = createAction(REMOVE_TODO)<number>()