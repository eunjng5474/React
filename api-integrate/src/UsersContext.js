import React, { createContext, useReducer, useContext } from 'react'
import {createAsyncDispatcher, createAsyncHandler, initialAsyncState} 
from './asyncActionUtils'
import * as api from './api'  // api 파일에서 내보낸 모든 함수 불러오기 
// import axios from 'axios'

// UsersContext에서 사용할 기본 상태
const initialState = {
  users: initialAsyncState,
  user: initialAsyncState
}

const usersHandler = createAsyncHandler('GET_USERS', 'users')
const userHandler = createAsyncHandler('GET_USER', 'user')

// 위에 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성 
function usersReducer(state, action) {
  switch (action.type) {
    case 'GET_USERS':
    case 'GET_USERS_SUCCESS':
    case 'GET_USERS_ERROR':
      return usersHandler(state, action)
    case 'GET_USER':
    case 'GET_USER_SUCCESS':
    case 'GET_USER_ERROR':
      return userHandler(state, action)
    default:
      throw new Error(`Unhanded action type: ${action.type}`)
  }
}

// State용 Context와 Dispatch용 Context 따로 만들기
const UsersStateContext = createContext(null)
const UsersDispatchContext = createContext(null)

// 위에서 선언한 두 Context들의 Provider로 감싸주는 컴포넌트
export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState)
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  )
}

// State를 쉽게 조회할 수 있게 해주는 커스텀 Hook
export function useUsersState() {
  const state = useContext(UsersStateContext)
  if (!state) {
    throw new Error('Cannot find UsersProvider')
  }
  return state
}

// Dispatch를 쉽게 사용할 수 있게 해주는 커스텀 Hook
export function useUsersDispatch() {
  const dispatch = useContext(UsersDispatchContext)
  if (!dispatch) {
    throw new Error('Cannot find UsersProvider')
  }
  return dispatch
}

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers)
export const getUser = createAsyncDispatcher('GET_USER', api.getUser)


// 리팩토링 전
// export async function getUsers(dispatch) {
//   dispatch({ type: 'GET_USERS' })
//   try {
//     const response = await axios.get(
//       'https://jsonplaceholder.typicode.com/users'
//     )
//     dispatch({ type: 'GET_USERS_SUCCESS', data: response.data })
//   } catch (e) {
//     dispatch({ type: 'GET_USERS_ERROR', error: e })
//   }
// }

// export async function getUser(dispatch, id) {
//   dispatch({ type: 'GET_USER' })
//   try {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/users/${id}`
//     )
//     dispatch({ type: 'GET_USER_SUCCESS', data: response.data })
//   } catch (e) {
//     dispatch({ type: 'GET_USER_ERROR', error: e})
//   }
// }