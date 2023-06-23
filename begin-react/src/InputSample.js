import React, {useState, useRef} from "react";
// useRef : 특정 DOM 선택

function InputSample() {
  // const [text, setText] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });
  const nameInput = useRef();

  const { name, nickname } = inputs;  // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    // setText(e.target.value);
    const { value, name } = e.target; // e.target에서 name과 value를 추출 
    // 리액트 상태에서 객체를 수정할 때, 
    // inputs[name] = value;와 같이 직접 수정X
    // 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 상태로 사용해야 한다. -> 불변성을 지킨다.
    setInputs({
      ...inputs,  // 기존의 input 객체 복사
      [name]: value   // name 키를 가진 값을 value로 설정 
    })
  };

  const onReset = () => {
    // setText('');
    setInputs({
      name: '',
      nickname: '',
    });
    nameInput.current.focus();
    // useRef를 통해 초기화 버튼 클릭시 이름 input에 포커스를 하는 focus() DOM API 호출
  }

  return (
    <div>
      <input name="name" placeholder="이름" 
      onChange={onChange} value={name} ref={nameInput}/>
      <input name="nickname" placeholder="닉네임" 
      onChange={onChange} value={nickname}/>
      {/* <input onChange={onChange} value={text}/> */}
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  )
}

export default InputSample;