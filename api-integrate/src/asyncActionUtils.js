// 이 함수는 파라미터로 액션의 타입(ex. GET_USER)과 Promise를 만들어주는 함수를 받는다
export function createAsyncDispatcher(type, promiseFn) {
  // 성공, 실패에 대한 액션 타입 문자열 준비
  const SUCCESS = `${type}_SUCCESS`
  const ERROR = `${type}_ERROR`

  // 새로운 함수 만들기
  // ...rest를 사용하여 나머지 파라미터를 rest 배열에 담기 
  async function actionHandler(dispatch, ...rest) {
    dispatch({ type })  // 요청 시작 
    try {
      const data = await promiseFn(...rest) // rest 배열을 spread로 넣어줌 
      dispatch({
        type: SUCCESS,
        data
      })  // 성공
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e
      })  // 실패 
    }
  }
  return actionHandler  // 만든 함수 반환
}

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null
}

// 로딩중일 때 바뀔 상태 객체 
const loadingState = {
  loading: true,
  data: null,
  error: null
}

// 성공했을 때의 상태 만들어주는 함수 
const success = data => ({
  loading: false,
  data,
  error: null
})

// 실패했을 때의 상태 만들어주는 함수 
const error = error => ({
  loading: false,
  data: null,
  error: error
})

// 세가지 액션을 처리하는 리듀서 만들기
// type은 액션 타입, key는 리듀서를 사용할 필드 이름 (ex. user, users)
export function createAsyncHandler(type, key) {
  // 성공, 실패에 대한 액션 타입 문자열 준비
  const SUCCESS = `${type}_SUCCESS`
  const ERROR = `${type}_ERROR`

  // 함수 새로 만들기
  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState
        }
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data)
        }
      case ERROR:
        return {
          ...state,
          [key]: error(action.error)
        }
      default:
        return state
    }
  }
  // 만든 함수 반환
  return handler
}