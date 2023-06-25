import React, { useState } from 'react'
// import axios from 'axios'
// import { useAsyncRetry } from 'react-use'
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext'
import User from './User'

// // useAsync에서는 Promise의 결과를 바로 data에 담기 때문에,
// // 요청을 한 이후 response에서 data 추출하여 반환하는 함수 따로 만듦
// async function getUsers() {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/users'
//   )
//   return response.data
// }

function Users() {
  const [userId, setUserId] = useState(null)
  const state = useUsersState()
  const dispatch = useUsersDispatch()

  const { data: users, loading, error } = state.users
  const fetchData = () => {
    getUsers(dispatch)
  }

  // const { loading, error, value: users, retry } = state
  // const [state, refetch] = useAsync(getUsers, [], true)

  // const [state, dispatch] = useReducer(reducer, {
  //   loading: false,
  //   data: null,
  //   error: null
  // })
  // const [users, setUsers] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // const fetchUsers = async () => {
  //   dispatch({ type: 'LOADING' })
  //   try {
  //     const response = await axios.get(
  //       'https://jsonplaceholder.typicode.com/users'
  //     )
  //     dispatch({ type: 'SUCCESS', data: response.data })
  //   } catch (e) {
  //     dispatch({ type: 'ERROR', error: e })
  //   }
  // }

  // useEffect(() => {
  //   fetchUsers()
  // }, [])

  // const { loading, data: users, error } = state
  // state.data를 users 키워드로 조회 

  if (loading) return <div>로딩중..</div>
  if (error) return <div>에러가 발생했습니다</div>
  if (!users) return <button onClick={fetchData}>불러오기</button>
  return (
  <>
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => setUserId(user.id)}
          style={{ cursor: 'pointer' }}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
    <button onClick={fetchData}>다시 불러오기</button>
    {userId && <User id={userId}/>}
  </>
  )
}

export default Users