import { call, put } from "redux-saga/effects"

// 프로미스를 기다렸다가 결과를 디스패치하는 사가
export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return function* saga(action) {
    try {
      // 재사용성을 위해 promiseCreator의 파라미터에는 action.payload 값을 넣도록 설정 
      const payload = yield call(promiseCreator, action.payload)
      yield put({ type: SUCCESS, payload })
    } catch (e) {
      yield put({ type: ERROR, error: true, payload: e })
    }
  }
}

// 특정 id의 데이터를 조회하는 용도로 사용하는 사가
// API를 호출할 때 파라미터는 action.payload를 넣고,
// id 값을 action.meta로 설정
export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return function* saga(action) {
    const id = action.meta
    try {
      const payload = yield call(promiseCreator, action.payload)
      yield put({ type: SUCCESS, payload, meta: id })
    } catch (e) {
      yield put({ type: ERROR, error: e, meta: id })
    }
  }
}

// 리듀서에서 사용할 수 있는 여러 유틸 함수
export const reducerUtils = {
  // 초기 상태, 초기 data 값은 기본적으로 null이지만 바꿀 수 있다.
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null
  }),
  // 로딩중 상태. prevState의 경우 기본값은 null이지만,
  // 따로 값을 지정하면 null로 바꾸지 않고 다른 값을 유지시킬 수 있다.
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  // 성공 상태
  success: payload => ({
    loading: false,
    data: payload,
    error: null
  }),
  // 실패 상태
  error: error => ({
    loading: false,
    data: null,
    error: error
  })
}

// 비동기 관련 액션들을 처리하는 리듀서 만들기
// type은 액션의 타입, Key는 상태의 key (ex. posts, post)
export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null)
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        }
      default:
        return state
    }
  }
}

// id별로 처리하는 유틸함수
export const handleAsyncActionsById = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return (state, action) => {
    const id = action.meta
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              // state[key][id]가 만들어져 있지 않을 수 있으므로 유효성을 먼저 검사한 후 data 조회
              keepData ? state[key][id] && state[key][id].data : null
            )
          }
        }
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload)
          }
        }
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload)
          }
        }
      default:
        return state
    }
  }
}



// // redux-thunk 사용
// // Promise에 기반한 Thunk를 만들어주는 함수
// export const createPromiseThunk = (type, promiseCreator) => {
//   const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

//   // 이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제 하에 작성
//   // 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 한다.
//   // ex. writeComment({ postId: 1, text: '댓글 내용' })
//   return param => async dispatch => {
//     // 요청 시작
//     dispatch({ type, param })
//     try {
//       // 결과물의 이름을 payload라는 이름으로 통ㅇ리 
//       const payload = await promiseCreator(param)
//       dispatch({ type: SUCCESS, payload })   // 성공 
//     } catch (e) {
//       dispatch({ type: ERROR, payload: e, error: true }) // 실패
//     }
//   }
// }

// // 특정 id를 처리하는 Thunk 생성함수
// const defaultIdSelector = param => param
// export const createPromiseThunkById = (
//   type,
//   promiseCreator,
//   // 파라미터에서 id를 어떻게 선택할지 정의하는 함수 
//   // 기본값으로는 파라미터를 그대로 id로 사용
//   // 파라미터가 { id: 1, details: true } 이런 형태라면
//   // idSelector를 param => param.id 이런식으로 설정
//   idSelector = defaultIdSelector
//  ) => {
//   const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

//   return param => async dispatch => {
//     const id = idSelector(param)
//     dispatch({ type, meta: id })
//     try {
//       const payload = await promiseCreator(param)
//       dispatch({ type: SUCCESS, payload, meta: id })
//     } catch (e) {
//       dispatch({ type: ERROR, error: true, payload: e, meta: id })
//     }
//   }
// }

