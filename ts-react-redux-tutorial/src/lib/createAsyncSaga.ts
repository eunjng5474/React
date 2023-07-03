import { call, put } from 'redux-saga/effects'
import { AsyncActionCreatorBuilder, PayloadAction } from 'typesafe-actions'
import { GithubProfile } from '../api/github';
import { AxiosError } from 'axios';

// 유틸함수의 재사용성을 높이기 위해 함수의 파라미터는 항상 하나의 값을 사용하도록 하고,
// action.payload를 그대로 파라미터로 넣어주도록 설정
// 만약 여러 종류의 값을 파라미터로 넣어야 한다면 객체 형태로 만들어야 한다.
type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

// action이 payload를 갖고 있는지 확인
// __ is __ 문법 -> Type guard
function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
  return action.payload !== undefined;
}

export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    [T1, string],
    [T2, GithubProfile],
    [T3, AxiosError]
    // // [액션타입 , 페이로드타입] or [액션타입 [페이로드타입,메타타입]]
    // [T1, [P1, undefined]],
    // [T2, [P2, undefined]],
    // [T3, [P3, undefined]]
  >,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      const result: GithubProfile = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(asyncActionCreator.success(result));
    } catch (e: any) {
      yield put(asyncActionCreator.failure(e));
    }
  };
}