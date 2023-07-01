const myLogger = store => next => action => {
  console.log(action) // 액션 출력
  const result = next(action) // 다음 미들웨어/리듀서에게 액션 전달

  // 업데이트 이후의 상태 조회
  console.log('\t', store.getState()) 

  return result
  // 여기서 반환하는 값은 dispatch(action)의 결과물. 기본은 undefined
}

export default myLogger