import React, {useRef, useState, useMemo, useCallback, useReducer} from 'react';
// import Hello from './Hello';
// import Wrapper from './Wrapper';
// import Counter from './Counter';
// import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
// import './App.css'

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...')
  return users.filter(user => user.active).length;
}

const initialState = {
  // inputs: {
  //   username: '',
  //   email: ''
  // },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }    
  ]
}
function reducer(state, action) {
  switch (action.type) {
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   }
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user)
        // inputs: initialState.inputs,
        // users: state.users.concat(action.user)

      })
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id)
        user.active = !user.active
      })
      // return {
      //   ...state,
      //   users: state.users.map(user => 
      //     user.id === action.id ? { ...user, active: !user.active } : user)
      // }
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id)
        draft.users.splice(index, 1)
      })
      // return {
      //   ...state,
      //   users: state.users.filter(user => user.id !== action.id)
      // }
    default:
      return state
  }
}

export const UserDispatch = React.createContext(null)


function App() {
  // const [{ username, email }, onChange, onReset] = useInputs({
  //   username: '',
  //   email: ''
  // })
  const [state, dispatch] = useReducer(reducer, initialState)
  // const nextId = useRef(4)

  const { users } = state
  // const { username, email } = state.inputs
  // state에서 필요한 값들을 비구조화 할당 문법을 통해 추출하여 각 컴포넌트에 전달 

  // const onChange = useCallback(e => {
  //   const {name, value} = e.target
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   })
  // }, [])

  // const onCreate = useCallback(() => {
  //   dispatch({
  //     type: 'CREATE_USER',
  //     user: {
  //       id: nextId.current,
  //       username,
  //       email
  //     }
  //   })
  //   // 새로운 항목을 추가할 때 input값 초기화해야 하므로 데이터 등록 후 `reset()` 호출 
  //   onReset()
  //   nextId.current += 1;
  // }, [username, email, onReset])

  // const onToggle = useCallback(id => {
  //   dispatch({
  //     type: 'TOGGLE_USER',
  //     id
  //   })
  // }, [])

  // const onRemove = useCallback(id => {
  //   dispatch({
  //     type: 'REMOVE_USER',
  //     id
  //   })
  // }, [])

  const count = useMemo(() => countActiveUsers(users), [users])
  return (
    <UserDispatch.Provider value={dispatch}>
      {/* <CreateUser username={username} email={email} 
        onChange={onChange} onCreate={onCreate}/> */}
        <CreateUser/>
      {/* <UserList users={users} onToggle={onToggle} onRemove={onRemove}/> */}
      <UserList users={users}/>
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  )

  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: ''
  // });
  // const {username, email} = inputs;
  // const onChange = useCallback( e => {
  //   const {name, value} = e.target;
  //   setInputs( inputs => ({
  //     ...inputs,
  //     [name]: value
  //   }))
  // },[])
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     username: 'velopert',
  //     email: 'public.velopert@gmail.com',
  //     active: true
  //   },
  //   {
  //     id: 2,
  //     username: 'tester',
  //     email: 'tester@example.com',
  //     active: false
  //   },
  //   {
  //     id: 3,
  //     username: 'liz',
  //     email: 'liz@example.com',
  //     active: false
  //   }
  // ]);
  // const nextId = useRef(4);
  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email
  //   };
  //   // setUsers([...users, user])  // spread
  //   // setUsers(users.concat(user))  // concat
  //   setUsers(users => users.concat(user)) // 함수형 업데이트  
    
  //   setInputs({
  //     username:'',
  //     email: ''
  //   })
  //   nextId.current += 1;
  // }, [username, email])

  // const onRemove = useCallback( id => {
  //   // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만든다
  //   // = user.id가 id인 것을 제거
  //   setUsers(users => users.filter(user => user.id !== id));
  // },[])
  // const onToggle = useCallback( id => {
  //   setUsers( users =>
  //     users.map(user => 
  //       user.id === id ? {...user, active: !user.active} : user
  //       // id가 다르면 그대로 두고, 같으면 active 값을 반전시킴 
  //       )
  //   )
  // },[])

  // // const count = countActiveUsers(users)
  // const count = useMemo(() => countActiveUsers(users), [users])

  // // const name = 'react';
  // // const style = {
  // //   backgroundColor: 'black',
  // //   color: 'aqua',
  // //   fontSize: 24, // 기본 단위 px 
  // //   padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  // // }
  // return (
  //   <>
  //   <CreateUser username={username} email={email}
  //   onChange={onChange} onCreate={onCreate}/>
  //   <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
  //   <div>활성사용자 수 : {count}</div>
  //   </>
    // <InputSample/>
    // <Counter/>
    // <Wrapper>
    //   {/* 주석 */}
    //   <Hello name="react" color="red" isSpecial={false}
    //     // 열리는 태그 내부에서의 주석
    //     // isSpecial == isSpecial={true}
    //   />
    //   <Hello color="pink"/>
    //   <div style={style}>{name}</div>
    //   <div className='gray-box'></div>
    // </Wrapper>
  // );
}

export default App;
