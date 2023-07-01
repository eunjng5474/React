import * as postsAPI from '../api/posts'  // api/posts 안의 함수 모두 불러오기 
import { 
  // createPromiseThunk,  // redux-thunk
  // createPromiseThunkById,
  reducerUtils, 
  handleAsyncActions,
  handleAsyncActionsById,
  createPromiseSaga,
  createPromiseSagaById  
} from '../lib/asyncUtils'
import { getContext, takeEvery } from 'redux-saga/effects' // redux-saga

// 액션 타입 //

// 포스트 여러 개 조회하기
const GET_POSTS = 'GET_POSTS' // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS' // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR' // 요청 성공

// 포스트 하나 조회하기
const GET_POST = 'GET_POST'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_ERROR = 'GET_POST_ERROR'
const GO_TO_HOME = 'GO_TO_HOME'

// redux-saga
export const getPosts = () => ({ type: GET_POSTS })
// payload는 파라미터 용도, meta는 리듀서에서 id를 알기위한 용도
export const getPost = id => ({ type: GET_POST, payload: id, meta: id })
export const goToHome = () => ({ type: GO_TO_HOME })

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts)
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById)
function* goToHomeSaga() {
  const history = yield getContext('history')
  history.push('/')
}

// 사가들 합치기
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga)
}


// // 3번째 인자를 사용하면 withExtraArgument에서 넣어준 값들을 사용할 수 있다.
// export const goToHome = () => (dispatch, getState, { history }) => {
//   history.push('/')
// }

// initialState도 반복되는 코드를 initial() 함수를 사용해 리팩토링
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
}

export default function posts(state = initialState, action) {
  switch(action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, 'post', true)(state, action)
    default:
      return state
  }
}



// // 포스트 비우기
// const CLEAR_POST = 'CLEAR_POST'


// // thunk를 사용할 때, 꼭 모든 액션들에 대해 액션 생성함수를 만들 필요는 없다.
// // thunk 함수에서 바로 액션 객체를 만들어주어도 된다.

// export const getPosts = () => async dispatch => {
//   dispatch({ type: GET_POSTS })  // 요청 시작
//   try {
//     const posts = await postsAPI.getPosts()   // API 호출
//     dispatch({ type: GET_POSTS_SUCCESS, posts })  // 성공
//   } catch (e) {
//     dispatch({ type: GET_POSTS_ERROR, error: e})  // 실패
//   }
// }

// // thunk 함수에서도 파라미터를 받아와서 사용할 수 있다.
// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST })  // 요청 시작
//   try {
//     const posts = await postsAPI.getPostById()   // API 호출
//     dispatch({ type: GET_POST_SUCCESS, posts })  // 성공
//   } catch (e) {
//     dispatch({ type: GET_POST_ERROR, error: e})  // 실패
//   }
// }



// // redux-thunk
// // 리덕스 모듈 리팩토링을 통해 쉽게 thunk 함수를 만들 수 있다.
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById)

// export const clearPost = () => ({ type: CLEAR_POST })