import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import github from "./github";
import { githubSaga } from "./github";
import { all } from 'redux-saga/effects'

const rootReducer = combineReducers({
  counter,
  todos,
  github
})

// 루트 리듀서 내보내기
export default rootReducer

// 루트 리듀서의 반환값 유추
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내기
export type RootState = ReturnType<typeof rootReducer>

// 루트 사가 만들어서 내보내기
export function* rootSaga() {
  yield all([githubSaga()])
}